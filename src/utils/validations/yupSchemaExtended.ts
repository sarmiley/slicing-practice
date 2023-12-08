import * as Yup from "yup"
import { cusEmail, cusRequired, rocId } from "./stringValidations"
import { maxDigitNumber } from "./numberValidations"

// string
Yup.addMethod<Yup.StringSchema>(Yup.string, "cusRequired", cusRequired)
Yup.addMethod<Yup.StringSchema>(Yup.string, "rocId", rocId)
Yup.addMethod<Yup.StringSchema>(Yup.string, "cusEmail", cusEmail)

// number
Yup.addMethod<Yup.NumberSchema>(Yup.number, "maxDigitNumber", maxDigitNumber)

// array

// object

export default Yup
