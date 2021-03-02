import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { createCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import {
    isRegisterCircleNewJoyRequestValidationError,
    RegisterCircleNewJoyRequest,
} from '@/lib/types/api/RegisterCircleNewJoyRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleNewJoyForm } from '@/components/organisms/form/CircleNewJoy/CreateCircleNewJoyForm'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import useSWR from 'swr'
import { showCircle } from '@/infra/api/circle'
import Head from 'next/head'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { isMd } = useMediaQuery()

    const title = useStringInput('')
    const description = useStringInput('')
    const url = useStringInput('')
    const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
    const placeOfActivityDetail = useStringInput('')
    const publishFrom = useDateInput(null, 'YYYY-MM-DD')
    const startDate = useDateInput(null, 'YYYY-MM-DD HH:mm')
    const endDate = useDateInput(null, 'YYYY-MM-DD HH:mm')
    const release = useBooleanInput(true)

    const { data: circle } = useSWR(
        [`/admin/api/circle/${id}`, Number(id)],
        () => showCircle(Number(id))
    )

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircleNewJoy(Number(id), {
            type: 'RegisterCircleNewJoyRequest',
            title: title.value,
            description: description.value,
            url: url.value,
            placeOfActivity: placeOfActivity.value,
            placeOfActivityDetail: placeOfActivityDetail.value,
            publishFrom: publishFrom.value,
            startDate: startDate.value,
            endDate: endDate.value,
            release: release.toBoolean,
        } as RegisterCircleNewJoyRequest)

        if (data && isRegisterCircleNewJoyRequestValidationError(data)) {
            title.setErrors(data.errors.title)
            description.setErrors(data.errors.description)
            url.setErrors(data.errors.url)
            placeOfActivity.setErrors(data.errors.placeOfActivity)
            placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
            publishFrom.setErrors(data.errors.publishFrom)
            startDate.setErrors(data.errors.startDate)
            endDate.setErrors(data.errors.endDate)
            release.setErrors(data.errors.release)

            return
        }

        await router.push(`/circle/${id}/newjoy`)
    }

    return (
        <div>
            <Head>
                <title>新歓作成</title>
            </Head>

            {isMd ? <BaseHeader /> : ''}

            <BaseContainer>
                <BaseWrapper title="新歓作成">
                    <div className="border-2 border-gray-800 px-2 py-4">
                        {circle ? (
                            <CreateCircleNewJoyForm
                                onSubmit={onSubmit}
                                circle={circle}
                                form={{
                                    title,
                                    description,
                                    url,
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
