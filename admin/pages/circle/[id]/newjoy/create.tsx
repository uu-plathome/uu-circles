import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { createCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { isRegisterCircleNewJoyRequestValidationError, RegisterCircleNewJoyRequest } from '@/lib/types/api/RegisterCircleNewJoyRequest'
import { __ } from '@/lang/ja'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleNewJoyForm } from '@/components/organisms/form/CircleNewJoy/CreateCircleNewJoyForm'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id } = router.query

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

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircleNewJoy(
            Number(id),
            {
                type: 'RegisterCircleNewJoyRequest',
                title: title.value,
                description: description.value,
                url: url.value,
                placeOfActivity: placeOfActivity.value,
                placeOfActivityDetail: placeOfActivityDetail.value,
                publishFrom: publishFrom.value,
                publishTo: publishTo.value,
                startDate: startDate.value,
                endDate: endDate.value,
                release: release.toBoolean,
            } as RegisterCircleNewJoyRequest, authContext.accessToken)

        if (data && isRegisterCircleNewJoyRequestValidationError(data)) {
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
                    title="新歓作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <CreateCircleNewJoyForm
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