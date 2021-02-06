import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { getCircleNewJoy, updateCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { __ } from '@/lang/ja'
import { isUpdateCircleNewJoyRequestValidationError, UpdateCircleNewJoyRequest } from '@/lib/types/api/UpdateCircleNewJoyRequest'
import { Circle } from '@/lib/types/model/Circle'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditCircleNewJoyForm } from '@/components/organisms/form/CircleNewJoy/EditCircleNewJoyForm'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { id, circleNewJoyId } = router.query
    const [circle, setCircle] = useState<Circle|null>(null)

    const title = useStringInput('')
    const description = useStringInput('')
    const url = useStringInput('')
    const placeOfActivity = useStringInput('')
    const placeOfActivityDetail = useStringInput('')
    const publishFrom = useStringInput('')
    const publishTo = useStringInput('')
    const startDate = useStringInput('')
    const endDate = useStringInput('')
    const release = useBooleanInput(true)

    useEffect(() => {
        const f = async () => {
            const {
                circle: newCircle,
                circleNewJoy
            } = await getCircleNewJoy(Number(id), Number(circleNewJoyId))
            setCircle(newCircle)

            title.set(circleNewJoy.title)
            description.set(circleNewJoy.description)
            url.set(circleNewJoy.url)
            placeOfActivity.set(circleNewJoy.placeOfActivity)
            placeOfActivityDetail.set(circleNewJoy.placeOfActivityDetail)
            publishFrom.set(circleNewJoy.publishFrom)
            publishTo.set(circleNewJoy.publishTo)
            startDate.set(circleNewJoy.startDate)
            endDate.set(circleNewJoy.endDate)
            release.set(circleNewJoy.release)
        }

        f()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await updateCircleNewJoy(
            Number(id),
            Number(circleNewJoyId),
            {
                type: 'UpdateCircleNewJoyRequest',
                title: title.value,
                description: description.value,
                url: url.value,
                placeOfActivity: placeOfActivity.value !== 'null' ? placeOfActivity.value : null,
                placeOfActivityDetail: placeOfActivityDetail.value,
                publishFrom: publishFrom.value,
                publishTo: publishTo.value,
                startDate: startDate.value,
                endDate: endDate.value,
                release: release.value === 'true',
            } as UpdateCircleNewJoyRequest)

        if (data && isUpdateCircleNewJoyRequestValidationError(data)) {
            title.setErrors(data.errors.title)
            description.setErrors(data.errors.description)
            url.setErrors(data.errors.url)
            placeOfActivity.setErrors(data.errors.placeOfActivity)
            placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
            publishFrom.setErrors(data.errors.publishFrom)
            publishTo.setErrors(data.errors.publishTo)
            startDate.setErrors(data.errors.startDate)
            endDate.setErrors(data.errors.endDate)
            release.setErrors(data.errors.release)

            return
        }

        await router.push(`/circle/${id}/newjoy`)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークル新歓編集"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <EditCircleNewJoyForm 
                            onSubmit={onSubmit}
                            form={{
                                title,
                                description,
                                url,
                                placeOfActivity,
                                placeOfActivityDetail,
                                publishFrom,
                                publishTo,
                                startDate,
                                endDate,
                                release,
                            }}
                        />
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage