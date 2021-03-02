/**
 * リクエストボディ
 */
export interface CreateAdvertiseRequest {
  type: 'CreateAdvertiseRequest'
  title: string
  link?: string
  mainImageUrl?: string
  active?: boolean
  publishFrom?: any
  publishTo?: any
}

/**
 * バリデーションエラー
 */
export interface CreateAdvertiseRequestValidationError {
  type: 'CreateAdvertiseRequestValidationError'
  errors: {
    title?: string[]
    link?: string[]
    mainImageUrl?: string[]
    active?: string[]
    publishFrom?: string[]
    publishTo?: string[]
  }
  message: string
}

export const isCreateAdvertiseRequest = (v: any): v is CreateAdvertiseRequest =>
  v && v.type === 'CreateAdvertiseRequest'
export const isCreateAdvertiseRequestValidationError = (
  v: any
): v is CreateAdvertiseRequestValidationError =>
  v && v.type === 'CreateAdvertiseRequestValidationError'
