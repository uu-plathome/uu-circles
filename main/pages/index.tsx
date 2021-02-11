import { GetServerSideProps, NextPage } from "next";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { MainPageCircleList } from "@/components/organisms/List/MainPageCircleList";
import { getMain } from "@/infra/api/main";
import { Circle } from "@/lib/types/model/Circle";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";

type Props = {
    circles: Circle[]
}
const Index: NextPage<Props> = ({ circles }) => {

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <MainPageCircleList circles={circles} />
            </BaseContainer>

            <BaseFooter />
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