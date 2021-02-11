import { GetServerSideProps, NextPage } from "next";
import { Circle } from "@/lib/types/model/Circle";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { getCircleNewJoyBySlug } from "@/infra/api/circleNewJoy";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";

type Props = {
    circle?: Circle
    errorCode?: number
    pastCircleNewJoys?: CircleNewJoy[]
    futureCircleNewJoys?: CircleNewJoy[]
    nowCircleNewJoys?: CircleNewJoy[]
    todayCircleNewJoys?: CircleNewJoy[]
}
const Page: NextPage<Props> = ({ 
    circle, 
    pastCircleNewJoys,
    futureCircleNewJoys,
    nowCircleNewJoys,
    todayCircleNewJoys
}) => {
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

    const { 
        circle, 
        pastCircleNewJoys,
        futureCircleNewJoys,
        nowCircleNewJoys,
        todayCircleNewJoys 
    } = await getCircleNewJoyBySlug(params.slug)

    return {
        props: {
            circle,
            pastCircleNewJoys,
            futureCircleNewJoys,
            nowCircleNewJoys,
            todayCircleNewJoys,
        }
    }
}

export default Page
