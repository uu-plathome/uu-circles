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
import { __ } from "@/lang/ja";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faWallet, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import Color from 'colors'
import { CircleTypeBadge } from "@/components/molecules/Badge/CircleTypeBadge";
import { CircleType } from "@/lib/enum/api/CircleType";
import { SnsList } from "@/components/organisms/ShowCircle/SnsList";

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
                    <BaseContainer>

                        <div>
                            <div className="flex justify-between bg-white px-4 md:px-10 py-6 border-b border-gray-50">
                                <div>
                                    <p>{ circle.prefixName }</p>
                                    <h1 className="text-2xl font-bold">{ circle.name }</h1>
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
                            <AppealingPoint circle={circle} />

                            <div className="pt-10">
                                <div>
                                    <NewJoyList slug={circle.slug} circleNewJoys={circleNewJoys} />
                                </div>

                                <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                                    <GreenButton href="/circle/[slug]/newjoy" as={`/circle/${circle.slug}/newjoy`}>
                                        もっと詳しく
                                    </GreenButton>
                                </div>
                            </div>

                            <div className="pt-10">
                                <div>
                                    <h2 className="text-lg text-center mb-6 md:text-left">サークル詳細</h2>

                                    <div className="flex justify-center md:justify-start px-6 md:px-0">
                                        <div className="bg-white rounded md:w-full px-6 py-8">
                                            <div className="border-b border-gray-400 pb-4">
                                                <p className="text-sm text-gray-400 mb-2">団体・サークル名</p>
                                                <p className="text-sm text-black">
                                                    <span className="mr-4">{ circle.prefixName }</span>{ circle.name }
                                                </p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">団体・サークル名（カナ）</p>
                                                <p className="text-sm text-black">
                                                    { circle.nameKana }
                                                </p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">サークル紹介文</p>
                                                <p className="text-sm text-black">{ circle.description }</p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">サークル種別</p>
                                                <p className="text-sm text-black">{ __(circle.circleType) }</p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">年間費用</p>
                                                <p className="text-sm text-black">{ circle.admissionFeePerYear ? Number(circle.admissionFeePerYear).toLocaleString() : 0 }円/年</p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">活動人数</p>
                                                <p className="text-sm text-black">{ circle.numberOfMembers }人</p>
                                            </div>

                                            {circle.publicEmail ? (
                                                <div className="border-b border-gray-400 py-4">
                                                    <p className="text-sm text-gray-400 mb-2">連絡用メールアドレス</p>
                                                    <p className="text-sm text-black">{ circle.publicEmail }</p>
                                                </div>
                                            ) : ''}

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">通常活動場所</p>
                                                <p className="text-sm text-black">{ __(circle.commonPlaceOfActivity) }</p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">通常活動場所詳細</p>
                                                <p className="text-sm text-black">{ circle.commonPlaceOfActivityDetail }</p>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">通常活動日</p>
                                                <div className="flex flex-wrap">
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityMonday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            月曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityTuesday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            火曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityWednesday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            水曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityThursday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            木曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityFriday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            金曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivitySaturday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            土曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivitySunday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            日曜日
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">オンライン活動</p>
                                                <p className="text-sm text-black">{ circle.isOnlineActivity ? '行う' : '行わない' }</p>
                                            </div>

                                            {circle.onlineDateOfActivityDetail ? (
                                                <div className="border-b border-gray-400 py-4">
                                                    <p className="text-sm text-gray-400 mb-2">オンライン活動場所</p>
                                                    <p className="text-sm text-black">{ circle.onlineDateOfActivityDetail }</p>
                                                </div>
                                            ) : ''}

                                            <div className="border-b border-gray-400 py-4">
                                                <p className="text-sm text-gray-400 mb-2">オンライン活動日</p>
                                                <div className="flex flex-wrap">
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityMonday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            月曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityTuesday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            火曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityWednesday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            水曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityThursday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            木曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityFriday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            金曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivitySaturday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            土曜日
                                                        </p>
                                                    </div>
                                                    <div className="w-1/2 mb-2">
                                                        <p className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivitySunday ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                                            日曜日
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-4">
                                                <p className="text-sm text-gray-400 mb-2">各種SNS</p>
                                                <div>
                                                    <SnsList circle={circle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

    const { circle, circleNewJoys } = await getCircleBySlug(params.slug)

    return {
        props: {
            circle,
            circleNewJoys,
        }
    }
}

export default Page
