/**
 * リクエストボディ
 */
export interface RegisterAdminFormRequest {
    type: 'RegisterAdminFormRequest'
    username: string
    displayName?: string
    email: string
}

/**
 * バリデーションエラー
 */
export interface RegisterAdminFormRequestValidationError {
    type: 'RegisterAdminFormRequestValidationError'
    errors: {
        username?: string[]
        displayName?: string[]
        email?: string[]
    }
    message: string
}

export const isRegisterAdminFormRequest = (v: any): v is RegisterAdminFormRequest => v.type === 'RegisterAdminFormRequest'
export const isRegisterAdminFormRequestValidationError = (v: any): v is RegisterAdminFormRequestValidationError => v.type === 'RegisterAdminFormRequestValidationError'
