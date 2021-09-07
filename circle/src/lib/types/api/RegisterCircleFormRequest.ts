/**
 * リクエストボディ
 */
export interface RegisterCircleFormRequest {
  type: 'RegisterCircleFormRequest'
  username: string
  displayName?: string
  email: string
}

/**
 * バリデーションエラー
 */
export interface RegisterCircleFormRequestValidationError {
  type: 'RegisterCircleFormRequestValidationError'
  errors: {
    username?: string[]
    displayName?: string[]
    email?: string[]
  }
  message: string
}

export const isRegisterCircleFormRequest = (
  v: any
): v is RegisterCircleFormRequest => v && v.type === 'RegisterCircleFormRequest'
export const isRegisterCircleFormRequestValidationError = (
  v: any
): v is RegisterCircleFormRequestValidationError =>
  v && v.type === 'RegisterCircleFormRequestValidationError'
