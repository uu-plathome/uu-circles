/**
 * リクエストボディ
 */
export interface UpdateCircleFormRequest {
    type: 'UpdateCircleFormRequest'
    slug: string
    release: boolean
    name: string
    nameKana?: string
    shortName?: string
    prefixName?: string
    circleType?: string
    description?: string
    intro?: string
    placeOfActivity?: string
    placeOfActivityDetail?: string
    doOnlineActivity?: boolean
    dateOfActivityMonday?: string
    dateOfActivityTuesday?: string
    dateOfActivityWednesday?: string
    dateOfActivityThursday?: string
    dateOfActivityFriday?: string
    dateOfActivitySaturday?: string
    dateOfActivitySunday?: string
    dateOfActivityDetail?: string
    admissionFee?: string
    numberOfMembers?: number
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
}

/**
 * バリデーションエラー
 */
export interface UpdateCircleFormRequestValidationError {
    type: 'UpdateCircleFormRequestValidationError'
    error: {
        slug?: string
        release?: string
        name?: string
        nameKana?: string
        shortName?: string
        prefixName?: string
        circleType?: string
        description?: string
        intro?: string
        placeOfActivity?: string
        placeOfActivityDetail?: string
        doOnlineActivity?: string
        dateOfActivityMonday?: string
        dateOfActivityTuesday?: string
        dateOfActivityWednesday?: string
        dateOfActivityThursday?: string
        dateOfActivityFriday?: string
        dateOfActivitySaturday?: string
        dateOfActivitySunday?: string
        dateOfActivityDetail?: string
        admissionFee?: string
        numberOfMembers?: string
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
    }
    message: string
}

export const isUpdateCircleFormRequest = (v: any): v is UpdateCircleFormRequest => v.type === 'UpdateCircleFormRequest'
export const isUpdateCircleFormRequestValidationError = (v: any): v is UpdateCircleFormRequestValidationError => v.type === 'UpdateCircleFormRequestValidationError'
