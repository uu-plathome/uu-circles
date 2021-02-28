import { GetServerSideProps, NextPage } from "next";
import { getCircleBySlug } from "@/infra/api/circle";
import { Circle } from "@/lib/types/model/Circle";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { NewJoyList } from "@/components/organisms/ShowCircle/NewJoyList";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";
import { GreenButton } from "@/components/atoms/button/GreenButton";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import { AppealingPoint } from "@/components/organisms/ShowCircle/AppealingPoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faWallet, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import Color from 'colors'
import { CircleTypeBadge } from "@/components/molecules/Badge/CircleTypeBadge";
import { CircleType } from "@/lib/enum/api/CircleType";
import { TopImage } from "@/components/organisms/ShowCircle/TopImage";
import { InformationField } from "@/components/organisms/ShowCircle/InformationField";
import Image from "next/image";
import { BaseHead } from "@/components/layouts/BaseHead";
import { PageNotFoundError } from "@/infra/api/error";
import Error from 'next/error'

type Props = {
    circle?: Circle
    circleNewJoys?: CircleNewJoy[]
    errorCode?: number
}
const Page: NextPage<Props> = ({ circle, circleNewJoys, errorCode }) => {
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    // w : h = 210 : 297
    const width = 150
    const height = 150 * 297 / 210
    return (
        <div>
            <BaseHead
                title={`${circle.name} サークル詳細`}
            />

            <BaseLayout>
                <div>
                    <BaseContainer>

                        <div>
                            <div className="bg-white">
                                <TopImage
                                    circle={circle}
                                />
                            </div>

                            <div className="flex justify-between bg-white px-4 md:px-10 py-6 border-b border-gray-50">
                                <div>
                                    <p className="text-sm">{ circle.prefixName }</p>
                                    <h1 className="text-lg md:text-2xl font-bold">{ circle.name }</h1>
                                </div>

                                <div>
                                    <CircleTypeBadge circleType={circle.circleType as CircleType} />
                                </div>
                            </div>

                            <div className="flex justify-between md:justify-start bg-white px-4 md:px-10 py-2">
                                <div className="md:mr-4">
                                    <p>
                                        <FontAwesomeIcon color={Color.gray[600]} icon={ faUserFriends } />
                                        <span className="pl-2">{ circle.numberOfMembers }人</span>
                                    </p>
                                </div>
                                <div className="md:mr-4">
                                    <p>
                                        <FontAwesomeIcon color={Color.red[500]} icon={ faWaveSquare } />
                                        <span className="pl-2">週{ circle.weeklyActivityDays }</span>
                                    </p>
                                </div>
                                <div className="md:mr-4">
                                    <p>
                                        <FontAwesomeIcon color={Color.gray[600]} icon={ faWallet } />
                                        <span className="pl-2">{ circle.admissionFeePerYear ? Number(circle.admissionFeePerYear).toLocaleString() : 0 }円/年</span>
                                    </p>
                                </div>
                            </div>
                            
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-20">
                            <div className="order-1">
                                <AppealingPoint circle={circle} />
                            </div>

                            {circle.handbillImageUrl ? (
                                <div className="order-2 pt-10">
                                    <h2 className="text-lg text-center mb-6 md:text-left">新歓ビラ</h2>
                            
                                    <div className="flex justify-center">
                                        <a href={circle.handbillImageUrl} target="_blank">
                                            <Image
                                                src={circle.handbillImageUrl}
                                                alt={`${circle.name}新歓ビラ`}
                                                width={width}
                                                height={height}
                                            />
                                        </a>
                                    </div>
                                </div>
                            ) : ''}

                            <div className="order-3 md:order-4 pt-10">
                                <div>
                                    <NewJoyList slug={circle.slug} circleNewJoys={circleNewJoys} />
                                </div>

                                <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                                    <GreenButton href="/circle/[slug]/newjoy" as={`/circle/${circle.slug}/newjoy`}>
                                        もっと詳しく
                                    </GreenButton>
                                </div>
                            </div>

                            <div className="order-4 md:order-3 pt-10">
                                <InformationField circle={circle} />
                            </div>
                        </div>
                    </BaseContainer>
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

    try {
        const { circle, circleNewJoys } = await getCircleBySlug(params.slug)
    
        return {
            props: {
                circle,
                circleNewJoys,
            }
        }
    } catch (e) {
        if (e instanceof PageNotFoundError) {
            res.statusCode = 404;
            return { props: { errorCode: 404 } }
        }

        res.statusCode = 500;
        return { props: { errorCode: 500 } }
    }
}

export default Page
