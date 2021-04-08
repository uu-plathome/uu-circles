import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditCircleNewJoyForm } from '@/components/organisms/form/CircleNewJoy/EditCircleNewJoyForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  getCircleNewJoy,
  updateCircleNewJoy,
} from '@/infra/api/cirecle_new_joy'
import {
  isUpdateCircleNewJoyRequestValidationError,
  UpdateCircleNewJoyRequest,
} from '@/lib/types/api/UpdateCircleNewJoyRequest'
import { Circle } from '@/lib/types/model/Circle'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id, circleNewJoyId } = router.query
  const [circle, setCircle] = useState<Circle | null>(null)
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(true)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const privateNewjoyLink = useStringInput('')
  const placeOfActivity = useStringInput('')
  const placeOfActivityDetail = useStringInput('')
  const publishFrom = useDateInput(null, 'YYYY/MM/DD')
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm')
  const release = useBooleanInput(true)

  useEffect(() => {
    const f = async () => {
      const { circle: newCircle, circleNewJoy } = await getCircleNewJoy(
        Number(id),
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
      setIsOpen(false)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateCircleNewJoy(Number(id), Number(circleNewJoyId), {
      type: 'UpdateCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      privateNewjoyLink: privateNewjoyLink.value,
      placeOfActivity:
        placeOfActivity.value !== 'null' ? placeOfActivity.value : null,
      placeOfActivityDetail: placeOfActivityDetail.value,
      publishFrom: publishFrom.value,
      startDate: startDate.value,
      endDate: endDate.value,
      release: release.value === 'true',
    } as UpdateCircleNewJoyRequest)

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

    setIsOpen(false)
    await router.push(`/circle/${id}/newjoy`)
  }

  return (
    <div>
      <Head>
        <title>新歓編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="新歓編集">
          <div className="border-2 border-gray-800 px-2 py-4">
            {circle ? (
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
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
