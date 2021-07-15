import { axiosInstance } from '.'

/**
 * ガチャのピックアップ取得
 */
export const getGachaPickup = async (): Promise<{
  pickupCircle: {
    list: {
      handbillImageUrl: string
      name: string
      slug: string
    }[]
  }
  pickupDate: string
}> => {
  const res = await axiosInstance.get<{
    pickupCircle: {
      list: {
        handbillImageUrl: string
        name: string
        slug: string
      }[]
    }
    pickupDate: string
  }>('/api/gacha/circle/pickup')

  return res.data
}

export const drawGacha = async ({
  identifierHash,
  num,
}: {
  identifierHash: string
  num: number
}): Promise<{
  gachaHash: string
}> => {
  const res = await axiosInstance.post<{
    gachaHash: string
  }>(`/api/gacha/circle?number=${num}&X-IDENTIFIER_HASH=${identifierHash}`)

  return {
    gachaHash: res.data.gachaHash,
  }
}

/**
 * ガチャ結果を取得
 */
export const resultGacha = async ({
  gachaHash,
}: {
  gachaHash: string
}): Promise<{
  count: number
  createdAt: string
  gachaHash: string
  pickupCircles: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  resultCircles: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
}> => {
  const res = await axiosInstance.get<{
    count: number
    createdAt: string
    gachaHash: string
    pickupCircles: {
      handbillImageUrl: string
      name: string
      slug: string
    }[]
    resultCircles: {
      handbillImageUrl: string
      name: string
      slug: string
    }[]
  }>(`/api/gacha/circle/result/${gachaHash}`)

  return res.data
}

/**
 * ガチャ履歴を取得
 */
export const getGachaHistory = async ({
  identifierHash
}: {
  identifierHash: string
}): Promise<{
  history: {
    list: {
      createdAt: string
      resultCircles: {
        handbillImageUrl: string
        name: string
        slug: string
      }[]
    }[]
  }
}> => {
  type Response = {
    history: {
      list: {
        createdAt: string
        resultCircles: {
          handbillImageUrl: string
          name: string
          slug: string
        }[]
      }[]
    }
  }
  const res = await axiosInstance.get<Response>(
    `/api/gacha/circle/history?X-IDENTIFIER_HASH=${identifierHash}`
  )

  return res.data
}
