import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { EditDemoCircleNewJoyForm } from '@/src/components/organisms/form/DemoCircleNewJoy/EditDemoCircleNewJoyForm'
import {
  useBooleanInput,
  useDateInput,
  useStringInput,
} from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { DemoCircleNewjoyType } from '@/src/lib/enum/api/DemoCircleNewjoyType'
import {
  getDemoCircleNewJoy,
  updateDemoCircleNewJoy,
} from '@/src/lib/infra/api/demo_cirecle_new_joy'
import { isUpdateDemoCircleNewJoyRequestValidationError } from '@/src/lib/types/api/UpdateDemoCircleNewJoyRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { demoCircleNewJoyId } = router.query
  const [circle, setCircle] = useState<{
    circleId: number
    name: string
  } | null>(null)
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(true)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const placeOfActivity = useStringInput('')
  const placeOfActivityDetail = useStringInput('')
  const demoCircleNewjoyType = useStringInput(DemoCircleNewjoyType.FUTURE)
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const published = useBooleanInput(true)

  useEffect(() => {
    const f = async () => {
      const { demoCircleNewJoy } = await getDemoCircleNewJoy(
        Number(demoCircleNewJoyId)
      )
      setCircle({
        circleId: demoCircleNewJoy.circleId,
        name: demoCircleNewJoy.name,
      })

      title.set(demoCircleNewJoy.demoCircleNewJoy.title)
      description.set(demoCircleNewJoy.demoCircleNewJoy.description)
      url.set(demoCircleNewJoy.demoCircleNewJoy.url)
      placeOfActivity.set(demoCircleNewJoy.demoCircleNewJoy.placeOfActivity)
      placeOfActivityDetail.set(
        demoCircleNewJoy.demoCircleNewJoy.placeOfActivityDetail
      )
      demoCircleNewjoyType.set(
        demoCircleNewJoy.demoCircleNewJoy.demoCircleNewjoyType
      )
      startDate.set(demoCircleNewJoy.demoCircleNewJoy.startDate)
      endDate.set(demoCircleNewJoy.demoCircleNewJoy.endDate)
      published.set(demoCircleNewJoy.demoCircleNewJoy.published)
      setIsOpen(false)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateDemoCircleNewJoy(Number(demoCircleNewJoyId), {
      type: 'UpdateDemoCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      placeOfActivity:
        placeOfActivity.value !== 'null' ? placeOfActivity.value : null,
      placeOfActivityDetail: placeOfActivityDetail.value,
      demoCircleNewjoyType: demoCircleNewjoyType.value,
      startDate: startDate.toFormatApi,
      endDate: endDate.toFormatApi,
      published: published.toBoolean,
    })

    if (data && isUpdateDemoCircleNewJoyRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      description.setErrors(data.errors.description)
      url.setErrors(data.errors.url)
      placeOfActivity.setErrors(data.errors.placeOfActivity)
      placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
      demoCircleNewjoyType.setErrors(data.errors.demoCircleNewjoyType)
      startDate.setErrors(data.errors.startDate)
      endDate.setErrors(data.errors.endDate)
      published.setErrors(data.errors.published)
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push(`/demo/newjoy`)
  }

  return (
    <div>
      <Head>
        <title>デモ新歓編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="新歓編集">
          <div className="py-4 px-2 border-2 border-gray-800">
            {circle ? (
              <EditDemoCircleNewJoyForm
                onSubmit={onSubmit}
                circle={{
                  name: circle.name,
                  shortName: circle.name,
                }}
                form={{
                  title,
                  description,
                  url,
                  placeOfActivity,
                  placeOfActivityDetail,
                  demoCircleNewjoyType,
                  startDate,
                  endDate,
                  published,
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
