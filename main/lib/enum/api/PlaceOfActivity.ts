/**
 * 活動場所
 */
export const PlaceOfActivity = {
  _type: 'PlaceOfActivity',

  /**
   * 峰キャンパス.
   */
  MINE: 'MINE',

  /**
   * 陽東キャンパス.
   */
  YOTO: 'YOTO',

  /**
   * 峰キャンパス, 陽東キャンパス.
   */
  MINE_AND_YOTO: 'MINE_AND_YOTO',

  /**
   * 新歓Discord.
   */
  NEWJOY_DISCORD: 'NEWJOY_DISCORD',

  /**
   * Zoom.
   */
  ZOOM: 'ZOOM',

  /**
   * Discord.
   */
  DISCORD: 'DISCORD',

  /**
   * その他.
   */
  OTHER: 'OTHER',
} as const

export type PlaceOfActivityKey = keyof Omit<typeof PlaceOfActivity, '_type'>
export type PlaceOfActivityAllKey = keyof typeof PlaceOfActivity
export type PlaceOfActivity = typeof PlaceOfActivity[PlaceOfActivityKey]

/**
 * 活動場所
 */
export const getAllPlaceOfActivity = (): PlaceOfActivity[] => {
  const { _type: _, ...data } = PlaceOfActivity
  return Object.values(data)
}
/**
 * 活動場所
 */
export const getAllPlaceOfActivityKey = (): PlaceOfActivityKey[] => {
  const { _type: _, ...data } = PlaceOfActivity
  return Object.keys(data) as PlaceOfActivityKey[]
}
/**
 * 活動場所
 */
export const isPlaceOfActivity = (s: any): s is PlaceOfActivity => getAllPlaceOfActivity().includes(s)

/**
 * 峰キャンパス.
 */
export const isMine = (v: any): v is 'MINE' => v === PlaceOfActivity.MINE
/**
 * 陽東キャンパス.
 */
export const isYoto = (v: any): v is 'YOTO' => v === PlaceOfActivity.YOTO
/**
 * 峰キャンパス, 陽東キャンパス.
 */
export const isMineAndYoto = (v: any): v is 'MINE_AND_YOTO' => v === PlaceOfActivity.MINE_AND_YOTO
/**
 * 新歓Discord.
 */
export const isNewjoyDiscord = (v: any): v is 'NEWJOY_DISCORD' => v === PlaceOfActivity.NEWJOY_DISCORD
/**
 * Zoom.
 */
export const isZoom = (v: any): v is 'ZOOM' => v === PlaceOfActivity.ZOOM
/**
 * Discord.
 */
export const isDiscord = (v: any): v is 'DISCORD' => v === PlaceOfActivity.DISCORD
/**
 * その他.
 */
export const isOther = (v: any): v is 'OTHER' => v === PlaceOfActivity.OTHER
