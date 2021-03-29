/**
 * リクエストボディ
 */
export interface VerificationResendCircleUserFormRequest {
  type: 'VerificationResendCircleUserFormRequest'
  email: string
}

/**
 * バリデーションエラー
 */
export interface VerificationResendCircleUserFormRequestValidationError {
  type: 'VerificationResendCircleUserFormRequestValidationError'
  errors: {
    email?: string[]
  }
  message: string
}

export const isVerificationResendCircleUserFormRequest = (v: any): v is VerificationResendCircleUserFormRequest => v && v.type === 'VerificationResendCircleUserFormRequest'
export const isVerificationResendCircleUserFormRequestValidationError = (v: any): v is VerificationResendCircleUserFormRequestValidationError => v && v.type === 'VerificationResendCircleUserFormRequestValidationError'
