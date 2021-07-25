/**
 * 広告種類.
 */
export const DemoCircleNewjoyType = {
  _type: 'DemoCircleNewjoyType',

  /**
   * 今.
   */
  NOW: 'NOW',

  /**
   * 今日.
   */
  TODAY: 'TODAY',

  /**
   * 未来.
   */
  FUTURE: 'FUTURE',
} as const

export type DemoCircleNewjoyTypeKey = keyof Omit<typeof DemoCircleNewjoyType, '_type'>
export type DemoCircleNewjoyTypeAllKey = keyof typeof DemoCircleNewjoyType
export type DemoCircleNewjoyType = typeof DemoCircleNewjoyType[DemoCircleNewjoyTypeKey]

/**
 * 広告種類.
 */
export const getAllDemoCircleNewjoyType = (): DemoCircleNewjoyType[] => {
  const { _type: _, ...data } = DemoCircleNewjoyType
  return Object.values(data)
}
/**
 * 広告種類.
 */
export const getAllDemoCircleNewjoyTypeKey = (): DemoCircleNewjoyTypeKey[] => {
  const { _type: _, ...data } = DemoCircleNewjoyType
  return Object.keys(data) as DemoCircleNewjoyTypeKey[]
}
/**
 * 広告種類.
 */
export const isDemoCircleNewjoyType = (s: any): s is DemoCircleNewjoyType => getAllDemoCircleNewjoyType().includes(s)

/**
 * 今.
 */
export const isNow = (v: any): v is 'NOW' => v === DemoCircleNewjoyType.NOW
/**
 * 今日.
 */
export const isToday = (v: any): v is 'TODAY' => v === DemoCircleNewjoyType.TODAY
/**
 * 未来.
 */
export const isFuture = (v: any): v is 'FUTURE' => v === DemoCircleNewjoyType.FUTURE
