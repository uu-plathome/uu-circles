/**
 * リクエストボディ
 */
export interface UpdateCircleNewJoyRequest {
  type: 'UpdateCircleNewJoyRequest'
  title: string
  description?: string
  url?: string
  privateNewjoyLink?: string
  placeOfActivity: string
  placeOfActivityDetail?: string
  publishFrom?: any
  startDate: any
  endDate?: any
  release?: boolean
}

/**
 * バリデーションエラー
 */
export interface UpdateCircleNewJoyRequestValidationError {
  type: 'UpdateCircleNewJoyRequestValidationError'
  errors: {
    title?: string[]
    description?: string[]
    url?: string[]
    privateNewjoyLink?: string[]
    placeOfActivity?: string[]
    placeOfActivityDetail?: string[]
    publishFrom?: string[]
    startDate?: string[]
    endDate?: string[]
    release?: string[]
  }
  message: string
}

export const isUpdateCircleNewJoyRequest = (
  v: any
): v is UpdateCircleNewJoyRequest => v && v.type === 'UpdateCircleNewJoyRequest'
export const isUpdateCircleNewJoyRequestValidationError = (
  v: any
): v is UpdateCircleNewJoyRequestValidationError =>
  v && v.type === 'UpdateCircleNewJoyRequestValidationError'
