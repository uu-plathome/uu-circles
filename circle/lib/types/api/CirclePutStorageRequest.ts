/**
 * リクエストボディ
 */
export interface CirclePutStorageRequest {
  type: 'CirclePutStorageRequest'
  file: Blob | File
}

/**
 * バリデーションエラー
 */
export interface CirclePutStorageRequestValidationError {
  type: 'CirclePutStorageRequestValidationError'
  errors: {
    file?: string[]
  }
  message: string
}

export const isCirclePutStorageRequest = (v: any): v is CirclePutStorageRequest => v && v.type === 'CirclePutStorageRequest'
export const isCirclePutStorageRequestValidationError = (v: any): v is CirclePutStorageRequestValidationError => v && v.type === 'CirclePutStorageRequestValidationError'
