/**
 * リクエストボディ
 */
export interface UpdateAdminUserRequest {
    type: 'UpdateAdminUserRequest'
    username: string
    displayName: string
    active: boolean
}

/**
 * バリデーションエラー
 */
export interface UpdateAdminUserRequestValidationError {
    type: 'UpdateAdminUserRequestValidationError'
    errors: {
        username?: string[]
        displayName?: string[]
        active?: string[]
    }
    message: string
}

export const isUpdateAdminUserRequest = (v: any): v is UpdateAdminUserRequest => v && v.type === 'UpdateAdminUserRequest'
export const isUpdateAdminUserRequestValidationError = (v: any): v is UpdateAdminUserRequestValidationError => v && v.type === 'UpdateAdminUserRequestValidationError'
