/**
 * リクエストボディ
 */
export interface UpdateAdvertiseRequest {
    type: 'UpdateAdvertiseRequest'
    title: string
    mainImageUrl?: string
    active?: boolean
    publishTo?: any
    publishFrom?: any
}

/**
 * バリデーションエラー
 */
export interface UpdateAdvertiseRequestValidationError {
    type: 'UpdateAdvertiseRequestValidationError'
    errors: {
        title?: string[]
        mainImageUrl?: string[]
        active?: string[]
        publishTo?: string[]
        publishFrom?: string[]
    }
    message: string
}

export const isUpdateAdvertiseRequest = (v: any): v is UpdateAdvertiseRequest => v && v.type === 'UpdateAdvertiseRequest'
export const isUpdateAdvertiseRequestValidationError = (v: any): v is UpdateAdvertiseRequestValidationError => v && v.type === 'UpdateAdvertiseRequestValidationError'
