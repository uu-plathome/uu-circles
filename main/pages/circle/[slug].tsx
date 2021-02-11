import { GetServerSideProps, NextPage } from "next";
import { getCircleBySlug } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseHeader } from "@/components/layouts/BaseHeader";

type Props = {
    circle?: Circle
    errorCode?: number
}
const Page: NextPage<Props> = ({ circle }) => {
    return (
        <div>
            {/*  ヘッダー */}
            <BaseHeader />
        
            <div>
                { circle.name }
            </div>

            {/*  フッター */}
            <BaseFooter />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
    if (!params.slug || Array.isArray(params.slug)) {
        res.statusCode = 404;
        return { props: { errorCode: 404 } }
    }

    const { circle } = await getCircleBySlug(params.slug)

    return {
        props: {
            circle
        }
    }
}

export default Page
