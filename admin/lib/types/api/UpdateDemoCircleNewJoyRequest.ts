/**
 * リクエストボディ
 */
export interface UpdateDemoCircleNewJoyRequest {
  type: 'UpdateDemoCircleNewJoyRequest'
  title: string
  description?: string
  url?: string
  demoCircleNewjoyType: string
  placeOfActivity: string
  placeOfActivityDetail?: string
  startDate: any
  endDate?: any
  published?: boolean
}

/**
 * バリデーションエラー
 */
export interface UpdateDemoCircleNewJoyRequestValidationError {
  type: 'UpdateDemoCircleNewJoyRequestValidationError'
  errors: {
    title?: string[]
    description?: string[]
    url?: string[]
    demoCircleNewjoyType?: string[]
    placeOfActivity?: string[]
    placeOfActivityDetail?: string[]
    startDate?: string[]
    endDate?: string[]
    published?: string[]
  }
  message: string
}

export const isUpdateDemoCircleNewJoyRequest = (
  v: any
): v is UpdateDemoCircleNewJoyRequest =>
  v && v.type === 'UpdateDemoCircleNewJoyRequest'
export const isUpdateDemoCircleNewJoyRequestValidationError = (
  v: any
): v is UpdateDemoCircleNewJoyRequestValidationError =>
  v && v.type === 'UpdateDemoCircleNewJoyRequestValidationError'
