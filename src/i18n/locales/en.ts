import validations from "./validations/en"

export default {
  /* ================================= */
  /* ====  欄位檢核提示文字  ============ */
  /* ================================= */
  ...validations,

  /* ================================= */
  /* ====  其他不分類文字   ============ */
  /* ================================= */
  __account: `Account`,
  __understand: `Understand`,
  __documentTitleDefault: `Default page title`,
  __documentTitleLanding: `Landing page title`,
  __date: `{{ date, yyyy/MM/dd }}`,
  __dateAndTime: `{{ date, yyyy/MM/dd HH:mm }}`,
}
