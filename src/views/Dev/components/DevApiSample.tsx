import sampleApi from "@/services/api/sampleApi"
import { useState } from "react"

export default function DevApiSample() {
  const [lazyBase64Img, setLazyBase64Img] = useState("")
  const [apiSampleGetImg] = sampleApi.useLazySampleGetImgQuery() // 自定呼叫api時間
  const handleCallLazyCachedApi = async () => {
    // 有使用 unwrap() result => {data: { header: {}, body: {}}}
    // 沒使用 unwrap() result => {header: {}, body: {}}
    const img = await apiSampleGetImg(
      { height: 200, width: 800 },
      true /* cached */
    ).unwrap()
    setLazyBase64Img(img)
  }

  const [commonApiResult, setCommonApiResult] = useState({})
  const [apiSampleGetUser] = sampleApi.useSampleGetUserMutation()
  const handleGetUser = async () => {
    const {
      header: { returnCode, returnMsg },
      body,
    } = await apiSampleGetUser({ custId: "A123456789" }).unwrap()
    if (returnCode.isSuccessCode()) {
      setCommonApiResult(body)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  const [apiSampleGetProducts] = sampleApi.useSampleGetProductsMutation()
  const handleGetProduct = async () => {
    const {
      header: { returnCode, returnMsg },
      body,
    } = await apiSampleGetProducts({ category: "car" }).unwrap()
    if (returnCode.isSuccessCode()) {
      setCommonApiResult(body)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  const [apiSampleGetErrorStatus] = sampleApi.useSampleGetErrorStatusMutation()
  const handleGetErrorStatus = async () => {
    const {
      header: { returnCode, returnMsg },
      body,
    } = await apiSampleGetErrorStatus({ custId: "A123456789" }).unwrap()
    if (returnCode.isSuccessCode()) {
      setCommonApiResult(body)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  return (
    <div className="example">
      <h1 className="example__title">ApiSample</h1>
      <div className="example__section shadow-box">
        RTK Query 說明
        <ul>
          <li>
            檔案路徑：
            <ul>
              <li>API： /services</li>
              <li>API 攔截處理： /store/middleware /^api\/Middleware.ts$/</li>
              <li>MOCK API： /mocks</li>
            </ul>
          </li>
          <li>會以 endpoint 區分檔案，但仍然維持在同一個 API Slice 中</li>
          <li></li>
          <li>
            RTKQ 會自動處理 dedupe
            的情況（在同一個頁面中有多個元件需要呼叫相同的 API
            取得相同的資源時，只會發出一次 request）
          </li>
        </ul>
      </div>
      <div className="example__section shadow-box">
        <span>一般呼叫 API</span>
        <div className="btn-group">
          <button className="btn btn--primary" onClick={handleGetUser}>
            計算 loading
          </button>
          <button className="btn btn--secondary" onClick={handleGetProduct}>
            不計算 loading
          </button>
          <div className="example__result">
            {commonApiResult && JSON.stringify(commonApiResult)}
          </div>
        </div>
      </div>
      <div className="example__section shadow-box">
        <span>API Error</span>
        <div className="btn-group">
          <button className="btn btn--primary" onClick={handleGetErrorStatus}>
            show error
          </button>
        </div>
      </div>
      <div className="example__section shadow-box">
        <span>使用 query-lazy 手動執行 SampleGetImg api 取得圖片</span>
        <div className="btn-group">
          <input
            className="btn btn--primary"
            type="button"
            value="get image"
            onClick={handleCallLazyCachedApi}
          />
        </div>
        <div className="example__result">
          {" "}
          <img alt="" src={lazyBase64Img} />{" "}
        </div>
      </div>
    </div>
  )
}
