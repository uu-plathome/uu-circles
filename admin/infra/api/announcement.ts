import { Announcement } from '@/lib/types/model/Announcement'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

/**
 * お知らせ一覧
 */
export const getAnnouncementList = async () => {
  const { data } = await axiosInstance.get<{
    data: Announcement[]
  }>('/admin/api/announcement')

  return data.data
}

/**
 * お知らせの取得
 *
 * @param announcementId
 */
export const showAnnouncement = async (announcementId: number) => {
  const { data } = await axiosInstance.get<{
    data: Announcement
  }>(`/admin/api/announcement/${announcementId}`)

  return data.data
}


/**
 * 広告の作成
 *
 * @param advertise
 */
export const createAnnouncement = async (announcement: CreateAdvertiseRequest) => {
  try {
    const { data } = await axiosInstance.post('/admin/api/announcement', announcement)

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<CreateAdvertiseRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'CreateAdvertiseRequestValidationError',
      } as CreateAdvertiseRequestValidationError
    }

    console.error(e)
  }
}

/**
 * 広告の更新
 *
 * @param announcementId
 * @param announcement
 */
export const updateAnnouncement = async (
  announcementId: number,
  announcement: UpdateAdvertiseRequest
) => {
  try {
    const { data } = await axiosInstance.put(
      `/admin/api/announcement/${announcementId}`,
      announcement
    )

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<UpdateAdvertiseRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateAdvertiseRequestValidationError',
      } as UpdateAdvertiseRequestValidationError
    }

    console.error(e)
  }
}

/**
 * 広告の削除
 *
 * @param announcementId
 */
export const deleteAnnouncement = async (announcementId: number) => {
  try {
    await axiosInstance.delete<{
      success: true
    }>(`/admin/api/announcement/${announcementId}`)

    return {
      type: 'Success',
    } as {
      type: 'Success'
    }
  } catch (_e) {
    console.error(_e)
  }
}
