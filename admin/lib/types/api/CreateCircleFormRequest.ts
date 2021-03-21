/**
 * リクエストボディ
 */
export interface CreateCircleFormRequest {
  type: 'CreateCircleFormRequest'
  slug?: string
  release: boolean
  name: string
}

/**
 * バリデーションエラー
 */
export interface CreateCircleFormRequestValidationError {
  type: 'CreateCircleFormRequestValidationError'
  errors: {
    slug?: string[]
    release?: string[]
    name?: string[]
  }
  message: string
}

export const isCreateCircleFormRequest = (v: any): v is CreateCircleFormRequest => v && v.type === 'CreateCircleFormRequest'
export const isCreateCircleFormRequestValidationError = (v: any): v is CreateCircleFormRequestValidationError => v && v.type === 'CreateCircleFormRequestValidationError'
