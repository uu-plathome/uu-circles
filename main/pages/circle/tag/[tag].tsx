import { GetServerSideProps, NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { BaseCircleList } from "@/components/organisms/List/BaseCircleList";
import { getCircleByTag } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { TwoColumnContainer } from "@/components/molecules/Container/TwoColumnContainer";
import { CircleSidebar } from "@/components/organisms/Circles/CircleSidebar";
import { useRouter } from "next/dist/client/router";
import { __ } from "@/lang/ja";
import { BaseHead } from "@/components/layouts/BaseHead";
import { CarouselCircleList } from "@/components/organisms/List/CarouselCircleList";

type Props = {
    errorCode?: number
    circles?: Circle[]
    recommendCircles?: Circle[]
}
const Page: NextPage<Props> = ({
    circles,
    recommendCircles
}) => {
    const router = useRouter()
    const { tag } = router.query

    return (
        <div>
            <BaseHead
                title={ `${__(String(tag).toUpperCase())}タグ検索` }
            />

            <BaseLayout>
                <div className="bg-gray-100 px-2">
                    <TwoColumnContainer sidebar={<CircleSidebar />}>
                        <div className="px-4">
                            <h1 className="text-2xl py-8">{ __(String(tag).toUpperCase()) }</h1>

                            {__(String(tag).toUpperCase(), "CircleTagTitle") ? (
                                <p className="text-base pb-4">{ __(String(tag).toUpperCase(), "CircleTagTitle") }</p>
                            ) : ''}
                            {__(String(tag).toUpperCase(), "CircleTagText") ? (
                                <p className="text-sm pb-8">{ __(String(tag).toUpperCase(), "CircleTagText") }</p>
                            ) : ''}

                            {/*  サークル一覧 */}
                            <BaseCircleList circles={circles} />

                            <div className="pb-8">
                                <h2 className="text-lg py-8">他のサークルも見る</h2>

                                <CarouselCircleList circles={recommendCircles} />
                            </div>
                        </div>
                    </TwoColumnContainer>
                </div>

                {/*  フッター */}
                <BaseFooter />
            </BaseLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
    if (!params.tag || Array.isArray(params.tag)) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } }
    }

    const {
        circles,
        recommendCircles
    } = await getCircleByTag(params.tag)

    return {
        props: {
            circles,
            recommendCircles
        }
    }
}

export default Page
