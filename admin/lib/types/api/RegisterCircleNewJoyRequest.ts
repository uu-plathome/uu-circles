/**
 * リクエストボディ
 */
export interface RegisterCircleNewJoyRequest {
    type: 'RegisterCircleNewJoyRequest'
    title: string
    description?: string
    url?: string
    placeOfActivity: string
    placeOfActivityDetail?: string
    publishFrom?: string
    startDate?: string
    endDate?: string
    release?: boolean
}

/**
 * バリデーションエラー
 */
export interface RegisterCircleNewJoyRequestValidationError {
    type: 'RegisterCircleNewJoyRequestValidationError'
    errors: {
        title?: string[]
        description?: string[]
        url?: string[]
        placeOfActivity?: string[]
        placeOfActivityDetail?: string[]
        publishFrom?: string[]
        startDate?: string[]
        endDate?: string[]
        release?: string[]
    }
    message: string
}

export const isRegisterCircleNewJoyRequest = (v: any): v is RegisterCircleNewJoyRequest => v && v.type === 'RegisterCircleNewJoyRequest'
export const isRegisterCircleNewJoyRequestValidationError = (v: any): v is RegisterCircleNewJoyRequestValidationError => v && v.type === 'RegisterCircleNewJoyRequestValidationError'
