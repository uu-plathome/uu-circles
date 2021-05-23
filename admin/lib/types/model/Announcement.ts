import { AnnouncementType } from '@/lib/enum/api/AnnouncementType'
import { Importance } from '@/lib/enum/api/Importance'

// お知らせ
export interface Announcement {
  id: number
  title: string
  description: string
  link: string
  announcementType: AnnouncementType
  importance: Importance
  slug: string
  forMainView: boolean
  forCircleMail: boolean
  forAdminView: boolean
  forAdminMail: boolean
  forNewjoyDiscord: boolean
  active: boolean
  isMainViewFixed: boolean
  isCircleViewFixed: boolean
  isAdminViewFixed: boolean
  notificationTime: string
  publishFrom: string
  publishTo: string
  notifiedAt: string
  deletedAt: string
  createdAt: string
  updatedAt: string
}
