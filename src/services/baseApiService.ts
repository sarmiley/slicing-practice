import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

const staggeredBaseQuery = retry(
  async (args, api, extraOptions) => {
    // 發送 API
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      // 在每個 request 注入的 header
      prepareHeaders: (headers /*, { getState }*/) => {
        headers.set("Content-Type", "application/json; charset=utf-8")
        headers.set("language", "zh_TW")

        // example01: 從 store 中取得的值放入 request header
        // const counter = (getState() as RootState).counter.value
        // if (counter) headers.set('counter', counter)

        // example02: 從 localStorage 中取得的值放入 request header
        // const token = localStorage.getItem(STORAGE_KEY.authToken)
        // if (token) headers.set('token', token)

        return headers
      },
    })(args, api, extraOptions)

    return {
      ...result,
      // add other meta info here if needed
      meta: result.meta && { ...result.meta, timestamp: Date.now() },
    }
  },
  {
    // 重打次數
    maxRetries: 0,
  }
)

export const baseApiService = createApi({
  reducerPath: "api",
  baseQuery: staggeredBaseQuery,
  endpoints: () => ({}), // 會在 api 檔案中使用 injectEndpoints() 來注入 endpoints
  keepUnusedDataFor: 10, // (該值以秒為單位), 用來設定多久沒有被使用的資料會從 cache 中移除
})
