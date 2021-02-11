import { GetServerSideProps, NextPage } from "next";
import { getCircleBySlug } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { NewJoyList } from "@/components/organisms/ShowCircle/NewJoyList";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";

type Props = {
    circle?: Circle
    circleNewJoys?: CircleNewJoy[]
    errorCode?: number
}
const Page: NextPage<Props> = ({ circle, circleNewJoys }) => {
    return (
        <div>
            {/*  ヘッダー */}
            <BaseHeader />
        
            <div>
                { circle.name }

                <NewJoyList slug={circle.slug} circleNewJoys={circleNewJoys} />
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

    const { circle, circleNewJoys } = await getCircleBySlug(params.slug)

    return {
        props: {
            circle,
            circleNewJoys,
        }
    }
}

export default Page
