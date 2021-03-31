/**
 * リクエストボディ
 */
export interface UpdateOwnUserRequest {
  type: 'UpdateOwnUserRequest'
  username: string
  displayName: string
}

/**
 * バリデーションエラー
 */
export interface UpdateOwnUserRequestValidationError {
  type: 'UpdateOwnUserRequestValidationError'
  errors: {
    username?: string[]
    displayName?: string[]
  }
  message: string
}

export const isUpdateOwnUserRequest = (v: any): v is UpdateOwnUserRequest =>
  v && v.type === 'UpdateOwnUserRequest'
export const isUpdateOwnUserRequestValidationError = (
  v: any
): v is UpdateOwnUserRequestValidationError =>
  v && v.type === 'UpdateOwnUserRequestValidationError'
