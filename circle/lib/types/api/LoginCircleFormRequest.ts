/**
 * リクエストボディ
 */
export interface LoginCircleFormRequest {
  type: 'LoginCircleFormRequest'
  usernameOrEmail: string
  password: string
}

/**
 * バリデーションエラー
 */
export interface LoginCircleFormRequestValidationError {
  type: 'LoginCircleFormRequestValidationError'
  errors: {
    usernameOrEmail?: string[]
    password?: string[]
  }
  message: string
}

export const isLoginCircleFormRequest = (v: any): v is LoginCircleFormRequest =>
  v && v.type === 'LoginCircleFormRequest'
export const isLoginCircleFormRequestValidationError = (
  v: any
): v is LoginCircleFormRequestValidationError =>
  v && v.type === 'LoginCircleFormRequestValidationError'
