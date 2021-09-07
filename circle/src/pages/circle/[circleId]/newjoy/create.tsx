import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { CreateCircleNewJoyForm } from '@/src/components/organisms/Form/CircleNewJoy/CreateCircleNewJoyForm'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useBooleanInput, useDateInput, useStringInput } from '@/src/hooks/useInput'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { showCircle } from '@/src/lib/infra/api/circle'
import { createCircleNewJoy } from '@/src/lib/infra/api/circleNewjoy'
import {
  isRegisterCircleNewJoyRequestValidationError,
  RegisterCircleNewJoyRequest,
} from '@/src/lib/types/api/RegisterCircleNewJoyRequest'

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { circleId } = router.query

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const privateNewjoyLink = useStringInput('')
  const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
  const placeOfActivityDetail = useStringInput('')
  const publishFrom = useDateInput(null, 'YYYY/MM/DD', 'YYYY-MM-DD')
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const release = useBooleanInput(true)

  const { data: circle } = useSWR(
    [`/circle/api/circle/${circleId}`, Number(circleId)],
    () => showCircle(Number(circleId))
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createCircleNewJoy(Number(circleId), {
      type: 'RegisterCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      privateNewjoyLink: privateNewjoyLink.value,
      placeOfActivity: placeOfActivity.value,
      placeOfActivityDetail: placeOfActivityDetail.value,
      publishFrom: publishFrom.toFormatApi,
      startDate: startDate.toFormatApi,
      endDate: endDate.toFormatApi,
      release: release.toBoolean,
    } as RegisterCircleNewJoyRequest)

    if (data && isRegisterCircleNewJoyRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      description.setErrors(data.errors.description)
      url.setErrors(data.errors.url)
      privateNewjoyLink.setErrors(data.errors.privateNewjoyLink)
      placeOfActivity.setErrors(data.errors.placeOfActivity)
      placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
      publishFrom.setErrors(data.errors.publishFrom)
      startDate.setErrors(data.errors.startDate)
      endDate.setErrors(data.errors.endDate)
      release.setErrors(data.errors.release)
      setIsOpen(false)

      return
    }

    await router.push(`/circle/${Number(circleId)}/newjoy`)
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle && circle.circle
      ? [
        ...[
          {
            text: circle.circle.shortName || circle.circle.name,
            href: `/circle/[circleId]`,
            as: `/circle/${circle.circle.id}`,
          },
          {
            text: `新歓イベント一覧`,
            href: `/circle/[circleId]/newjoy`,
            as: `/circle/${circle.circle.id}/newjoy`,
          },
          {
            text: `新規追加`,
            href: `/circle/[circleId]/newjoy/create`,
            as: `/circle/${circle.circle.id}/newjoy/create`,
            active: true,
          },
        ],
      ]
      : []
  }, [circle])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" size="lg" />
          新歓イベントの新規追加
        </h1>

        <BaseContainer>
          <div className="py-4 px-4">
            <p className="pt-8">
              <Link
                href="/circle/[circleId]/newjoy"
                as={`/circle/${Number(circleId)}/newjoy`}
              >
                <a className="text-blue-500 underline">←新歓一覧に戻る</a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

            {circle && circle.circle ? (
              <CreateCircleNewJoyForm
                onSubmit={onSubmit}
                circle={circle.circle}
                form={{
                  title,
                  description,
                  url,
                  privateNewjoyLink,
                  placeOfActivity,
                  placeOfActivityDetail,
                  publishFrom,
                  startDate,
                  endDate,
                  release,
                }}
              />
            ) : (
              ''
            )}
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
