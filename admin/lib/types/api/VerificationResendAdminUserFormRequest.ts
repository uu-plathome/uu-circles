/**
 * リクエストボディ
 */
export interface VerificationResendAdminUserFormRequest {
    type: 'VerificationResendAdminUserFormRequest'
    email: string
}

/**
 * バリデーションエラー
 */
export interface VerificationResendAdminUserFormRequestValidationError {
    type: 'VerificationResendAdminUserFormRequestValidationError'
    errors: {
        email?: string[]
    }
    message: string
}

export const isVerificationResendAdminUserFormRequest = (v: any): v is VerificationResendAdminUserFormRequest => v.type === 'VerificationResendAdminUserFormRequest'
export const isVerificationResendAdminUserFormRequestValidationError = (v: any): v is VerificationResendAdminUserFormRequestValidationError => v.type === 'VerificationResendAdminUserFormRequestValidationError'
