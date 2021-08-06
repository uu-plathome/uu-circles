import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'

export interface Announcement {
  announcementId: number
  title: string
  description?: string
  link?: string
  announcementType: AnnouncementType
  importance: Importance
}
