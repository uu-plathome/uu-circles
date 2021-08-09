/**
 * リクエストボディ
 */
export interface RegisterDemoCircleNewJoyRequest {
  type: 'RegisterDemoCircleNewJoyRequest'
  title: string
  description?: string
  url?: string
  placeOfActivity: string
  placeOfActivityDetail?: string
  demoCircleNewjoyType: string
  startDate: any
  endDate?: any
  published?: boolean
}

/**
 * バリデーションエラー
 */
export interface RegisterDemoCircleNewJoyRequestValidationError {
  type: 'RegisterDemoCircleNewJoyRequestValidationError'
  errors: {
    title?: string[]
    description?: string[]
    url?: string[]
    placeOfActivity?: string[]
    placeOfActivityDetail?: string[]
    demoCircleNewjoyType?: string[]
    startDate?: string[]
    endDate?: string[]
    published?: string[]
  }
  message: string
}

export const isRegisterDemoCircleNewJoyRequest = (v: any): v is RegisterDemoCircleNewJoyRequest => v && v.type === 'RegisterDemoCircleNewJoyRequest'
export const isRegisterDemoCircleNewJoyRequestValidationError = (v: any): v is RegisterDemoCircleNewJoyRequestValidationError => v && v.type === 'RegisterDemoCircleNewJoyRequestValidationError'
