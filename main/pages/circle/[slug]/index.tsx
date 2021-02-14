import { GetServerSideProps, NextPage } from "next";
import { getCircleBySlug } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { NewJoyList } from "@/components/organisms/ShowCircle/NewJoyList";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";
import { GreenButton } from "@/components/atoms/button/GreenButton";
import { BaseLayout } from "@/components/layouts/BaseLayout";

type Props = {
    circle?: Circle
    circleNewJoys?: CircleNewJoy[]
    errorCode?: number
}
const Page: NextPage<Props> = ({ circle, circleNewJoys }) => {
    return (
        <div>
            <BaseLayout>
                <div>
                    { circle.name }

                    <NewJoyList slug={circle.slug} circleNewJoys={circleNewJoys} />

                    <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                        <GreenButton href="/circle/[slug]/newjoy" as={`/circle/${circle.slug}/newjoy`}>
                            もっと詳しく
                        </GreenButton>
                    </div>
                </div>

                {/*  フッター */}
                <BaseFooter />
            </BaseLayout>
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
