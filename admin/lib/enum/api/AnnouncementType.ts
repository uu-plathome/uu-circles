/**
 * お知らせ種類
 */
export const AnnouncementType = {
  /**
   * メンテナンス
   */
  MAINTENANCE: 'MAINTENANCE',

  /**
   * アップデート
   */
  UPDATE_FEATURE: 'UPDATE_FEATURE',

  /**
   * 不具合
   */
  BUG: 'BUG',

  /**
   * 新着サークル
   */
  NEW_CIRCLE: 'NEW_CIRCLE',

  /**
   * イベント
   */
  EVENT: 'EVENT',

  /**
   * アンケート
   */
  QUESTIONNAIRE: 'QUESTIONNAIRE',

  /**
   * 広告
   */
  ADVERTISE: 'ADVERTISE',

  /**
   * uu-yell
   */
  UU_YELL: 'UU_YELL',
} as const

export type AnnouncementTypeKey = keyof typeof AnnouncementType
export type AnnouncementType =
  typeof AnnouncementType[keyof typeof AnnouncementType]

/**
 * お知らせ種類
 */
export const getAllAnnouncementType = (): AnnouncementType[] =>
  Object.values(AnnouncementType)
/**
 * お知らせ種類
 */
export const getAllAnnouncementTypeKey = (): AnnouncementTypeKey[] =>
  Object.keys(AnnouncementType) as AnnouncementTypeKey[]
/**
 * お知らせ種類
 */
export const isAnnouncementType = (s: any): s is AnnouncementType =>
  Object.values(AnnouncementType).includes(s)

/**
 * メンテナンス
 */
export const isMaintenance = (v: any): v is 'MAINTENANCE' =>
  v === AnnouncementType.MAINTENANCE
/**
 * アップデート
 */
export const isUpdateFeature = (v: any): v is 'UPDATE_FEATURE' =>
  v === AnnouncementType.UPDATE_FEATURE
/**
 * 不具合
 */
export const isBug = (v: any): v is 'BUG' => v === AnnouncementType.BUG
/**
 * 新着サークル
 */
export const isNewCircle = (v: any): v is 'NEW_CIRCLE' =>
  v === AnnouncementType.NEW_CIRCLE
/**
 * イベント
 */
export const isEvent = (v: any): v is 'EVENT' => v === AnnouncementType.EVENT
/**
 * アンケート
 */
export const isQuestionnaire = (v: any): v is 'QUESTIONNAIRE' =>
  v === AnnouncementType.QUESTIONNAIRE
/**
 * 広告
 */
export const isAdvertise = (v: any): v is 'ADVERTISE' =>
  v === AnnouncementType.ADVERTISE
/**
 * uu-yell
 */
export const isUuYell = (v: any): v is 'UU_YELL' =>
  v === AnnouncementType.UU_YELL
