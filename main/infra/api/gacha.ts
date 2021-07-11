import { axiosInstance } from '.'

/**
 * ガチャのピックアップ取得
 */
export const getGachaPickup = async (): Promise<{
  pickupCircle: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  pickupDate: string
}> => {
  const res = await axiosInstance.get<{
    pickupCircle: {
      handbillImageUrl: string
      name: string
      slug: string
    }[]
    pickupDate: string
  }>('/api/gacha/circle/pickup')

  return res.data
}

export const drawGacha = async ({
  identifierHash,
  num,
}:{ identifierHash: string, num: number }) => {
  await axiosInstance.post(
    `/api/gacha/circle?number=${num}&X-IDENTIFIER_HASH=${identifierHash}`
  )
}
