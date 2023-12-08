import React from "react"
import ReactDOM from "react-dom/client"
import "./utils/extensions/stringExtensions"
import "./i18n"
import "@/assets/styles/index.scss"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import router from "./router"
import store, { persistor } from "./store"
import { worker } from "./mocks/browser"
import { AppEnvEnum } from "./enums/common"
import { PersistGate } from "redux-persist/integration/react"

if (process.env.NODE_ENV === AppEnvEnum.DEVELOPMENT) {
  worker.start({
    onUnhandledRequest: "bypass",
  })
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
