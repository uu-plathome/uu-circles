/**
 * リクエストボディ
 */
export interface CreateOrUpdateCircleTagRequest {
    type: 'CreateOrUpdateCircleTagRequest'
    circleTag?: string[]
}

/**
 * バリデーションエラー
 */
export interface CreateOrUpdateCircleTagRequestValidationError {
    type: 'CreateOrUpdateCircleTagRequestValidationError'
    errors: {
        circleTag?: string[]
    }
    message: string
}

export const isCreateOrUpdateCircleTagRequest = (v: any): v is CreateOrUpdateCircleTagRequest => v && v.type === 'CreateOrUpdateCircleTagRequest'
export const isCreateOrUpdateCircleTagRequestValidationError = (v: any): v is CreateOrUpdateCircleTagRequestValidationError => v && v.type === 'CreateOrUpdateCircleTagRequestValidationError'
