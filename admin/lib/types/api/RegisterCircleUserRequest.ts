/**
 * リクエストボディ
 */
export interface RegisterCircleUserRequest {
  type: 'RegisterCircleUserRequest'
  username: string
  displayName?: string
  email: string
}

/**
 * バリデーションエラー
 */
export interface RegisterCircleUserRequestValidationError {
  type: 'RegisterCircleUserRequestValidationError'
  errors: {
    username?: string[]
    displayName?: string[]
    email?: string[]
  }
  message: string
}

export const isRegisterCircleUserRequest = (v: any): v is RegisterCircleUserRequest => v && v.type === 'RegisterCircleUserRequest'
export const isRegisterCircleUserRequestValidationError = (v: any): v is RegisterCircleUserRequestValidationError => v && v.type === 'RegisterCircleUserRequestValidationError'
