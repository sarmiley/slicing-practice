import { t } from "i18next"
import * as Yup from "yup"

// 新增客製化驗證後，要 yupSchemaExtended.ts 以及 yup.d.ts 加入 Schema

/**
 * 檢核數字的位數是否在範圍內
 * @param max 金額位數上限
 * @returns schema
 */
export const maxDigitNumber = function (this: Yup.NumberSchema, max = 1) {
  return this.test({
    name: "maxDigitNumber",
    exclusive: true,
    params: { max },
    message: t("__validation_maxDigitNumber", { max }),
    test: (value) => {
      if (value === undefined) return false
      if (isNaN(value)) return false
      return value < Math.pow(10, max)
    },
  })
}
