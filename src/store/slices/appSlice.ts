import { createAction, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { createAppAsyncThunk } from "@/utils/helpers/thunkHelper"
import sampleApi from "@/services/api/sampleApi"

const initialState = {
  isLogin: false,
  authToken: "",
  loadingApiList: [] as string[],
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addLoadingApi(state, action: PayloadAction<string>) {
      state.loadingApiList.push(action.payload)
    },
    removeLoadingApi(state, action: PayloadAction<string>) {
      state.loadingApiList = state.loadingApiList.filter(
        (api) => api !== action.payload
      )
    },
    updateLoginInfo(
      state,
      action: PayloadAction<{ isLogin: boolean; authToken: string }>
    ) {
      state.isLogin = action.payload.isLogin
      state.authToken = action.payload.authToken
    },
  },
})

/**
 * app 初始化 thunk 統一處理非同步邏輯以及監聽初始化是否成功
 * @returns {boolean} 初始化是否成功
 */
export const initAppAsync = createAppAsyncThunk(
  `${appSlice.name}/initAppAsync`,
  async (_, thunkApi) => {
    try {
      const response = await thunkApi
        .dispatch(sampleApi.endpoints.SampleGetConfig.initiate(null))
        .unwrap()
      if (response.header.returnCode.isSuccessCode()) {
        thunkApi.dispatch(startApp())
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
)

// Extra Actions

/**
 * 此 action 被呼叫後會啟動 authListenerMiddleware
 */
export const startApp = createAction(`${appSlice.name}/startApp`)
/**
 * 此 action 被呼叫後會觸發 authListenerMiddleware 的邏輯
 */
export const logout = createAction(`${appSlice.name}/logout`)
/**
 * 此 action 被呼叫後會觸發 authListenerMiddleware 的邏輯
 */
export const loginSuccess = createAction<{ authToken: string }>(
  `${appSlice.name}/loginSuccess`
)

export const selectIsLogin = (state: RootState) => {
  return state.app.isLogin
}

export const { addLoadingApi, removeLoadingApi, updateLoginInfo } =
  appSlice.actions
export default appSlice
