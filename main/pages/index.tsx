import { GetServerSideProps, NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { MainPageCircleList } from "@/components/organisms/List/MainPageCircleList";
import { getMain } from "@/infra/api/main";
import { Circle } from "@/lib/types/model/Circle";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import { MainSponsorshipFooter } from "@/components/organisms/Main/MainSponsorshipFooter";
import { MainUucircleAd } from "@/components/organisms/Main/MainUucircleAd";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { MainCategoryList } from "@/components/organisms/List/MainCategoryList";
import { GreenButton } from "@/components/atoms/button/GreenButton";

type Props = {
    circles: Circle[]
}
const Index: NextPage<Props> = ({ circles }) => {
    return (
        <div>
            <BaseLayout>
                <div className="w-full bg-gray-600 h-80">

                </div>
                <div>
                    <p className="text-center py-8">
                        新歓をハックする！
                    </p>
                </div>

                <BaseContainer>
                    <div className="px-6">

                        <MainCategoryList />

                        {/*  サークル一覧 */}
                        <MainPageCircleList circles={circles} />

                        <div className="pt-4 pb-10 bg-gray-100 flex justify-center">
                            <GreenButton href="/circle">
                                もっと見る
                            </GreenButton>
                        </div>
                    </div>
                </BaseContainer>

                <div>
                    {/*  フッター */}

                    <MainUucircleAd />

                    <MainSponsorshipFooter />

                    <BaseFooter />
                </div>
            </BaseLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { circles, advertises } = await getMain()

    return {
        props: {
            advertises,
            circles,
        }
    }
}

export default Index