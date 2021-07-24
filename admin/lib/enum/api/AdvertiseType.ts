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

export type AdvertiseTypeKey = keyof typeof AdvertiseType
export type AdvertiseType = typeof AdvertiseType[keyof typeof AdvertiseType]

/**
 * 広告種類.
 */
export const getAllAdvertiseType = (): AdvertiseType[] => Object.values(AdvertiseType)
/**
 * 広告種類.
 */
export const getAllAdvertiseTypeKey = (): AdvertiseTypeKey[] => Object.keys(AdvertiseType) as AdvertiseTypeKey[]
/**
 * 広告種類.
 */
export const isAdvertiseType = (s: any): s is AdvertiseType => Object.values(AdvertiseType).includes(s)

/**
 * 通常広告.
 */
export const isCommon = (v: any): v is 'COMMON' => v === AdvertiseType.COMMON
/**
 * メイントップ画面.
 */
export const isMainTop = (v: any): v is 'MAIN_TOP' => v === AdvertiseType.MAIN_TOP
