import i18n, { t } from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en"
import zh from "./locales/zh-TW"
import { AppModeEnum, LangEnum } from "@/enums/common"
import { setLocale } from "yup"
import { STORAGE_KEY } from "@/constants"
import { zhTW } from "date-fns/locale"
import { isDate, format as formatDate } from "date-fns"

const resources = {
  "en": {
    translation: en,
  },
  "zh-TW": {
    translation: zh,
  },
}

// 設定 i18n 語系
const getInitLanguage = () => {
  const defaultLang = localStorage.getItem(STORAGE_KEY.lang)
  if (defaultLang) {
    return defaultLang
  }

  const browserLng = window.navigator.language
  switch (browserLng) {
    case LangEnum.TW:
    case LangEnum.EN:
      return browserLng
    default:
      return LangEnum.TW
  }
}

i18n.use(initReactI18next).init({
  lng: getInitLanguage(),
  debug: import.meta.env.MODE === AppModeEnum.DEV,
  fallbackLng: LangEnum.TW,
  resources,
  interpolation: {
    // react already saves from xss
    escapeValue: false,

    // 客製化 format
    format: (value, format, lng) => {
      // 日期使用 date-fns i18n 格式
      if (isDate(value) && format) {
        return lng === LangEnum.TW
          ? formatDate(value, format, { locale: zhTW })
          : formatDate(value, format)
      }

      return value
    },
  },
})

// 設定驗證器錯誤訊息
setLocale({
  mixed: {
    default: () => t("__validation_invalid"),
    required: () => t("__validation_required"),
    // oneOf
    // notOneOf
    notType: ({ type }) => {
      switch (type) {
        case "number":
          return t("__validation_numOnly")
        default:
          return t("__validation_invalid")
      }
    },
    // notNull
    // notType
    // defined
  },
  string: {
    length: ({ length }) => t("__validation_length", { length }),
    // min
    max: ({ max }) => t("__validation_maxLength", { max }),
    // matches
    email: () => t("__validation_invalid"),
    // url
  },
  number: {
    min: ({ min }) => t("__validation_minInclude", { min }),
    max: ({ max }) => t("__validation_maxInclude", { max }),
    integer: () => t("__validation_onlyInteger"),
    moreThan: ({ more }) => t("__validation_min", { min: more }),
  },
})

export default i18n
