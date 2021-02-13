import { NextPage } from 'next'
import useSWR from 'swr';
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { BaseHeader } from '../../components/layouts/BaseHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery';

const IndexPage: NextPage = () => {
    const { data: circles } = useSWR('/admin/api/circle', getCircleList, { revalidateOnReconnect: true })
    const { isMd } = useMediaQuery()

    return (
        <div>
            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="サークル一覧へようこそ"
                    actionText="サークル新規作成"
                    actionHref="/circle/create"
                >
                    <div className="border-2 border-gray-800 p-2">
                        {circles && circles.length > 0 ? (
                            circles.map((circle: Circle) => {
                                return <CircleListItem
                                    key={`circle-${circle.id}`}
                                    circle={circle}
                                />
                            })
                        ) : ''}

                        {circles && circles.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだサークルが登録されていません</p>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage