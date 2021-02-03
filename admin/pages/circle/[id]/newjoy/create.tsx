import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { createCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { isRegisterCircleNewJoyRequestValidationError, RegisterCircleNewJoyRequest } from '@/lib/types/api/RegisterCircleNewJoyRequest'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { __ } from '@/lang/ja'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'

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
                        <form onSubmit={onSubmit}>
                            <BaseSelect
                                label="公開設定"
                                id="release"
                                name="release"
                                items={[
                                    { value: 'true', label: '公開' },
                                    { value: 'false', label: '非公開' },
                                ]}
                                { ...release }
                            />

                            <BaseTextField
                                label="サークル新歓"
                                name="title"
                                id="title"
                                required
                                { ...title }
                            />

                            <BaseTextField
                                label="新歓URLのパス"
                                name="url"
                                id="url"
                                placeholder="u-lab"
                                note="新歓の告知で使うURLをはってください。(Twitterなど)。zoomは安全上、控えてください"
                                { ...url }
                            />

                            <BaseTextField
                                label="サークル新歓説明"
                                name="description"
                                id="description"
                                required
                                { ...description }
                            />

                            <BaseSelect
                                label="活動場所"
                                id="placeOfActivity"
                                name="placeOfActivity"
                                items={[
                                    ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
                                        value: _placeOfActivity,
                                        label: __(_placeOfActivity)
                                    }))
                                ]}
                                { ...placeOfActivity }
                            />

                            <BaseTextField
                                label="サークル新歓活動場所"
                                name="placeOfActivityDetail"
                                id="placeOfActivityDetail"
                                required
                                { ...placeOfActivityDetail }
                            />

                            <BaseTextField
                                label="公開開始日時"
                                name="publishFrom"
                                id="publishFrom"
                                type="date"
                                { ...publishFrom }
                            />

                            <BaseTextField
                                label="公開終了日時"
                                name="publishTo"
                                id="publishTo"
                                type="date"
                                { ...publishTo }
                            />

                            <BaseTextField
                                label="新歓開始日時"
                                name="startDate"
                                id="startDate"
                                type="datetime-local"
                                { ...startDate }
                            />

                            <BaseTextField
                                label="新歓終了日時"
                                name="endDate"
                                id="endDate"
                                type="datetime-local"
                                { ...endDate }
                            />

                            <div className="flex justify-center mt-8">
                                <GreenButton type="submit">
                                    進む
                                </GreenButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage