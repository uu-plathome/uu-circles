import { axiosInstance } from '@/src/lib/infra/api/index'
import { Announcement } from '@/src/lib/types/model/Announcement'

/**
 * 固定表示する用のお知らせを取得
 */
export const getFixedViewAnnouncement = async () => {
  type Response = {
    data: Announcement
  }

  const { data } = await axiosInstance.get<Response>(
    '/circle/api/announcement/fixed'
  )

  return data.data
}
