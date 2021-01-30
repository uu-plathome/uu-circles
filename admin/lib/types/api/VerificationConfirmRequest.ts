/**
 * リクエストボディ
 */
export interface VerificationConfirmRequest {
    type: 'VerificationConfirmRequest'
    password: string
}

/**
 * バリデーションエラー
 */
export interface VerificationConfirmRequestValidationError {
    type: 'VerificationConfirmRequestValidationError'
    errors: {
        password?: string[]
    }
    message: string
}

export const isVerificationConfirmRequest = (v: any): v is VerificationConfirmRequest => v && v.type === 'VerificationConfirmRequest'
export const isVerificationConfirmRequestValidationError = (v: any): v is VerificationConfirmRequestValidationError => v && v.type === 'VerificationConfirmRequestValidationError'
