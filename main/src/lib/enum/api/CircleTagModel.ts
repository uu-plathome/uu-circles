/**
 * サークルタグ.
 */
export const CircleTagModel = {
  _type: 'CircleTagModel',

  /**
   * 運動系.
   */
  SPORT: 'SPORT',

  /**
   * 音楽系.
   */
  MUSIC: 'MUSIC',

  /**
   * 文化系.
   */
  CULTURE: 'CULTURE',

  /**
   * 農業・自然.
   */
  NATURE: 'NATURE',

  /**
   * ボランティア.
   */
  VOLUNTEER: 'VOLUNTEER',

  /**
   * 国際交流
   */
  INTERNATIONAL: 'INTERNATIONAL',

  /**
   * インカレ.
   */
  INCARE: 'INCARE',

  /**
   * ゆるい.
   */
  LOOSE: 'LOOSE',

  /**
   * 地域おこし.
   */
  COMMUNITY: 'COMMUNITY',

  /**
   * プログラミング.
   */
  PROGRAMMING: 'PROGRAMMING',

  /**
   * 部員急募
   */
  URGENT_RECRUITMENT: 'URGENT_RECRUITMENT',

  /**
   * 謎.
   */
  MYSTERY: 'MYSTERY',

  /**
   * 週5以上.
   */
  ACTIVE_ACTIVITY: 'ACTIVE_ACTIVITY',

  /**
   * マンモス.
   */
  MAMMOTH: 'MAMMOTH',

  /**
   * 月曜日活動.
   */
  MONDAY: 'MONDAY',

  /**
   * 火曜日活動.
   */
  TUESDAY: 'TUESDAY',

  /**
   * 水曜日活動.
   */
  WEDNESDAY: 'WEDNESDAY',

  /**
   * 木曜日活動.
   */
  THURSDAY: 'THURSDAY',

  /**
   * 金曜日活動.
   */
  FRIDAY: 'FRIDAY',

  /**
   * 月曜日のみ活動.
   */
  ONLY_MONDAY: 'ONLY_MONDAY',

  /**
   * 火曜日のみ活動.
   */
  ONLY_TUESDAY: 'ONLY_TUESDAY',

  /**
   * 水曜日のみ活動.
   */
  ONLY_WEDNESDAY: 'ONLY_WEDNESDAY',

  /**
   * 木曜日のみ活動.
   */
  ONLY_THURSDAY: 'ONLY_THURSDAY',

  /**
   * 金曜日のみ活動.
   */
  ONLY_FRIDAY: 'ONLY_FRIDAY',

  /**
   * 休日活動.
   */
  HOLIDAY: 'HOLIDAY',

  /**
   * 峰キャンパス.
   */
  MINE: 'MINE',

  /**
   * 陽東キャンパス.
   */
  YOTO: 'YOTO',
} as const

export type CircleTagModelKey = keyof Omit<typeof CircleTagModel, '_type'>
export type CircleTagModelAllKey = keyof typeof CircleTagModel
export type CircleTagModel = (typeof CircleTagModel)[CircleTagModelKey]

/**
 * サークルタグ.
 */
export const getAllCircleTagModel = (): CircleTagModel[] => {
  const { _type: _, ...data } = CircleTagModel
  return Object.values(data)
}
/**
 * サークルタグ.
 */
export const getAllCircleTagModelKey = (): CircleTagModelKey[] => {
  const { _type: _, ...data } = CircleTagModel
  return Object.keys(data) as CircleTagModelKey[]
}
/**
 * サークルタグ.
 */
export const isCircleTagModel = (s: any): s is CircleTagModel =>
  getAllCircleTagModel().includes(s)

/**
 * 運動系.
 */
export const isSport = (v: any): v is 'SPORT' => v === CircleTagModel.SPORT
/**
 * 音楽系.
 */
export const isMusic = (v: any): v is 'MUSIC' => v === CircleTagModel.MUSIC
/**
 * 文化系.
 */
export const isCulture = (v: any): v is 'CULTURE' =>
  v === CircleTagModel.CULTURE
/**
 * 農業・自然.
 */
export const isNature = (v: any): v is 'NATURE' => v === CircleTagModel.NATURE
/**
 * ボランティア.
 */
export const isVolunteer = (v: any): v is 'VOLUNTEER' =>
  v === CircleTagModel.VOLUNTEER
/**
 * 国際交流
 */
export const isInternational = (v: any): v is 'INTERNATIONAL' =>
  v === CircleTagModel.INTERNATIONAL
/**
 * インカレ.
 */
export const isIncare = (v: any): v is 'INCARE' => v === CircleTagModel.INCARE
/**
 * ゆるい.
 */
export const isLoose = (v: any): v is 'LOOSE' => v === CircleTagModel.LOOSE
/**
 * 地域おこし.
 */
export const isCommunity = (v: any): v is 'COMMUNITY' =>
  v === CircleTagModel.COMMUNITY
/**
 * プログラミング.
 */
export const isProgramming = (v: any): v is 'PROGRAMMING' =>
  v === CircleTagModel.PROGRAMMING
/**
 * 部員急募
 */
export const isUrgentRecruitment = (v: any): v is 'URGENT_RECRUITMENT' =>
  v === CircleTagModel.URGENT_RECRUITMENT
/**
 * 謎.
 */
export const isMystery = (v: any): v is 'MYSTERY' =>
  v === CircleTagModel.MYSTERY
/**
 * 週5以上.
 */
export const isActiveActivity = (v: any): v is 'ACTIVE_ACTIVITY' =>
  v === CircleTagModel.ACTIVE_ACTIVITY
/**
 * マンモス.
 */
export const isMammoth = (v: any): v is 'MAMMOTH' =>
  v === CircleTagModel.MAMMOTH
/**
 * 月曜日活動.
 */
export const isMonday = (v: any): v is 'MONDAY' => v === CircleTagModel.MONDAY
/**
 * 火曜日活動.
 */
export const isTuesday = (v: any): v is 'TUESDAY' =>
  v === CircleTagModel.TUESDAY
/**
 * 水曜日活動.
 */
export const isWednesday = (v: any): v is 'WEDNESDAY' =>
  v === CircleTagModel.WEDNESDAY
/**
 * 木曜日活動.
 */
export const isThursday = (v: any): v is 'THURSDAY' =>
  v === CircleTagModel.THURSDAY
/**
 * 金曜日活動.
 */
export const isFriday = (v: any): v is 'FRIDAY' => v === CircleTagModel.FRIDAY
/**
 * 月曜日のみ活動.
 */
export const isOnlyMonday = (v: any): v is 'ONLY_MONDAY' =>
  v === CircleTagModel.ONLY_MONDAY
/**
 * 火曜日のみ活動.
 */
export const isOnlyTuesday = (v: any): v is 'ONLY_TUESDAY' =>
  v === CircleTagModel.ONLY_TUESDAY
/**
 * 水曜日のみ活動.
 */
export const isOnlyWednesday = (v: any): v is 'ONLY_WEDNESDAY' =>
  v === CircleTagModel.ONLY_WEDNESDAY
/**
 * 木曜日のみ活動.
 */
export const isOnlyThursday = (v: any): v is 'ONLY_THURSDAY' =>
  v === CircleTagModel.ONLY_THURSDAY
/**
 * 金曜日のみ活動.
 */
export const isOnlyFriday = (v: any): v is 'ONLY_FRIDAY' =>
  v === CircleTagModel.ONLY_FRIDAY
/**
 * 休日活動.
 */
export const isHoliday = (v: any): v is 'HOLIDAY' =>
  v === CircleTagModel.HOLIDAY
/**
 * 峰キャンパス.
 */
export const isMine = (v: any): v is 'MINE' => v === CircleTagModel.MINE
/**
 * 陽東キャンパス.
 */
export const isYoto = (v: any): v is 'YOTO' => v === CircleTagModel.YOTO
