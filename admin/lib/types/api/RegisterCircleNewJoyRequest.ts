/**
 * リクエストボディ
 */
export interface RegisterCircleNewJoyRequest {
    type: 'RegisterCircleNewJoyRequest'
    title: string
    description?: string
    url?: string
    place_of_activity?: string
    place_of_activity_detail?: string
    publish_from?: string
    publish_to?: string
    start_date?: string
    end_date?: string
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
        place_of_activity?: string[]
        place_of_activity_detail?: string[]
        publish_from?: string[]
        publish_to?: string[]
        start_date?: string[]
        end_date?: string[]
        release?: string[]
    }
    message: string
}

export const isRegisterCircleNewJoyRequest = (v: any): v is RegisterCircleNewJoyRequest => v.type === 'RegisterCircleNewJoyRequest'
export const isRegisterCircleNewJoyRequestValidationError = (v: any): v is RegisterCircleNewJoyRequestValidationError => v.type === 'RegisterCircleNewJoyRequestValidationError'
