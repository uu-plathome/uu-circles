import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { EditAnnouncementForm } from '@/src/components/organisms/form/Announcement/EditAnnouncementForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'
import { showAnnouncement, updateAnnouncement } from '@/src/lib/infra/api/announcement'
import { isUpdateAnnouncementRequestValidationError } from '@/src/lib/types/api/UpdateAnnouncementRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(true)
  const { announcementId } = router.query

  const title = useStringInput('')
  const description = useStringInput('')
  const link = useStringInput('')
  const announcementType = useStringInput(AnnouncementType.EVENT)
  const importance = useStringInput(Importance.MIDDLE)
  const forMainView = useBooleanInput(true)
  const forCircleMail = useBooleanInput(false)
  const forAdminView = useBooleanInput(false)
  const forAdminMail = useBooleanInput(false)
  const forNewjoyDiscord = useBooleanInput(false)
  const isMainViewFixed = useBooleanInput(false)
  const isCircleViewFixed = useBooleanInput(false)
  const isAdminViewFixed = useBooleanInput(false)
  const active = useBooleanInput(true)
  const notificationTime = useDateInput(
    null,
    'YYYY/MM/DD HH:mm',
    'YYYY-MM-DD HH:mm'
  )
  const publishTo = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const publishFrom = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')

  // 画面ロード時に一回実行
  useEffect(() => {
    const f = async () => {
      const foundsAnnouncement = await showAnnouncement(Number(announcementId))
      link.set(foundsAnnouncement.link)
      title.set(foundsAnnouncement.title)
      description.set(foundsAnnouncement.description)
      announcementType.set(foundsAnnouncement.announcementType)
      importance.set(foundsAnnouncement.importance)
      forMainView.set(foundsAnnouncement.forMainView)
      forCircleMail.set(foundsAnnouncement.forCircleMail)
      forAdminView.set(foundsAnnouncement.forAdminView)
      forAdminMail.set(foundsAnnouncement.forAdminMail)
      forNewjoyDiscord.set(foundsAnnouncement.forNewjoyDiscord)
      isMainViewFixed.set(foundsAnnouncement.isMainViewFixed)
      isCircleViewFixed.set(foundsAnnouncement.isCircleViewFixed)
      isAdminViewFixed.set(foundsAnnouncement.isAdminViewFixed)
      notificationTime.set(foundsAnnouncement.notificationTime)
      active.set(foundsAnnouncement.active)
      publishTo.set(foundsAnnouncement.publishTo)
      publishFrom.set(foundsAnnouncement.publishFrom)
      setIsOpen(false)
    }
    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateAnnouncement(Number(announcementId), {
      type: 'UpdateAnnouncementRequest',
      link: link.value,
      title: title.value,
      description: description.value,
      announcementType: announcementType.value,
      importance: importance.value,
      forMainView: forMainView.toBoolean,
      forCircleMail: forCircleMail.toBoolean,
      forAdminView: forAdminView.toBoolean,
      forAdminMail: forAdminMail.toBoolean,
      forNewjoyDiscord: forNewjoyDiscord.toBoolean,
      isMainViewFixed: isMainViewFixed.toBoolean,
      isCircleViewFixed: isCircleViewFixed.toBoolean,
      isAdminViewFixed: isAdminViewFixed.toBoolean,
      notificationTime: notificationTime.toFormatApi,
      active: active.toBoolean,
      publishTo: publishTo.toFormatApi,
      publishFrom: publishFrom.toFormatApi,
    })

    if (isUpdateAnnouncementRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      link.setErrors(data.errors.link)
      active.setErrors(data.errors.active)
      description.setErrors(data.errors.description)
      announcementType.setErrors(data.errors.announcementType)
      importance.setErrors(data.errors.importance)
      forMainView.setErrors(data.errors.forMainView)
      forCircleMail.setErrors(data.errors.forCircleMail)
      forAdminView.setErrors(data.errors.forAdminView)
      forAdminMail.setErrors(data.errors.forAdminMail)
      forNewjoyDiscord.setErrors(data.errors.forNewjoyDiscord)
      isMainViewFixed.setErrors(data.errors.isMainViewFixed)
      isCircleViewFixed.setErrors(data.errors.isCircleViewFixed)
      isAdminViewFixed.setErrors(data.errors.isAdminViewFixed)
      notificationTime.setErrors(data.errors.notificationTime)
      publishTo.setErrors(data.errors.publishTo)
      publishFrom.setErrors(data.errors.publishFrom)
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    await router.push('/announcement')
  }

  return (
    <div>
      <Head>
        <title>お知らせ編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="お知らせ編集">
          <SubmitLoading isOpen={isOpen} />

          <div className="py-4 px-2 border-2 border-gray-800">
            <EditAnnouncementForm
              onSubmit={onSubmit}
              form={{
                title,
                description,
                link,
                announcementType,
                importance,
                forMainView,
                forCircleMail,
                forAdminView,
                forAdminMail,
                forNewjoyDiscord,
                active,
                isMainViewFixed,
                isCircleViewFixed,
                isAdminViewFixed,
                notificationTime,
                publishFrom,
                publishTo,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
