/**
 * リクエストボディ
 */
export interface ForgotPasswordAdminRequest {
  type: 'ForgotPasswordAdminRequest'
  email: string
}

/**
 * バリデーションエラー
 */
export interface ForgotPasswordAdminRequestValidationError {
  type: 'ForgotPasswordAdminRequestValidationError'
  errors: {
    email?: string[]
  }
  message: string
}

export const isForgotPasswordAdminRequest = (
  v: any
): v is ForgotPasswordAdminRequest =>
  v && v.type === 'ForgotPasswordAdminRequest'
export const isForgotPasswordAdminRequestValidationError = (
  v: any
): v is ForgotPasswordAdminRequestValidationError =>
  v && v.type === 'ForgotPasswordAdminRequestValidationError'
