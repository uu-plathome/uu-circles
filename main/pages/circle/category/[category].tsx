import { GetServerSideProps, NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { BaseCircleList } from "@/components/organisms/List/BaseCircleList";
import { getCircleByCategory } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { TwoColumnContainer } from "@/components/molecules/Container/TwoColumnContainer";
import { CircleSidebar } from "@/components/organisms/Circles/CircleSidebar";
import { useRouter } from "next/dist/client/router";
import { __ } from "@/lang/ja";
import { categoryToCircleType } from "@/lib/utils/category/Category";
import { Category } from "@/lib/enum/app/Category";
import Head from "next/head";

type Props = {
    errorCode?: number
    circles?: Circle[]
}
const Page: NextPage<Props> = ({
    circles
}) => {
    const router = useRouter()
    const { category } = router.query

    return (
        <div>
            <Head>
                <title>{ __(String(categoryToCircleType(category as Category))) } カテゴリー検索 | UU-circles</title>
            </Head>

            <BaseLayout>
                <div className="bg-gray-100 px-2">
                    <TwoColumnContainer sidebar={<CircleSidebar />}>
                        <h1 className="text-2xl py-8">{ __(String(categoryToCircleType(category as Category))) }</h1>
                        
                        <p className="text-base pb-4">{ __(String(categoryToCircleType(category as Category)), "CircleTypeTitle") }</p>
                        <p className="text-sm pb-8">{ __(String(categoryToCircleType(category as Category)), "CircleTypeText") }</p>

                        {/*  サークル一覧 */}
                        <BaseCircleList circles={circles} />
                    </TwoColumnContainer>
                </div>

                {/*  フッター */}
                <BaseFooter />
            </BaseLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
    if (!params.category || Array.isArray(params.category)) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } }
    }

    const {
        circles 
    } = await getCircleByCategory(params.category)

    return {
        props: {
            circles
        }
    }
}

export default Page
