export const StatisticsButtonState = {
  /**
   * 基本
   */
  COMMON: 'COMMON',

  /**
   * 団体
   */
  CIRCLE: 'CIRCLE',

  /**
   * その他
   */
  OTHER: 'OTHER',
}

export type StatisticsButtonStateKey = keyof typeof StatisticsButtonState
export type StatisticsButtonState = typeof StatisticsButtonState[keyof typeof StatisticsButtonState]
