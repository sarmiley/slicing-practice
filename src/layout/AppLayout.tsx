import { logout, selectIsLogin } from "@/store/slices/appSlice"
import useAppDispatch from "@/utils/hooks/useAppDispatch"
import useAppSelector from "@/utils/hooks/useAppSelector"
import { PropsWithChildren } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"

interface IProps {
  isAuthRequired?: boolean
}

export const AppLayout = ({
  isAuthRequired,
  children,
}: PropsWithChildren<IProps>) => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(selectIsLogin)
  const location = useLocation()

  // 處理未登入時，導向登入頁面
  if (isAuthRequired && !isLogin) {
    const currentPath = location.pathname
    return <Navigate to={`/login?redirect_url=${currentPath}`} />
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div className="header header--app">
        <div className="d-flex p-10px justify-between">
          <div className="p-10px"></div>
          <div>
            {!isLogin && (
              <div className="p-10px">
                <Link to="login">登入</Link>
              </div>
            )}
            {isLogin && (
              <div className="p-10px">
                <button
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  登出
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="content">{children}</main>
      <div className="footer footer--app">Footer</div>
    </>
  )
}
