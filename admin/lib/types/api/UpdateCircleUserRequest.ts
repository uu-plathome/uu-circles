/**
 * リクエストボディ
 */
export interface UpdateCircleUserRequest {
  type: 'UpdateCircleUserRequest'
  username: string
  displayName: string
  active: boolean
  role: string
}

/**
 * バリデーションエラー
 */
export interface UpdateCircleUserRequestValidationError {
  type: 'UpdateCircleUserRequestValidationError'
  errors: {
    username?: string[]
    displayName?: string[]
    active?: string[]
    role?: string[]
  }
  message: string
}

export const isUpdateCircleUserRequest = (v: any): v is UpdateCircleUserRequest => v && v.type === 'UpdateCircleUserRequest'
export const isUpdateCircleUserRequestValidationError = (v: any): v is UpdateCircleUserRequestValidationError => v && v.type === 'UpdateCircleUserRequestValidationError'
