/**
 * リクエストボディ
 */
export interface LoginAdminFormRequest {
    type: 'LoginAdminFormRequest'
    usernameOrEmail: string
    password: string
}

/**
 * バリデーションエラー
 */
export interface LoginAdminFormRequestValidationError {
    type: 'LoginAdminFormRequestValidationError'
    errors: {
        usernameOrEmail?: string[]
        password?: string[]
    }
    message: string
}

export const isLoginAdminFormRequest = (v: any): v is LoginAdminFormRequest => v.type === 'LoginAdminFormRequest'
export const isLoginAdminFormRequestValidationError = (v: any): v is LoginAdminFormRequestValidationError => v.type === 'LoginAdminFormRequestValidationError'
