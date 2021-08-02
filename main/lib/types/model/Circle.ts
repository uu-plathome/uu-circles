export interface Circle {
  type: 'Circle'
  id: number
  slug: string
  release: boolean
  circleType: string
  /** サークル名 */ name: string
  nameKana: string
  shortName: string
  prefixName: string
  /** サークル紹介文 */ description: string
  /** デモ画面のみに表示 */ isOnlyDemo: boolean
  /** デモ画面に固定表示 */ isDemoFixed: true
  /** メイン画面に固定表示 */ isMainFixed: true
  commonPlaceOfActivity: string
  commonPlaceOfActivityDetail: string
  commonDateOfActivityMonday: boolean
  commonDateOfActivityTuesday: boolean
  commonDateOfActivityWednesday: boolean
  commonDateOfActivityThursday: boolean
  commonDateOfActivityFriday: boolean
  commonDateOfActivitySaturday: boolean
  commonDateOfActivitySunday: boolean
  commonDateOfActivityDetail: string
  isOnlineActivity: boolean
  onlinePlaceOfActivityDetail: string
  onlineDateOfActivityMonday: boolean
  onlineDateOfActivityTuesday: boolean
  onlineDateOfActivityWednesday: boolean
  onlineDateOfActivityThursday: boolean
  onlineDateOfActivityFriday: boolean
  onlineDateOfActivitySaturday: boolean
  onlineDateOfActivitySunday: boolean
  onlineDateOfActivityDetail: string
  admissionFeePerYear: number
  numberOfMembers: number
  isClubActivities: boolean
  appealingPoint1: string
  appealingPoint2: string
  appealingPoint3: string
  publicEmail: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  lineUrl: string
  youtubeUrl: string
  homepageUrl: string
  peingUrl: string
  githubUrl: string
  tiktokUrl: string
  participationUrl: string
  mainImageUrl: string
  handbillImageUrl: string
  activityImageUrl1: string
  activityImageUrl2: string
  activityImageUrl3: string
  activityImageUrl4: string
  activityImageUrl5: string
  activityImageUrl6: string
  /** 週の活動日数 */ weeklyActivityDays: number
  createdAt: string
  updatedAt: string
}

export const isCircle = (v: any): v is Circle => v && v.type === 'Circle'
export const newCircle = (circle: Circle): Circle => ({
  ...circle,
  type: 'Circle',
})
