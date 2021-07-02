/**
 * 広告種類.
 */
export const DemoCircleNewjoyType = {
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
  FUTURE: 'FUTURE'
} as const

export type DemoCircleNewjoyTypeKey = keyof typeof DemoCircleNewjoyType
export type DemoCircleNewjoyType = typeof DemoCircleNewjoyType[keyof typeof DemoCircleNewjoyType]

/**
 * 広告種類.
 */
export const getAllDemoCircleNewjoyType = (): DemoCircleNewjoyType[] => Object.values(DemoCircleNewjoyType)
/**
 * 広告種類.
 */
export const getAllDemoCircleNewjoyTypeKey = (): DemoCircleNewjoyTypeKey[] => Object.keys(DemoCircleNewjoyType) as DemoCircleNewjoyTypeKey[]
/**
 * 広告種類.
 */
export const isDemoCircleNewjoyType = (s: any): s is DemoCircleNewjoyType => Object.values(DemoCircleNewjoyType).includes(s)

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
