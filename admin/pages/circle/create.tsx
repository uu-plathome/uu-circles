import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleForm } from '@/components/organisms/form/Circle/CreateCircleForm'
import { useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createCircle } from '@/infra/api/circle'
import { CreateCircleFormRequest, isCreateCircleFormRequestValidationError } from '@/lib/types/api/CreateCircleFormRequest'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { isMd } = useMediaQuery()

    const name = useStringInput('')
    const slug = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircle({
            type: 'CreateCircleFormRequest',
            name: name.value,
            slug: slug.value,
            release: false,
        } as CreateCircleFormRequest)

        if (isCreateCircleFormRequestValidationError(data)) {
            name.setErrors(data.errors.name)
            slug.setErrors(data.errors.slug)

            return
        }

        await router.push('/circle')
    }

    return (
        <div>
            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="サークル新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <CreateCircleForm
                            onSubmit={onSubmit}
                            form={{
                                name,
                                slug
                            }}
                        />
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage