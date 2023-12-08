import { Middleware, MiddlewareAPI } from "redux"
import { AppDispatch, RootState } from ".."
import { Action, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { addLoadingApi, removeLoadingApi } from "../slices/appSlice"

/**
 * 不列入 loading api 計算的清單(endpointName list)
 */
const ignoreLoadingList = ["SampleGetProducts"]

const apiLoadingMiddleware =
  ({ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next: (action: Action) => void) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (action: any) => {
    const endpointName = action?.meta?.arg?.endpointName
    if (endpointName) {
      if (ignoreLoadingList.includes(endpointName)) {
        return next(action)
      } else if (isPending(action)) {
        dispatch(addLoadingApi(action.meta.requestId))
      } else if (isRejected(action)) {
        dispatch(removeLoadingApi(action.meta.requestId))
      } else if (isFulfilled(action)) {
        dispatch(removeLoadingApi(action.meta.requestId))
      }
    }
    return next(action)
  }

/**
 * 加入 api loading middleware 來啟用 api loading
 */
const middleware = apiLoadingMiddleware as Middleware

export default middleware
