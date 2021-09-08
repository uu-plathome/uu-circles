import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateAnnouncementForm } from '@/components/organisms/form/Announcement/CreateAnnouncementForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'
import { createAnnouncement } from '@/src/lib/infra/api/announcement'
import { isCreateAnnouncementRequestValidationError } from '@/src/lib/types/api/CreateAnnouncementRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = await createAnnouncement({
      type: 'CreateAnnouncementRequest',
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

    if (isCreateAnnouncementRequestValidationError(data)) {
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
      return
    }

    await router.push('/announcement')
  }

  return (
    <div>
      <Head>
        <title>お知らせ発行</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="お知らせ発行">
          <div className="py-4 px-2 border-2 border-gray-800">
            <CreateAnnouncementForm
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
