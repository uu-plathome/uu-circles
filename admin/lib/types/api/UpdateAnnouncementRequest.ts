/**
 * リクエストボディ
 */
export interface UpdateAnnouncementRequest {
  type: 'UpdateAnnouncementRequest'
  title?: string
  description?: string
  link?: string
  announcementType?: string
  importance?: string
  forMainView: boolean
  forCircleMail: boolean
  forAdminView: boolean
  forAdminMail: boolean
  forNewjoyDiscord: boolean
  active: boolean
  isMainViewFixed: boolean
  isCircleViewFixed: boolean
  isAdminViewFixed: boolean
  notificationTime?: any
  publishFrom?: any
  publishTo?: any
}

/**
 * バリデーションエラー
 */
export interface UpdateAnnouncementRequestValidationError {
  type: 'UpdateAnnouncementRequestValidationError'
  errors: {
    title?: string[]
    description?: string[]
    link?: string[]
    announcementType?: string[]
    importance?: string[]
    forMainView?: string[]
    forCircleMail?: string[]
    forAdminView?: string[]
    forAdminMail?: string[]
    forNewjoyDiscord?: string[]
    active?: string[]
    isMainViewFixed?: string[]
    isCircleViewFixed?: string[]
    isAdminViewFixed?: string[]
    notificationTime?: string[]
    publishFrom?: string[]
    publishTo?: string[]
  }
  message: string
}

export const isUpdateAnnouncementRequest = (
  v: any
): v is UpdateAnnouncementRequest => v && v.type === 'UpdateAnnouncementRequest'
export const isUpdateAnnouncementRequestValidationError = (
  v: any
): v is UpdateAnnouncementRequestValidationError =>
  v && v.type === 'UpdateAnnouncementRequestValidationError'
