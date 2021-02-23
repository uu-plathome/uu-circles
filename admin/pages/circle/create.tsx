import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleForm } from '@/components/organisms/form/Circle/CreateCircleForm'
import { useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createCircle } from '@/infra/api/circle'
import { CreateCircleFormRequest, isCreateCircleFormRequestValidationError } from '@/lib/types/api/CreateCircleFormRequest'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { isMd } = useMediaQuery()
    const [isOpen, setIsOpen] = useState(false)

    const name = useStringInput('')
    const slug = useStringInput('')

    useEffect(() => {
        slug.set(slug.value.toLowerCase())
    })

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsOpen(true)

        const data = await createCircle({
            type: 'CreateCircleFormRequest',
            name: name.value,
            slug: slug.value,
            release: false,
        } as CreateCircleFormRequest)

        if (isCreateCircleFormRequestValidationError(data)) {
            name.setErrors(data.errors.name)
            slug.setErrors(data.errors.slug)
            setIsOpen(false)

            return
        }

        setIsOpen(false)
        await router.push('/circle')
    }

    return (
        <div>
            <Head>
                <title>サークル新規作成</title>
            </Head>

            {isMd ? (
                <BaseHeader />
            ) : ''}

            <SubmitLoading isOpen={isOpen} />

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
