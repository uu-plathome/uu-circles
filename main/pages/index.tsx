import { GetServerSideProps, NextPage } from "next";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { MainPageCircleList } from "@/components/organisms/List/MainPageCircleList";
import { getMain } from "@/infra/api/main";
import { Circle } from "@/lib/types/model/Circle";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import { MainSponsorshipFooter } from "@/components/organisms/Main/MainSponsorshipFooter";
import { MainUucircleAd } from "@/components/organisms/Main/MainUucircleAd";
import { BaseLayout } from "@/components/layouts/BaseLayout";

type Props = {
    circles: Circle[]
}
const Index: NextPage<Props> = ({ circles }) => {
    return (
        <div>
            <BaseLayout>
                <BaseContainer>
                    {/*  サークル一覧 */}
                    <MainPageCircleList circles={circles} />
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