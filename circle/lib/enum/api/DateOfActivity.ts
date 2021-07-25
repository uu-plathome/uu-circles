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

export type DateOfActivityKey = keyof Omit<typeof DateOfActivity, '_type'>
export type DateOfActivityAllKey = keyof typeof DateOfActivity
export type DateOfActivity = typeof DateOfActivity[DateOfActivityKey]

/**
 * 活動日時
 */
export const getAllDateOfActivity = (): DateOfActivity[] => {
  const { _type: _, ...data } = DateOfActivity
  return Object.values(data)
}
/**
 * 活動日時
 */
export const getAllDateOfActivityKey = (): DateOfActivityKey[] => {
  const { _type: _, ...data } = DateOfActivity
  return Object.keys(data) as DateOfActivityKey[]
}
/**
 * 活動日時
 */
export const isDateOfActivity = (s: any): s is DateOfActivity =>
  getAllDateOfActivity().includes(s)

/**
 * 毎週.
 */
export const isEveryWeek = (v: any): v is 'EVERY_WEEK' =>
  v === DateOfActivity.EVERY_WEEK
/**
 * 隔週.
 */
export const isEveryOtherWeek = (v: any): v is 'EVERY_OTHER_WEEK' =>
  v === DateOfActivity.EVERY_OTHER_WEEK
