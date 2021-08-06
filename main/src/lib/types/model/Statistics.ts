import { Circle } from './Circle'
import { CirclePageView } from './CirclePageView'

export type Statistics = {
  /** サークル数 */
  circleCount: number
  /** 活動費用の平均値 */
  averageActivityCost: number
  /** ページ閲覧数 */
  allPageViews: number
  /** ユーザ数 */
  allActiveUsers: number
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
  /** サークル種別 */
  circleType: {
    officialOrganization: number
    unofficialOrganization: number
    sendingOrganization: number
    studentGroup: number
  }
  /** 活動人数ランキング (高い順) */
  numberOfActivitiesRanking: {
    fifth: Circle
    first: Circle
    fourth: Circle
    second: Circle
    third: Circle
  }
  /** 活動費用ランキング (高い順) */
  admissionFeePerYearHighRankings: {
    fifth: Circle
    first: Circle
    fourth: Circle
    second: Circle
    third: Circle
  }
  /** 活動費用ランキング (低い順) */
  admissionFeePerYearSmallRankings: {
    fifth: Circle
    first: Circle
    fourth: Circle
    second: Circle
    third: Circle
  }
  /** 週の活動頻度ランキング (高い順) */
  activityFrequencyRankingDto: {
    fifth: Circle
    first: Circle
    fourth: Circle
    second: Circle
    third: Circle
  }
  /** サークルページ閲覧数ランキング (高い順) */
  circlePageViewsHighRanking: {
    fifth: Circle
    fifthPageView: CirclePageView
    first: Circle
    firstPageView: CirclePageView
    fourth: Circle
    fourthPageView: CirclePageView
    second: Circle
    secondPageView: CirclePageView
    third: Circle
    thirdPageView: CirclePageView
  }
}
