
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { showCircle, updateCircle } from '@/infra/api/circle'
import { Circle } from '@/infra/api/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '../../../components/layouts/BaseHeader'

const EditPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const [circle, setCircle] = useState<Circle|undefined>(undefined)
    const router = useRouter()
    const name = useInput('')
    const slug = useInput('')
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            if (!Array.isArray(id)) {
                const foundCircle = await showCircle(Number(id), authContext.accessToken)
                setCircle(foundCircle)
                if (foundCircle) {
                    name.set(foundCircle.name)
                    slug.set(foundCircle.slug)
                }
            }
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!Array.isArray(id)) {
            await updateCircle(
                Number(id),
                {
                    name: name.value,
                    slug: slug.value,
                    release: circle.release
                } as Circle,
                authContext.accessToken
            )
        }
        await router.push('/circle')
    }


    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/5">
                        <BaseSidebar />
                    </div>

                    <div className="w-full lg:w-4/5">
                        <div className="py-10">
                            <div className="flex justify-between mb-8">
                                <h1 className="text-2xl text-gray-100">
                                サークル編集
                                </h1>
                            </div>

                            <div className="border-2 border-gray-800 px-2 py-4">
                                { circle ? (
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
                                                更新
                                            </GreenButton>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="text-white">Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default EditPage