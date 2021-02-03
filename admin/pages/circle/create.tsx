
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { createCircle } from '@/infra/api/circle'
import { CreateCircleFormRequest, isCreateCircleFormRequestValidationError } from '@/lib/types/api/CreateCircleFormRequest'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()

    const name = useStringInput('')
    const slug = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircle({
            type: 'CreateCircleFormRequest',
            name: name.value,
            slug: slug.value,
            release: false,
        } as CreateCircleFormRequest, authContext.accessToken)

        if (isCreateCircleFormRequestValidationError(data)) {
            name.setErrors(data.errors.name)
            slug.setErrors(data.errors.slug)

            return
        }

        await router.push('/circle')
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークル新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="サークル名"
                                name="name"
                                id="name"
                                required
                                { ...name }
                            />

                            <BaseTextField
                                label="URLのパス"
                                name="slug"
                                id="slug"
                                placeholder="u-lab"
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                { ...slug }
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