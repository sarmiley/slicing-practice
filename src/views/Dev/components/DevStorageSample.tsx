import { STORAGE_KEY } from "@/constants"
import { LangEnum } from "@/enums/common"
import i18n from "@/i18n"
import { selectIsLogin, updateLoginInfo } from "@/store/slices/appSlice"
import useAppDispatch from "@/utils/hooks/useAppDispatch"
import useAppSelector from "@/utils/hooks/useAppSelector"
import { t } from "i18next"
import { useLocalStorage } from "react-use"

export const DevStorageSample = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(selectIsLogin)
  const [currentLang, setLang] = useLocalStorage(
    STORAGE_KEY.lang,
    i18n.language,
    {
      raw: true,
    }
  )

  const handleChangLang = (lang: LangEnum) => {
    i18n.changeLanguage(lang)
    setLang(lang)
  }

  return (
    <div className="example">
      <h1 className="example__title">將資料儲存到 Storage 的兩種方式</h1>
      <div className="example__section shadow-box">
        <div>1. 將資料透過 Store persist 儲存到 LocalStorage</div>
        <div className="example__option btn-group">
          <button
            className="btn btn--primary"
            onClick={() => {
              dispatch(updateLoginInfo({ isLogin: !isLogin, authToken: "" }))
            }}
          >
            改變登入狀態
          </button>
        </div>
        <div className="example__result">
          Result : {isLogin ? "已登入" : "未登入"}
        </div>
      </div>
      <div className="example__section shadow-box">
        <div>2. 使用 useLocalStorage 存取 LocalStorage 資料</div>
        <ul>
          <li>
            key 值設定於 constants 的 STORAGE_KEY 中，禁止直接使用 String 作為
            key 值
          </li>
        </ul>
        <br />
        <div>
          多國語系，當前語系:{" "}
          <span className="color-primary">{currentLang}</span>
        </div>
        <div className="example__option btn-group">
          <button
            className="btn btn--primary"
            onClick={() => {
              handleChangLang(LangEnum.EN)
            }}
          >
            EN
          </button>
          <button
            className="btn btn--secondary"
            onClick={() => {
              handleChangLang(LangEnum.TW)
            }}
          >
            zh-TW
          </button>
        </div>
        <div className="example__result">Result : {t("__understand")}</div>
      </div>
    </div>
  )
}
