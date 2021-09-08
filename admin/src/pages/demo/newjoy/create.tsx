import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { CreateDemoCircleNewJoyForm } from '@/src/components/organisms/form/DemoCircleNewJoy/CreateDemoCircleNewJoyForm'
import {
  useBooleanInput,
  useDateInput,
  useNumberInput,
  useStringInput,
} from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { DemoCircleNewjoyType } from '@/src/lib/enum/api/DemoCircleNewjoyType'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { createDemoCircleNewJoy } from '@/src/lib/infra/api/demo_cirecle_new_joy'
import { isRegisterDemoCircleNewJoyRequestValidationError } from '@/src/lib/types/api/RegisterDemoCircleNewJoyRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
  const placeOfActivityDetail = useStringInput('')
  const demoCircleNewjoyType = useStringInput(DemoCircleNewjoyType.FUTURE)
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const published = useBooleanInput(true)
  const circleId = useNumberInput(1)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createDemoCircleNewJoy(circleId.toNumber, {
      type: 'RegisterDemoCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      placeOfActivity: placeOfActivity.value,
      placeOfActivityDetail: placeOfActivityDetail.value,
      demoCircleNewjoyType: demoCircleNewjoyType.value,
      startDate: startDate.toFormatApi,
      endDate: endDate.toFormatApi,
      published: published.toBoolean,
    })

    if (data && isRegisterDemoCircleNewJoyRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      description.setErrors(data.errors.description)
      url.setErrors(data.errors.url)
      placeOfActivity.setErrors(data.errors.placeOfActivity)
      placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
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
        <title>デモ新歓作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="新歓作成">
          <div className="py-4 px-2 border-2 border-gray-800">
            <CreateDemoCircleNewJoyForm
              onSubmit={onSubmit}
              circle={{
                name: 'aaa',
                shortName: 'aaa',
              }}
              form={{
                circleId,
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
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
