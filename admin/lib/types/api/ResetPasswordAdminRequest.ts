/**
 * リクエストボディ
 */
export interface ResetPasswordAdminRequest {
  type: 'ResetPasswordAdminRequest'
  token: any
  email: string
  password: string
}

/**
 * バリデーションエラー
 */
export interface ResetPasswordAdminRequestValidationError {
  type: 'ResetPasswordAdminRequestValidationError'
  errors: {
    token?: string[]
    email?: string[]
    password?: string[]
  }
  message: string
}

export const isResetPasswordAdminRequest = (v: any): v is ResetPasswordAdminRequest => v && v.type === 'ResetPasswordAdminRequest'
export const isResetPasswordAdminRequestValidationError = (v: any): v is ResetPasswordAdminRequestValidationError => v && v.type === 'ResetPasswordAdminRequestValidationError'
