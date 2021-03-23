/**
 * リクエストボディ
 */
export interface AdminPutStorageRequest {
  type: 'AdminPutStorageRequest'
  file: Blob | File
}

/**
 * バリデーションエラー
 */
export interface AdminPutStorageRequestValidationError {
  type: 'AdminPutStorageRequestValidationError'
  errors: {
    file?: string[]
  }
  message: string
}

export const isAdminPutStorageRequest = (v: any): v is AdminPutStorageRequest =>
  v && v.type === 'AdminPutStorageRequest'
export const isAdminPutStorageRequestValidationError = (
  v: any
): v is AdminPutStorageRequestValidationError =>
  v && v.type === 'AdminPutStorageRequestValidationError'
