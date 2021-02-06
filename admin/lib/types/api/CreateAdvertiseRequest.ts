/**
 * リクエストボディ
 */
export interface CreateAdvertiseRequest {
    type: 'CreateAdvertiseRequest'
    title: string
    mainImageUrl?: string
    active?: boolean
    publishTo?: any
    publishFrom?: any
}

/**
 * バリデーションエラー
 */
export interface CreateAdvertiseRequestValidationError {
    type: 'CreateAdvertiseRequestValidationError'
    errors: {
        title?: string[]
        mainImageUrl?: string[]
        active?: string[]
        publishTo?: string[]
        publishFrom?: string[]
    }
    message: string
}

export const isCreateAdvertiseRequest = (v: any): v is CreateAdvertiseRequest => v && v.type === 'CreateAdvertiseRequest'
export const isCreateAdvertiseRequestValidationError = (v: any): v is CreateAdvertiseRequestValidationError => v && v.type === 'CreateAdvertiseRequestValidationError'
