import {
  TaskAbortError,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit"
import {
  loginSuccess,
  logout,
  startApp,
  updateLoginInfo,
} from "../slices/appSlice"
import { RootState } from ".."
import { appNavigate } from "@/router"
import { getQueryStrValue } from "@/utils/helpers/urlHelper"

// Create the middleware instance and methods
const authListenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
authListenerMiddleware.startListening({
  // 當哪個 action 被 dispatch 時，就會觸發此 listener
  actionCreator: startApp,

  // 當 listener 被觸發時，會執行此 function
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    // console.log("Todo added: ", action.payload.text)

    // 取消任何正在進行中的此監聽器實例，以確保只允許完成最近的實例
    listenerApi.cancelActiveListeners()
    const { take, dispatch, getState } = listenerApi
    try {
      // 啟動 "long polling" loop 持續監聽登入狀態
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const getRootState = getState as () => RootState
        const isLogin = getRootState().app.isLogin

        if (isLogin === false) {
          // #############
          // ### 未登入 ###
          // #############

          // [阻塞] 等待登入成功訊號
          const [
            {
              payload: { authToken },
            },
          ] = await take(loginSuccess.match)

          const redirectUrl = getQueryStrValue("redirect_url")
          redirectUrl ? appNavigate(redirectUrl) : appNavigate("home")

          // 登入成功，更新 state
          dispatch(updateLoginInfo({ isLogin: true, authToken }))
        } else {
          // #############
          // ### 已登入 ###
          // #############

          // [阻塞] 等待登出要求訊號

          // 使用 isAnyOf = ||，可以同時監聽多個 action，只要其中一個 action 被 dispatch 就會回傳 true
          await take(isAnyOf(logout))

          // 登出成功，更新 state
          dispatch(updateLoginInfo({ isLogin: false, authToken: "" }))
          appNavigate("")
        }
      }
    } catch (error) {
      if (error instanceof TaskAbortError && action.type === startApp.type) {
        console.warn("authListenerMiddleware abort due to re-startApp")
      } else {
        console.error("authListenerMiddleware error:", error)
      }
    }

    // Run async logic
    // const data = await fetchData()

    // Pause until action dispatched or state changed
    // if (await listenerApi.condition(matchSomeAction)) {
    //   // Use the listener API methods to dispatch, get state,
    //   // unsubscribe the listener, start child tasks, and more
    //   listenerApi.dispatch(todoAdded("Buy pet food"))

    //   // Spawn "child tasks" that can do more work and return results
    //   const task = listenerApi.fork(async (forkApi) => {
    //     // Can pause execution
    //     await forkApi.delay(5)
    //     // Complete the child by returning a value
    //     return 42
    //   })

    //   const result = await task.result
    //   // Unwrap the child result in the listener
    //   if (result.status === "ok") {
    //     // Logs the `42` result value that was returned
    //     console.log("Child succeeded: ", result.value)
    //   }
    // }
  },
})

export default authListenerMiddleware.middleware
