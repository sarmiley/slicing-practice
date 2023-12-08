import { Outlet } from "react-router-dom"
import { LoadingMask } from "./layout/LoadingMask"
import useAppSelector from "./utils/hooks/useAppSelector"
import useAppDispatch from "./utils/hooks/useAppDispatch"
import { useCallback, useEffect, useRef, useState } from "react"
import { initAppAsync } from "./store/slices/appSlice"
import { unwrapResult } from "@reduxjs/toolkit"

function App() {
  const [isInitSuccess, setIsInitSuccess] = useState<boolean | null>(null)
  const isAppInit = useRef(false)
  const dispatch = useAppDispatch()
  const loadingCounter = useAppSelector(
    (state) => state.app.loadingApiList.length
  )
  const initApp = useCallback(async () => {
    const actionResult = await dispatch(initAppAsync())
    const isSuccess = unwrapResult(actionResult)
    setIsInitSuccess(isSuccess)
  }, [dispatch])

  useEffect(() => {
    if (isAppInit.current === false) {
      isAppInit.current = true
      initApp()
    }
  }, [initApp])
  return (
    <>
      {/* <loading /> */}
      {loadingCounter > 0 && <LoadingMask />}
      {isInitSuccess && <Outlet />}
    </>
  )
}

export default App
