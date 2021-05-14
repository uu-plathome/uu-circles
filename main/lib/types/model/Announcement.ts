import { AnnouncementType } from '@/lib/enum/api/AnnouncementType'
import { Importance } from '@/lib/enum/api/Importance'

export interface Announcement {
  announcementId: number
  title: string
  description?: string
  link?: string
  announcementType: AnnouncementType
  importance: Importance
}
