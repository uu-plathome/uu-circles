/**
 * 活動場所
 */
export const PlaceOfActivity = {
  /**
   * 峰キャンパス
   */
  MINE: 'MINE',

  /**
   * 陽東キャンパス
   */
  YOTO: 'YOTO',

  /**
   * 峰キャンパス, 陽東キャンパス
   */
  MINE_AND_YOTO: 'MINE_AND_YOTO',

  /**
   * ディスコード
   */
  DISCORD: 'DISCORD',

  /**
   * その他
   */
  OTHER: 'OTHER',
} as const

export type PlaceOfActivityKey = keyof typeof PlaceOfActivity
export type PlaceOfActivity = typeof PlaceOfActivity[keyof typeof PlaceOfActivity]

/**
 * 活動場所
 */
export const getAllPlaceOfActivity = (): PlaceOfActivity[] =>
  Object.values(PlaceOfActivity)
/**
 * 活動場所
 */
export const getAllPlaceOfActivityKey = (): PlaceOfActivityKey[] =>
  Object.keys(PlaceOfActivity) as PlaceOfActivityKey[]
/**
 * 活動場所
 */
export const isPlaceOfActivity = (s: any): s is PlaceOfActivity =>
  Object.values(PlaceOfActivity).includes(s)

/**
 * 峰キャンパス
 */
export const isMine = (v: any): v is 'MINE' => v === PlaceOfActivity.MINE
/**
 * 陽東キャンパス
 */
export const isYoto = (v: any): v is 'YOTO' => v === PlaceOfActivity.YOTO
/**
 * 峰キャンパス, 陽東キャンパス
 */
export const isMineAndYoto = (v: any): v is 'MINE_AND_YOTO' =>
  v === PlaceOfActivity.MINE_AND_YOTO
/**
 * ディスコード
 */
export const isDiscord = (v: any): v is 'DISCORD' =>
  v === PlaceOfActivity.DISCORD
/**
 * その他
 */
export const isOther = (v: any): v is 'OTHER' => v === PlaceOfActivity.OTHER
