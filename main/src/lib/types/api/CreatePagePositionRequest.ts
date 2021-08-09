/**
 * リクエストボディ
 */
export interface CreatePagePositionRequest {
  type: 'CreatePagePositionRequest'
  pageUrl: string
  pageName: string
  pagePositionId: string
  screenWidth?: number
}

/**
 * バリデーションエラー
 */
export interface CreatePagePositionRequestValidationError {
  type: 'CreatePagePositionRequestValidationError'
  errors: {
    pageUrl?: string[]
    pageName?: string[]
    pagePositionId?: string[]
    screenWidth?: string[]
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
