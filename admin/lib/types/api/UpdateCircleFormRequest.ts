/**
 * リクエストボディ
 */
export interface UpdateCircleFormRequest {
  type: 'UpdateCircleFormRequest'
  slug: string
  release: boolean
  isMainFixed?: boolean
  name: string
  nameKana?: string
  shortName?: string
  prefixName?: string
  circleType?: string
  description?: string
  commonPlaceOfActivity?: string
  commonPlaceOfActivityDetail?: string
  commonDateOfActivityMonday?: boolean
  commonDateOfActivityTuesday?: boolean
  commonDateOfActivityWednesday?: boolean
  commonDateOfActivityThursday?: boolean
  commonDateOfActivityFriday?: boolean
  commonDateOfActivitySaturday?: boolean
  commonDateOfActivitySunday?: boolean
  onlineDateOfActivityDetail?: string
  isOnlineActivity?: boolean
  onlinePlaceOfActivityDetail?: string
  onlineDateOfActivityMonday?: boolean
  onlineDateOfActivityTuesday?: boolean
  onlineDateOfActivityWednesday?: boolean
  onlineDateOfActivityThursday?: boolean
  onlineDateOfActivityFriday?: boolean
  onlineDateOfActivitySaturday?: boolean
  onlineDateOfActivitySunday?: boolean
  commonDateOfActivityDetail?: string
  admissionFeePerYear?: number
  numberOfMembers?: number
  isClubActivities?: boolean
  appealingPoint1?: string
  appealingPoint2?: string
  appealingPoint3?: string
  publicEmail?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  lineUrl?: string
  youtubeUrl?: string
  homepageUrl?: string
  peingUrl?: string
  githubUrl?: string
  tiktokUrl?: string
  participationUrl?: string
  mainImageUrl?: string
  activityImageUrl1?: string
  activityImageUrl2?: string
  activityImageUrl3?: string
  activityImageUrl4?: string
  activityImageUrl5?: string
  activityImageUrl6?: string
  wpUrl?: string
  wpTagTaxonomy?: string
  isViewWpPost?: boolean
  handbillImageUrl?: string
}

/**
 * バリデーションエラー
 */
export interface UpdateCircleFormRequestValidationError {
  type: 'UpdateCircleFormRequestValidationError'
  errors: {
    slug?: string[]
    release?: string[]
    isMainFixed?: string[]
    name?: string[]
    nameKana?: string[]
    shortName?: string[]
    prefixName?: string[]
    circleType?: string[]
    description?: string[]
    commonPlaceOfActivity?: string[]
    commonPlaceOfActivityDetail?: string[]
    commonDateOfActivityMonday?: string[]
    commonDateOfActivityTuesday?: string[]
    commonDateOfActivityWednesday?: string[]
    commonDateOfActivityThursday?: string[]
    commonDateOfActivityFriday?: string[]
    commonDateOfActivitySaturday?: string[]
    commonDateOfActivitySunday?: string[]
    onlineDateOfActivityDetail?: string[]
    isOnlineActivity?: string[]
    onlinePlaceOfActivityDetail?: string[]
    onlineDateOfActivityMonday?: string[]
    onlineDateOfActivityTuesday?: string[]
    onlineDateOfActivityWednesday?: string[]
    onlineDateOfActivityThursday?: string[]
    onlineDateOfActivityFriday?: string[]
    onlineDateOfActivitySaturday?: string[]
    onlineDateOfActivitySunday?: string[]
    commonDateOfActivityDetail?: string[]
    admissionFeePerYear?: string[]
    numberOfMembers?: string[]
    isClubActivities?: string[]
    appealingPoint1?: string[]
    appealingPoint2?: string[]
    appealingPoint3?: string[]
    publicEmail?: string[]
    twitterUrl?: string[]
    facebookUrl?: string[]
    instagramUrl?: string[]
    lineUrl?: string[]
    youtubeUrl?: string[]
    homepageUrl?: string[]
    peingUrl?: string[]
    githubUrl?: string[]
    tiktokUrl?: string[]
    participationUrl?: string[]
    mainImageUrl?: string[]
    activityImageUrl1?: string[]
    activityImageUrl2?: string[]
    activityImageUrl3?: string[]
    activityImageUrl4?: string[]
    activityImageUrl5?: string[]
    activityImageUrl6?: string[]
    wpUrl?: string[]
    wpTagTaxonomy?: string[]
    isViewWpPost?: string[]
    handbillImageUrl?: string[]
  }
  message: string
}

export const isUpdateCircleFormRequest = (
  v: any
): v is UpdateCircleFormRequest => v && v.type === 'UpdateCircleFormRequest'
export const isUpdateCircleFormRequestValidationError = (
  v: any
): v is UpdateCircleFormRequestValidationError =>
  v && v.type === 'UpdateCircleFormRequestValidationError'
