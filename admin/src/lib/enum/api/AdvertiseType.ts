/**
 * 広告種類.
 */
export const AdvertiseType = {
  _type: 'AdvertiseType',

  /**
   * 通常広告.
   */
  COMMON: 'COMMON',

  /**
   * メイントップ画面.
   */
  MAIN_TOP: 'MAIN_TOP',
} as const

export type AdvertiseTypeKey = keyof Omit<typeof AdvertiseType, '_type'>
export type AdvertiseTypeAllKey = keyof typeof AdvertiseType
export type AdvertiseType = (typeof AdvertiseType)[AdvertiseTypeKey]

/**
 * 広告種類.
 */
export const getAllAdvertiseType = (): AdvertiseType[] => {
  const { _type: _, ...data } = AdvertiseType
  return Object.values(data)
}
/**
 * 広告種類.
 */
export const getAllAdvertiseTypeKey = (): AdvertiseTypeKey[] => {
  const { _type: _, ...data } = AdvertiseType
  return Object.keys(data) as AdvertiseTypeKey[]
}
/**
 * 広告種類.
 */
export const isAdvertiseType = (s: any): s is AdvertiseType =>
  getAllAdvertiseType().includes(s)

/**
 * 通常広告.
 */
export const isCommon = (v: any): v is 'COMMON' => v === AdvertiseType.COMMON
/**
 * メイントップ画面.
 */
export const isMainTop = (v: any): v is 'MAIN_TOP' =>
  v === AdvertiseType.MAIN_TOP
