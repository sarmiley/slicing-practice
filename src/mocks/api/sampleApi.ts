import { rest } from "msw"

import { IBaseReq } from "../../services/models/common"
import {
  ISampleLoginReq,
  ISampleLoginRes,
  ISampleGetProductsRes,
  ISampleGetImgReq,
  ISampleGetUserReq,
  ISampleGetUserRes,
  ISampleGetConfigRes,
  ISampleSetUserReq,
} from "../../services/models/sample"
import { getGuid } from "../../utils/helpers/commonHelper"
import {
  createRes,
  getApiUrl,
  getRandomArray,
  getRandomArrayItem,
  getRandomInt,
  getRandomIntRange,
} from "../mockHelper"

const sampleApi = [
  // 範例：處理 POST API 並回傳 Image
  rest.post(getApiUrl("/sample/get-img"), async (req, res, ctx) => {
    const {
      body: { width, height },
    } = await req.json<IBaseReq<ISampleGetImgReq>>()
    const imageBuffer = await fetch(
      `https://picsum.photos/${width}/${height}?random=${getRandomInt(6)}`
    ).then((res) => res.arrayBuffer())

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.status(200),
      ctx.delay(),
      ctx.body(imageBuffer)
    )
  }),

  // 範例：處理 POST API 並回傳 JSON
  rest.post(getApiUrl("/sample/get-user"), async (req, res, ctx) => {
    const {
      body: { custId },
    } = await req.json<IBaseReq<ISampleGetUserReq>>()
    const response = createRes<ISampleGetUserRes>({
      custId,
      userName: "鍋抬鳴",
      email: "happy@tpisoftware.com",
      age: 19,
      gender: "0",
    })

    return res(ctx.status(200), ctx.delay(), ctx.json(response))
  }),

  // 範例：處理 GET API 並回傳 JSON
  rest.get(getApiUrl("/sample/get-products"), (req, res, ctx) => {
    const urHeader = req.headers.get("ur-header") ?? ""
    const category = req.url.searchParams.get("category")
    const response = createRes<ISampleGetProductsRes>({
      products: getRandomArray(3, () => ({
        category,
        id: getGuid(),
        stock: getRandomIntRange(10, 100),
        price: getRandomInt(5),
        gender: getRandomArrayItem(["MALE", "FEMALE"]),
      })),
    })

    return res(
      ctx.set("my-header", urHeader),
      ctx.status(200),
      ctx.delay(),
      ctx.json(response)
    )
  }),

  // 範例：回傳 status code error
  rest.get(getApiUrl("/sample/get-error-status"), (_, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: "this is a error message" })
    )
  }),

  // 範例：回傳 status code error
  rest.post(getApiUrl("/sample/set-user"), async (req, res, ctx) => {
    const {
      body: { custId, userName, email, age, gender },
    } = await req.json<IBaseReq<ISampleSetUserReq>>()

    if (custId && userName && email && age && gender) {
      const response = createRes({})
      return res(ctx.status(200), ctx.delay(), ctx.json(response))
    }

    return res(
      ctx.status(500),
      ctx.json({ message: "this is a error message" })
    )
  }),

  // ===

  rest.post(getApiUrl("/sample/get-config"), async (_, res, ctx) => {
    const response = createRes<ISampleGetConfigRes>({
      clientId: "my-client-id",
      config: { k1: "k1-value", k2: "k2-value" },
    })

    return res(ctx.status(200), ctx.delay(), ctx.json(response))
  }),

  rest.post(getApiUrl("/sample/login"), async (req, res, ctx) => {
    const {
      body: { userId, pcode },
    } = await req.json<IBaseReq<ISampleLoginReq>>()
    // set response
    const response = createRes<ISampleLoginRes>({
      authCode: "this-is-a-auth-code" + pcode,
      userName: "chris-" + userId,
    })

    return res(ctx.status(200), ctx.delay(500), ctx.json(response))
  }),
]

export default sampleApi
