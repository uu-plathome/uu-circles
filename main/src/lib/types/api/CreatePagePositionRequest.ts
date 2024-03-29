/**
 * リクエストボディ
 */
export interface CreatePagePositionRequest {
  type: 'CreatePagePositionRequest'
  circleSlug?: string
  pageUrl: string
  pageName: string
  pagePositionId: string
  screenWidth?: number
  screenHeight?: number
}

/**
 * バリデーションエラー
 */
export interface CreatePagePositionRequestValidationError {
  type: 'CreatePagePositionRequestValidationError'
  errors: {
    circleSlug?: string[]
    pageUrl?: string[]
    pageName?: string[]
    pagePositionId?: string[]
    screenWidth?: string[]
    screenHeight?: string[]
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
