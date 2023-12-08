import sampleApi from "@/services/api/sampleApi"
import { loginSuccess } from "@/store/slices/appSlice"
import useAppDispatch from "@/utils/hooks/useAppDispatch"
import Yup from "@/utils/validations/yupSchemaExtended"
import { Field, Form, Formik } from "formik"

interface ILoginForm {
  account: string
  password: string
}

const initialValues: ILoginForm = {
  account: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  account: Yup.string().cusRequired(),
  password: Yup.string().cusRequired(),
})

export default function Login() {
  const dispatch = useAppDispatch()
  const [apiSampleLogin] = sampleApi.useSampleLoginMutation()
  const handleSubmit = async (values: ILoginForm) => {
    const {
      header: { returnCode, returnMsg },
      body: { authCode },
    } = await apiSampleLogin({
      userId: values.account,
      pcode: values.password,
    }).unwrap()

    if (returnCode.isSuccessCode()) {
      dispatch(loginSuccess({ authToken: authCode }))
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  return (
    <div className="m-20px">
      {/** 建立一個登入表單 */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ errors, touched }) => (
          <Form>
            <div className="m-20px">
              <div className="m-20px">
                <label htmlFor="account">帳號 : </label>
                <Field type="text" name="account" id="account" />
                <div>
                  {errors.account && touched.account ? errors.account : null}
                </div>
              </div>
              <div className="m-20px">
                <label htmlFor="password">密碼 : </label>
                <Field type="password" name="password" id="password" />
                <div>
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div className="m-20px">
                <button type="submit">登入</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
