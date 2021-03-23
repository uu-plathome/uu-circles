import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import {
  deleteCircleNewJoy,
  getCircleNewJoy,
  updateCircleNewJoy,
} from '@/infra/api/circleNewjoy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import {
  isUpdateCircleNewJoyRequestValidationError,
  UpdateCircleNewJoyRequest,
} from '@/lib/types/api/UpdateCircleNewJoyRequest'
import { Circle } from '@/lib/types/model/Circle'
import { EditCircleNewJoyForm } from '@/components/organisms/Form/CircleNewJoy/EditCircleNewJoyForm'
import { AuthContext } from '@/contexts/AuthContext'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import Link from 'next/link'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const { circleId, circleNewJoyId } = router.query
  const [circle, setCircle] = useState<Circle | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const privateNewjoyLink = useStringInput('')
  const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
  const placeOfActivityDetail = useStringInput('')
  const publishFrom = useDateInput(null, 'YYYY-MM-DD')
  const startDate = useDateInput(null, 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY-MM-DD HH:mm')
  const release = useBooleanInput(true)

  useEffect(() => {
    const f = async () => {
      const { circle: newCircle, circleNewJoy } = await getCircleNewJoy(
        Number(circleId),
        Number(circleNewJoyId)
      )
      setCircle(newCircle)

      title.set(circleNewJoy.title)
      description.set(circleNewJoy.description)
      url.set(circleNewJoy.url)
      privateNewjoyLink.set(circleNewJoy.privateNewjoyLink)
      placeOfActivity.set(circleNewJoy.placeOfActivity)
      placeOfActivityDetail.set(circleNewJoy.placeOfActivityDetail)
      publishFrom.set(circleNewJoy.publishFrom)
      startDate.set(circleNewJoy.startDate)
      endDate.set(circleNewJoy.endDate)
      release.set(circleNewJoy.release)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateCircleNewJoy(
      Number(circleId),
      Number(circleNewJoyId),
      {
        type: 'UpdateCircleNewJoyRequest',
        title: title.value,
        description: description.value,
        url: url.value,
        privateNewjoyLink: privateNewjoyLink.value,
        placeOfActivity: placeOfActivity.value,
        placeOfActivityDetail: placeOfActivityDetail.value,
        publishFrom: publishFrom.value,
        startDate: startDate.value,
        endDate: endDate.value,
        release: release.value === 'true',
      } as UpdateCircleNewJoyRequest
    )

    if (data && isUpdateCircleNewJoyRequestValidationError(data)) {
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

  const onDelete = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsOpen(true)

    try {
      await deleteCircleNewJoy(Number(circleId), Number(circleNewJoyId))
    } catch (e) {
      alert('エラーが発生しました。')
      setIsOpen(false)
      return
    }

    await router.push(`/circle/${Number(circleId)}/newjoy`)
  }

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" size="lg" />
          新歓イベントの編集
        </h1>

        <BaseContainer>
          <div className="px-4 py-4">
            <p className="pt-8">
              <Link
                href="/circle/[circleId]/newjoy"
                as={`/circle/${Number(circleId)}/newjoy`}
              >
                <a className="underline text-blue-500">新歓一覧に戻る</a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

            {circle ? (
              <div>
                <EditCircleNewJoyForm
                  onSubmit={onSubmit}
                  circle={circle}
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

                <div className="text-center pt-16 pb-8">
                  <a
                    onClick={onDelete}
                    className="text-red-600 hover:underline"
                  >
                    この新歓イベントを削除
                  </a>
                </div>
              </div>
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
