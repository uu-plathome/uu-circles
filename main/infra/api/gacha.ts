import { CircleType } from '@/lib/enum/api/CircleType'
import { axiosInstance } from '.'

export type SimpleGachaDto = {
  handbillImageUrl: string
  name: string
  slug: string
  description?: string
  circleType: CircleType
  isClubActivity: boolean
}

/**
 * ガチャのピックアップ取得
 */
export const getGachaPickup = async (): Promise<{
  pickupCircle: {
    list: SimpleGachaDto[]
  }
  pickupDate: string
}> => {
  const res = await axiosInstance.get<{
    pickupCircle: {
      list: SimpleGachaDto[]
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
  count: number
  createdAt: string
  gachaHash: string
  pickupCircles: SimpleGachaDto[]
  resultCircles: SimpleGachaDto[]
}> => {
  const res = await axiosInstance.post<{
    count: number
    createdAt: string
    gachaHash: string
    pickupCircles: SimpleGachaDto[]
    resultCircles: SimpleGachaDto[]
  }>(`/api/gacha/circle?number=${num}&X-IDENTIFIER_HASH=${identifierHash}`)

  return res.data
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
  pickupCircles: SimpleGachaDto[]
  resultCircles: SimpleGachaDto[]
}> => {
  const res = await axiosInstance.get<{
    count: number
    createdAt: string
    gachaHash: string
    pickupCircles: SimpleGachaDto[]
    resultCircles: SimpleGachaDto[]
  }>(`/api/gacha/circle/result/${gachaHash}`)

  return res.data
}

/**
 * ガチャ履歴を取得
 */
export const getGachaHistory = async ({
  identifierHash,
}: {
  identifierHash: string
}): Promise<{
  history: {
    list: {
      createdAt: string
      gachaHash: string
      resultCircles: SimpleGachaDto[]
    }[]
  }
}> => {
  type Response = {
    history: {
      list: {
        createdAt: string
        gachaHash: string
        resultCircles: SimpleGachaDto[]
      }[]
    }
  }
  const res = await axiosInstance.get<Response>(
    `/api/gacha/circle/history?X-IDENTIFIER_HASH=${identifierHash}`
  )

  return res.data
}
