/**
 * リクエストボディ
 */
export interface ForgotPasswordCircleRequest {
    type: 'ForgotPasswordCircleRequest'
    email: string
}

/**
 * バリデーションエラー
 */
export interface ForgotPasswordCircleRequestValidationError {
    type: 'ForgotPasswordCircleRequestValidationError'
    errors: {
        email?: string[]
    }
    message: string
}

export const isForgotPasswordCircleRequest = (v: any): v is ForgotPasswordCircleRequest => v && v.type === 'ForgotPasswordCircleRequest'
export const isForgotPasswordCircleRequestValidationError = (v: any): v is ForgotPasswordCircleRequestValidationError => v && v.type === 'ForgotPasswordCircleRequestValidationError'
