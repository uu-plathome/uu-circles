/**
 * 曜日.
 */
export const Week = {
  _type: 'Week',

  /**
   * 月曜日.
   */
  MONDAY: 'MONDAY',

  /**
   * 火曜日.
   */
  TUESDAY: 'TUESDAY',

  /**
   * 水曜日.
   */
  WEDNESDAY: 'WEDNESDAY',

  /**
   * 木曜日.
   */
  THURSDAY: 'THURSDAY',

  /**
   * 金曜日.
   */
  FRIDAY: 'FRIDAY',

  /**
   * 土曜日.
   */
  SATURDAY: 'SATURDAY',

  /**
   * 日曜日.
   */
  SUNDAY: 'SUNDAY',
} as const

export type WeekKey = keyof Omit<typeof Week, '_type'>
export type WeekAllKey = keyof typeof Week
export type Week = typeof Week[WeekKey]

/**
 * 曜日.
 */
export const getAllWeek = (): Week[] => {
  const { _type: _, ...data } = Week
  return Object.values(data)
}
/**
 * 曜日.
 */
export const getAllWeekKey = (): WeekKey[] => {
  const { _type: _, ...data } = Week
  return Object.keys(data) as WeekKey[]
}
/**
 * 曜日.
 */
export const isWeek = (s: any): s is Week => getAllWeek().includes(s)

/**
 * 月曜日.
 */
export const isMonday = (v: any): v is 'MONDAY' => v === Week.MONDAY
/**
 * 火曜日.
 */
export const isTuesday = (v: any): v is 'TUESDAY' => v === Week.TUESDAY
/**
 * 水曜日.
 */
export const isWednesday = (v: any): v is 'WEDNESDAY' => v === Week.WEDNESDAY
/**
 * 木曜日.
 */
export const isThursday = (v: any): v is 'THURSDAY' => v === Week.THURSDAY
/**
 * 金曜日.
 */
export const isFriday = (v: any): v is 'FRIDAY' => v === Week.FRIDAY
/**
 * 土曜日.
 */
export const isSaturday = (v: any): v is 'SATURDAY' => v === Week.SATURDAY
/**
 * 日曜日.
 */
export const isSunday = (v: any): v is 'SUNDAY' => v === Week.SUNDAY
