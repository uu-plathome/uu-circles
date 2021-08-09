/**
 * リクエストボディ
 */
export interface CreatePagePositionRequest {
  type: 'CreatePagePositionRequest'
  pageUrl: string
  pagePositionId: string
}

/**
 * バリデーションエラー
 */
export interface CreatePagePositionRequestValidationError {
  type: 'CreatePagePositionRequestValidationError'
  errors: {
    pageUrl?: string[]
    pagePositionId?: string[]
  }
  message: string
}

export const isCreatePagePositionRequest = (
  v: any
): v is CreatePagePositionRequest => v && v.type === 'CreatePagePositionRequest'
export const isCreatePagePositionRequestValidationError = (
  v: any
): v is CreatePagePositionRequestValidationError =>
  v && v.type === 'CreatePagePositionRequestValidationError'
