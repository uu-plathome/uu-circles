import { GetServerSideProps, NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { getTodayCircleNewJoy } from "@/infra/api/circleNewJoy";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";

type Props = {
    errorCode?: number
    futureCircleNewJoys?: {
        slug: string
        circleNewJoy: CircleNewJoy
    }[]
    todayCircleNewJoys?: {
        slug: string
        circleNewJoy: CircleNewJoy
    }[]
}
const Page: NextPage<Props> = ({
    futureCircleNewJoys,
    todayCircleNewJoys
}) => {
    return (
        <div>
            {/*  ヘッダー */}
            <BaseHeader />
        
            <div className="bg-gray-100 px-2">
                <BaseContainer>
                    <h1 className="text-2xl py-8">新歓イベント日程詳細</h1>

                    <div className="pb-16">
                        <h2 className="font-bold text-lg md:text-center pl-1 mb-3">今日の新歓</h2>
                    </div>

                    <div className="pb-16">
                        <h2 className="font-bold text-lg md:text-center pl-1 mb-3">開催済みの新歓一覧</h2>
                    </div>
                </BaseContainer>
            </div>

            {/*  フッター */}
            <BaseFooter />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { 
        futureCircleNewJoys,
        todayCircleNewJoys 
    } = await getTodayCircleNewJoy()

    return {
        props: {
            futureCircleNewJoys,
            todayCircleNewJoys,
        }
    }
}

export default Page
