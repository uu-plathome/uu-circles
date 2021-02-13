import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { CircleNewJoyListItem } from '@/components/molecules/list_items/CircleNewJoyListItem'
import { getCircleNewJoyList, deleteCircleNewJoy, copyCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useSuccess } from '@/hooks/useSuccess'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import useSWR from 'swr'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Head } from '@/components/layouts/Head'


const IndexPage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [circle, setCircle] = useState<Circle|null>(null)
    const [circleNewJoys, setCircleNewJoys] = useState<CircleNewJoy[]>([])
    const { success, setSuccess } = useSuccess('')
    const [error, setError] = useState<string>('')
    const { isMd } = useMediaQuery()

    // 新歓一覧の取得
    const fetchCircle = async () => {
        const {
            circle,
            circleNewJoys
        } = await getCircleNewJoyList(Number(id))
        setCircle(circle)
        setCircleNewJoys(circleNewJoys)
    }

    useSWR([`/admin/api/circle/${id}/newjoy`, Number(id)], fetchCircle)

    // 新歓のコピー
    const onCopy = async (circleNewJoyId: number) => {
        setSuccess('')
        setError('')
        const data = await copyCircleNewJoy(Number(id), circleNewJoyId)

        if (data && data.type === 'Success') {
            setSuccess('新歓のコピーに成功しました', 3000)
            await fetchCircle()
            return
        }

        setError('エラーが発生しました')
    }

    // 新歓の削除
    const onDelete = async (circleNewJoyId: number) => {
        setSuccess('')
        setError('')
        const data = await deleteCircleNewJoy(Number(id), circleNewJoyId)

        if (data && data.type === 'Success') {
            setSuccess('新歓の削除に成功しました', 3000)
            await fetchCircle()
            return
        }

        setError('エラーが発生しました')
    }


    return (
        <div>
            <Head
                title="新歓一覧"
            />

            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title={(circle && circle.name) ? `${circle.name}の新歓` : 'loading...'}
                    actionText="新歓一覧"
                    actionHref="/circle/[id]/newjoy/create"
                    actionAs={`/circle/${id}/newjoy/create`}
                >
                    <div className="border-2 border-gray-800 p-2">
                        {success ? (
                            <SuccessBunner text={success} />
                        ) : ''}

                        {error ? (
                            <DangerBunner text={error} />
                        ) : ''}

                        {circle && circleNewJoys.length > 0 ? (
                            circleNewJoys.map((circleNewJoy: CircleNewJoy) => {
                                return <CircleNewJoyListItem
                                    key={`circle-${circleNewJoy.id}`}
                                    circle={circle}
                                    circleNewJoy={circleNewJoy}
                                    onCopy={onCopy}
                                    onDelete={onDelete}
                                />
                            })
                        ) : ''}
                        {circleNewJoys.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだ新歓が登録されていません</p>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage