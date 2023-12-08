import sampleApi from "@/services/api/sampleApi"
import { ISampleSetUserReq } from "@/services/models/sample"
import Yup from "@/utils/validations/yupSchemaExtended"
import { Field, Form, Formik } from "formik"

const initialValues: ISampleSetUserReq = {
  custId: "",
  userName: "",
  email: "",
  age: 0,
  gender: "",
}

const validationSchema = Yup.object().shape({
  custId: Yup.string().cusRequired().rocId(),
  userName: Yup.string().cusRequired(),
  email: Yup.string().cusRequired().cusEmail(),
  age: Yup.number().required().maxDigitNumber(3),
  gender: Yup.string().cusRequired(),
})

export function DevFormSample() {
  const [apiSampleSetUser] = sampleApi.useSampleSetUserMutation()

  const handleSubmit = async (values: ISampleSetUserReq) => {
    const {
      header: { returnCode, returnMsg },
    } = await apiSampleSetUser(values).unwrap()
    if (returnCode.isSuccessCode()) {
      alert(`'成功', ${JSON.stringify(values, null, 2)}`)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  return (
    <div className="example">
      <h1 className="example__title">FormSample</h1>
      <div className="example__section shadow-box">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input-group">
                <label className="input-group__label" htmlFor="cusId">
                  身分證字號：
                </label>
                <div>
                  <Field
                    className="input-group__input"
                    name="custId"
                    id="custId"
                  />
                  <div className="input-group__error">
                    {errors.custId && touched.custId ? errors.custId : null}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label" htmlFor="userName">
                  使用者名稱：
                </label>
                <div>
                  <Field
                    className="input-group__input"
                    name="userName"
                    id="userName"
                  />
                  <div className="input-group__error">
                    {errors.userName && touched.userName
                      ? errors.userName
                      : null}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label" htmlFor="email">
                  信箱：
                </label>
                <div>
                  <Field
                    className="input-group__input"
                    name="email"
                    type="email"
                    id="email"
                  />
                  <div className="input-group__error">
                    {errors.email && touched.email ? errors.email : null}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label" htmlFor="age">
                  年齡：
                </label>
                <div>
                  <Field
                    className="input-group__input"
                    name="age"
                    type="number"
                    id="age"
                  />
                  <div className="input-group__error">
                    {errors.age && touched.age ? errors.age : null}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label className="input-group__label" htmlFor="gender">
                  性別：
                </label>
                <div>
                  <Field
                    className="input-group__input"
                    as="select"
                    name="gender"
                    id="gender"
                  >
                    <option value="">請選擇</option>
                    <option value="female">女</option>
                    <option value="male">男</option>
                  </Field>
                  <div className="input-group__error">
                    {errors.gender && touched.gender ? errors.gender : null}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <button className="btn btn--primary" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
