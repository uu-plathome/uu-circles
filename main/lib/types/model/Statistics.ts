export type Statistics = {
  /** サークル数 */
  circleCount: 20
  /** 活動費用の平均値 */
  averageActivityCost: 3000
  /** 週の活動頻度 */
  activityFrequency: {
    zero: number
    one: number
    two: number
    three: number
    four: number
    five: number
    six: number
    seven: number
  }
  /** オンライン活動状況 */
  onlineActivityActivity: {
    doOnlineCount: number
    onlyOnlineCount: number
  }
  /** 活動場所 */
  placeOfActivityFrequency: {
    mine: number
    yoto: number
    other: number
  }
}
