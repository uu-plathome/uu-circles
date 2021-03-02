import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useNumberInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { createRelationBetweenUserAndCircle } from '@/infra/api/circle_user'
import { BaseSelect, SelectItem } from '@/components/atoms/form/BaseSelect'
import { Circle } from '@/lib/types/model/Circle'
import { getCircleList, getCircleListByUserId } from '@/infra/api/circle'
import { User } from '@/lib/types/model/User'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const [relationedCircles, setRelationedCircles] = useState<Circle[]>([])
    const [selectItems, setSelectItems] = useState<SelectItem[]>([])
    const [allCirlces, setAllCircles] = useState<Circle[]>([])
    const [user, setUser] = useState<User | null>(null)
    const { userId } = router.query
    const [error, setError] = useState<string>('')
    const circleId = useNumberInput(0)
    const { isMd } = useMediaQuery()

    useEffect(() => {
        const f = async () => {
            const relationedCircles = await getCircleListByUserId(
                Number(userId)
            )
            const allCircles = await getCircleList()

            setUser(relationedCircles.user)
            setRelationedCircles(relationedCircles.circles)
            setAllCircles(allCircles)
            const relationedCirclesIds = relationedCircles.circles.map(
                (circle: Circle) => circle.id
            )
            const newSelectItems = [
                { value: 0, label: '選択してください' },
                ...allCircles
                    .filter(
                        (circle: Circle) =>
                            !relationedCirclesIds.includes(circle.id)
                    )
                    .map(
                        (circle: Circle) =>
                            ({
                                value: circle.id,
                                label: circle.name,
                            } as SelectItem)
                    ),
            ]
            setSelectItems(newSelectItems)
        }

        f()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (circleId.toNumber === 0) {
            setError('サークルを選択してください')
            return
        }

        const data = await createRelationBetweenUserAndCircle(
            Number(userId),
            circleId.toNumber
        )

        if (data && data.type === 'ValidationError') {
            setError(data.errors.data)
            return
        }

        await router.push(`/user/circle/${userId}`)
    }

    return (
        <div>
            <Head>
                <title>サークルと連携する</title>
            </Head>

            {isMd ? <BaseHeader /> : ''}

            <BaseContainer>
                <BaseWrapper title="サークルと連携する">
                    <div className="border-2 border-gray-800 px-2 py-4">
                        {error ? <DangerBunner text={error} /> : ''}

                        {selectItems.length > 0 ? (
                            <form onSubmit={onSubmit}>
                                <BaseSelect
                                    id="circleId"
                                    name="circleId"
                                    label="サークルと連携する"
                                    required
                                    items={selectItems}
                                    {...circleId}
                                />

                                <div className="flex justify-center mt-8">
                                    <GreenButton type="submit">
                                        追加
                                    </GreenButton>
                                </div>
                            </form>
                        ) : (
                            'loading...'
                        )}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage
