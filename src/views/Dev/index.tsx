import DevStoreSample from "./components/DevStoreSample"
import DevApiSample from "./components/DevApiSample"
import { DevFormSample } from "./components/DevFormSample"
import DevReactLogo from "./components/DevReactLogo"
import "@/assets/styles/dev/index.scss"
import { DevStorageSample } from "./components/DevStorageSample"
import { DevUseContextSample } from "./components/DevUseContextSample"
import { DevUseEffectSample } from "./components/DevUseEffectSample"
import { DevTimeSample } from "./components/DevTimeSample"
import { DevTabs } from "./components/DevTabs"
import { DevTab } from "./components/DevTab"

export default function Dev() {
  return (
    <div className="env-dev">
      <header className="header header--dev shadow-nav container">
        <h1 className="header__logo flex-1">
          <DevReactLogo />
          <span className="header__logo-text">Dev - Sample Page</span>
        </h1>
        <div className="flex-1">
          <div className="container__col container header__sub-section color-gray-500">
            <h2 className="text-xs text-normal">開發環境</h2>
            <div className="nav text-xs">
              <ul className="nav__list">
                <li className="nav__item nav__item--divide">
                  <span className="color-primary">{process.env.NODE_ENV}</span>
                </li>
                <li className="nav__item nav__item--divide">
                  MODE :
                  <span className="color-primary">{import.meta.env.MODE}</span>
                </li>
                <li className="nav__item nav__item--divide">
                  API URL :
                  <span className="color-primary">
                    {import.meta.env.VITE_API_URL}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className="main container container--align-start">
        <DevTabs>
          <DevTab navLabel="Store" value="store">
            <DevStoreSample />
          </DevTab>
          <DevTab navLabel="Storage(RTK, useLocalStorage)" value="storage">
            <DevStorageSample />
          </DevTab>
          <DevTab navLabel="Form" value="form">
            <DevFormSample />
          </DevTab>
          <DevTab navLabel="Api" value="api">
            <DevApiSample />
          </DevTab>
          <DevTab navLabel="useEffect" value="useEffect">
            <DevUseEffectSample />
          </DevTab>
          <DevTab navLabel="useContext" value="useContext">
            <DevUseContextSample />
          </DevTab>
          <DevTab navLabel="time" value="time">
            <DevTimeSample />
          </DevTab>
        </DevTabs>
      </main>
    </div>
  )
}
