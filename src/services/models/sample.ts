export interface ISampleGetProductsReq {
  category: string
}
export interface ISampleGetProductsRes {
  products: {
    id: string
    category: string | null
    price: number
    stock: number
  }[]
}

// ===

export interface ISampleGetImgReq {
  width: number
  height: number
}

export interface ISampleSetUserReq {
  custId: string
  userName: string
  email: string
  age: number
  gender: string
}

// ===

export interface ISampleGetUserReq {
  custId: string
}
export interface ISampleGetUserRes {
  custId: string
  userName: string
  email: string
  age: number
  gender: string
}

// ===

export interface ISampleGetConfigRes {
  clientId: string
  config: Record<string, string>
}

// ===

export interface ISampleLoginReq {
  userId: string
  pcode: string
}
export interface ISampleLoginRes {
  userName: string
  authCode: string
}
