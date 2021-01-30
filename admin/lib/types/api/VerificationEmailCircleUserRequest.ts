/**
 * リクエストボディ
 */
export interface VerificationEmailCircleUserRequest {
    type: 'VerificationEmailCircleUserRequest'
    password: string
}

/**
 * バリデーションエラー
 */
export interface VerificationEmailCircleUserRequestValidationError {
    type: 'VerificationEmailCircleUserRequestValidationError'
    errors: {
        password?: string[]
    }
    message: string
}

export const isVerificationEmailCircleUserRequest = (v: any): v is VerificationEmailCircleUserRequest => v && v.type === 'VerificationEmailCircleUserRequest'
export const isVerificationEmailCircleUserRequestValidationError = (v: any): v is VerificationEmailCircleUserRequestValidationError => v && v.type === 'VerificationEmailCircleUserRequestValidationError'
