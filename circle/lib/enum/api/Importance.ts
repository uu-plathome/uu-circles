/**
 * 重要度.
 */
export const Importance = {
  _type: 'Importance',

  /**
   * 高.
   */
  HIGH: 'HIGH',

  /**
   * 中.
   */
  MIDDLE: 'MIDDLE',

  /**
   * 低.
   */
  LOW: 'LOW',
} as const

export type ImportanceKey = keyof Omit<typeof Importance, '_type'>
export type ImportanceAllKey = keyof typeof Importance
export type Importance = typeof Importance[ImportanceKey]

/**
 * 重要度.
 */
export const getAllImportance = (): Importance[] => {
  const { _type: _, ...data } = Importance
  return Object.values(data)
}
/**
 * 重要度.
 */
export const getAllImportanceKey = (): ImportanceKey[] => {
  const { _type: _, ...data } = Importance
  return Object.keys(data) as ImportanceKey[]
}
/**
 * 重要度.
 */
export const isImportance = (s: any): s is Importance => getAllImportance().includes(s)

/**
 * 高.
 */
export const isHigh = (v: any): v is 'HIGH' => v === Importance.HIGH
/**
 * 中.
 */
export const isMiddle = (v: any): v is 'MIDDLE' => v === Importance.MIDDLE
/**
 * 低.
 */
export const isLow = (v: any): v is 'LOW' => v === Importance.LOW
