/**
 * リクエストボディ
 */
export interface UpdateAdvertiseRequest {
    type: 'UpdateAdvertiseRequest'
    title: string
    link?: string
    mainImageUrl?: string
    active?: boolean
    advertiseType?: string
    publishFrom?: any
    publishTo?: any
}

/**
 * バリデーションエラー
 */
export interface UpdateAdvertiseRequestValidationError {
    type: 'UpdateAdvertiseRequestValidationError'
    errors: {
        title?: string[]
        link?: string[]
        mainImageUrl?: string[]
        active?: string[]
        advertiseType?: string[]
        publishFrom?: string[]
        publishTo?: string[]
    }
    message: string
}

export const isUpdateAdvertiseRequest = (v: any): v is UpdateAdvertiseRequest => v && v.type === 'UpdateAdvertiseRequest'
export const isUpdateAdvertiseRequestValidationError = (v: any): v is UpdateAdvertiseRequestValidationError => v && v.type === 'UpdateAdvertiseRequestValidationError'
