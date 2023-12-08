import { t } from "i18next"
import * as Yup from "yup"

// 新增客製化驗證後，要 yupSchemaExtended.ts 以及 yup.d.ts 加入 Schema

/**
 * 自訂檢核必填(去空白、null、undefined、空字串)
 * @param fieldName 欄位名稱 (optional) 如果有傳入，會顯示在錯誤訊息中
 * @returns schema
 */
export const cusRequired = function (
  this: Yup.StringSchema,
  fieldName?: string
) {
  return this.test({
    name: "cusRequired",
    exclusive: true,
    params: { fieldName },
    message: fieldName
      ? t("__validation_required_with_name", { name: fieldName })
      : t("__validation_required"),
    test: (value) => {
      const valueStr = String(value).trim()
      return !!value && valueStr.length > 0
    },
  })
}

/**
 * 檢核台灣身分證字號
 * @returns schema
 */
export const rocId = function (this: Yup.StringSchema) {
  return this.trim().test({
    name: "rocId",
    exclusive: true,
    message: t("__validation_cusId"),
    test: (value) => {
      const valueStr = String(value).trim()

      // 身分證字號長度不為10則回傳false
      if (!!value && valueStr.length !== 10) return false

      // 身分證字號基本規則檢查
      const regExp = /^[A-Z][12]\d{8}$/
      return regExp.test(valueStr)
    },
  })
}

/**
 * 自訂檢核Email(必含@以及不可包含特殊符號)
 * @returns schema
 */
export const cusEmail = function (this: Yup.StringSchema) {
  return this.trim().test({
    name: "cusEmail",
    exclusive: true,
    message: t("__validation_email"),
    test: (value) => {
      const valueStr = String(value).trim()

      // 信箱規則正則表達式
      const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return !!value && regExp.test(valueStr)
    },
  })
}
