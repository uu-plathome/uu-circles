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

type Props = {
    circles: Circle[]
}
const Index: NextPage<Props> = ({ circles }) => {
    return (
        <div>
            <BaseLayout>
                <BaseContainer>
                    <div className="px-6">
                        <MainCategoryList />

                        {/*  サークル一覧 */}
                        <MainPageCircleList circles={circles} />
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
    const { circles } = await getMain()

    return {
        props: {
            circles
        }
    }
}

export default Index