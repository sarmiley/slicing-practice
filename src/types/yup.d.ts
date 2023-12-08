// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from "yup"

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    /**
     * 自訂檢核必填(去空白、null、undefined、空字串)
     * @param fieldName 欄位名稱 (optional) 如果有傳入，會顯示在錯誤訊息中
     */
    cusRequired(fieldName?: string): StringSchema<TType, TContext>
    /**
     * 檢核台灣身分證字號
     */
    rocId(): StringSchema<TType, TContext>
    /**
     * 自訂檢核Email(必含@以及不可包含特殊符號)
     */
    cusEmail(): StringSchema<TType, TContext>
  }
  interface NumberSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    /**
     * 檢核數字的位數是否在範圍內
     * @param max 金額位數上限
     */
    maxDigitNumber(max?: number): NumberSchema<TType, TContext>
  }
}
