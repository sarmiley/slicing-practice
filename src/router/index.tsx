import App from "@/App"
import React, { lazy } from "react"
import { Navigate, createBrowserRouter } from "react-router-dom"
import { AppEnvEnum } from "@/enums/common"
import { CommonRoute } from "@/layout/CommonRoute"
import routerSubscriber from "./routerSubscriber"
import Login from "@/views/Public/Login"
import No001 from "@/views/Public/No001"

// 動態載入 component 達到 code splitting  效果，減少第一次載入頁面所需的 bundle size
const PublicLayout = lazy(() => import("@/views/Public"))
const DevLayout = lazy(() => import("@/views/Dev"))
const HomeLayout = lazy(() => import("@/views/Home"))
const Landing = lazy(() => import("@/views/Public/Landing"))

// 若 component 尚未載入完成，則顯示 ...
const Suspense = (component: JSX.Element) => (
  <React.Suspense fallback={<>...</>}>{component}</React.Suspense>
)

const environment = process.env.NODE_ENV

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonRoute title="__documentTitleDefault" children={<App />} />,
    children: [
      /* [公開頁面區1 (layout: AppLayout)] */
      {
        element: Suspense(<PublicLayout />),
        children: [
          {
            index: true,
            element: Suspense(
              <CommonRoute
                title="__documentTitleLanding"
                children={<Landing />}
              />
            ),
          },
          {
            path: "no001",
            element: Suspense(
              <CommonRoute
                title="__documentTitleLanding"
                children={<No001 />}
              />
            ),
          },
          {
            path: "about",
            element: <div>about</div>,
          },
          { path: "*", element: <Navigate to="/" replace /> },
        ],
      },

      /* [公開頁面區2 (layout: none)] */
      {
        path: "login",
        element: Suspense(<CommonRoute title="" children={<Login />} />),
      },

      /* [需登入畫面區 (layout: AppLayout)] */
      {
        path: "home",
        element: Suspense(<HomeLayout />),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <div>profile</div> },
          { path: "*", element: <Navigate to="profile" replace /> },
        ],
      },

      /* [開發專用頁面區] */
      environment === AppEnvEnum.DEVELOPMENT
        ? {
            path: "dev",
            element: Suspense(<DevLayout />),
          }
        : {},

      /* [預設頁面] */
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])

router.subscribe(routerSubscriber)

// 提供給組件外可以使用的轉址方法
// - 在組件內使用 useNavigator 提供的 navigate 方法會包含 basename
// - 但直接使用 router.navigate 不包含 basename，所以我們要在封裝起來
export const appNavigate = (url: string) => {
  router.navigate({ pathname: router.basename + url })
}

export default router
