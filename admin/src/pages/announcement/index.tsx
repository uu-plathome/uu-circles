import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AnnouncementListItem } from '@/components/molecules/list_items/AnnouncementListItem'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useSuccess } from '@/src/hooks/useSuccess'
import {
  deleteAnnouncement,
  getAnnouncementList,
} from '@/src/lib/infra/api/announcement'
import { Announcement } from '@/src/lib/types/model/Announcement'

const IndexPage: NextPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<string>('')
  const { success, setSuccess } = useSuccess<string>('')
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const fetchAnnouncements = async () => {
    setAnnouncements(await getAnnouncementList())
  }
  useSWR('/admin/api/announcement', fetchAnnouncements)

  const onDelete = async (announcementId: number) => {
    setError('')
    setSuccess('')
    setIsOpen(true)
    const data = await deleteAnnouncement(announcementId)

    if (data && data.type === 'Success') {
      setSuccess('お知らせを削除しました', 3000)
      fetchAnnouncements()
      setIsOpen(false)
      return
    }

    setIsOpen(false)
  }

  /**
   * お知らせデータのXlsxのダウンロード
   */
  // const onDownloadAdvertiseXlsx = async () => {
  //   await downloadAdvertiseXlsx()
  // }

  return (
    <div>
      <Head>
        <title>お知らせ管理</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="お知らせ管理"
          actionText="お知らせ発行"
          actionHref="/announcement/create"
        >
          {success ? <SuccessBunner text={success} /> : ''}

          {error ? <DangerBunner text={error} /> : ''}

          <SubmitLoading isOpen={isOpen} />

          {/* {announcements.length > 0 ? (
            <div className="mb-4">
              <BlueButton type="button" onClick={onDownloadAdvertiseXlsx}>
                お知らせのxlsxダウンロード
              </BlueButton>
            </div>
          ) : (
            ''
          )} */}

          <div className="p-2 border-2 border-gray-800">
            {announcements.length > 0
              ? announcements.map((announcement: Announcement) => {
                return (
                  <AnnouncementListItem
                    key={`announcement-${announcement.id}`}
                    announcement={announcement}
                    onDelete={onDelete}
                  />
                )
              })
              : ''}

            {announcements.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだお知らせが登録されていません</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
