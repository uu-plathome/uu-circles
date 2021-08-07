/**
 * リクエストボディ
 */
export interface ImportCircleUserRequest {
  type: 'ImportCircleUserRequest'
  role: string
}

/**
 * バリデーションエラー
 */
export interface ImportCircleUserRequestValidationError {
  type: 'ImportCircleUserRequestValidationError'
  errors: {
    role?: string[]
  }
  message: string
}

export const isImportCircleUserRequest = (v: any): v is ImportCircleUserRequest => v && v.type === 'ImportCircleUserRequest'
export const isImportCircleUserRequestValidationError = (v: any): v is ImportCircleUserRequestValidationError => v && v.type === 'ImportCircleUserRequestValidationError'
