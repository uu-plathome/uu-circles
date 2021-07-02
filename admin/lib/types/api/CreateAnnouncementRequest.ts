/**
 * リクエストボディ
 */
export interface CreateAnnouncementRequest {
  type: 'CreateAnnouncementRequest'
  title: string
  description?: string
  link?: string
  announcementType: string
  importance: string
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
export interface CreateAnnouncementRequestValidationError {
  type: 'CreateAnnouncementRequestValidationError'
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

export const isCreateAnnouncementRequest = (
  v: any
): v is CreateAnnouncementRequest => v && v.type === 'CreateAnnouncementRequest'
export const isCreateAnnouncementRequestValidationError = (
  v: any
): v is CreateAnnouncementRequestValidationError =>
  v && v.type === 'CreateAnnouncementRequestValidationError'
