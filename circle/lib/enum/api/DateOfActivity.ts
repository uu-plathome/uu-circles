/**
 * 活動日時
 */
export const DateOfActivity = {
  _type: 'DateOfActivity',

  /**
   * 毎週.
   */
  EVERY_WEEK: 'EVERY_WEEK',

  /**
   * 隔週.
   */
  EVERY_OTHER_WEEK: 'EVERY_OTHER_WEEK',
} as const

export type DateOfActivityKey = keyof typeof DateOfActivity
export type DateOfActivity = typeof DateOfActivity[keyof typeof DateOfActivity]

/**
 * 活動日時
 */
export const getAllDateOfActivity = (): DateOfActivity[] => Object.values(DateOfActivity)
/**
 * 活動日時
 */
export const getAllDateOfActivityKey = (): DateOfActivityKey[] => Object.keys(DateOfActivity) as DateOfActivityKey[]
/**
 * 活動日時
 */
export const isDateOfActivity = (s: any): s is DateOfActivity => Object.values(DateOfActivity).includes(s)

/**
 * 毎週.
 */
export const isEveryWeek = (v: any): v is 'EVERY_WEEK' => v === DateOfActivity.EVERY_WEEK
/**
 * 隔週.
 */
export const isEveryOtherWeek = (v: any): v is 'EVERY_OTHER_WEEK' => v === DateOfActivity.EVERY_OTHER_WEEK
