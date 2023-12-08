import validations from "./validations/zh-TW"

export default {
  /* ================================= */
  /* ====  欄位檢核提示文字  ============ */
  /* ================================= */
  ...validations,

  /* ================================= */
  /* ====  其他不分類文字   ============ */
  /* ================================= */
  __account: `帳號`,
  __understand: `知道了`,
  __documentTitleDefault: `預設頁面標題`,
  __documentTitleLanding: `Landing 頁面`,
  /* date-fns 格式可參考: https://github.com/date-fns/date-fns/blob/main/src/locale/zh-TW/snapshot.md */
  __date: `{{ date, PPP }}`,
  __dateAndTime: `{{ date, PPPpp }}`,
}
