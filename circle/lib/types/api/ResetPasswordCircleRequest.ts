/**
 * リクエストボディ
 */
export interface ResetPasswordCircleRequest {
    type: 'ResetPasswordCircleRequest'
    token: any
    email: string
    password: string
}

/**
 * バリデーションエラー
 */
export interface ResetPasswordCircleRequestValidationError {
    type: 'ResetPasswordCircleRequestValidationError'
    errors: {
        token?: string[]
        email?: string[]
        password?: string[]
    }
    message: string
}

export const isResetPasswordCircleRequest = (v: any): v is ResetPasswordCircleRequest => v && v.type === 'ResetPasswordCircleRequest'
export const isResetPasswordCircleRequestValidationError = (v: any): v is ResetPasswordCircleRequestValidationError => v && v.type === 'ResetPasswordCircleRequestValidationError'
