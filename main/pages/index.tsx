import { GetServerSideProps, NextPage } from "next";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { MainPageCircleList } from "@/components/organisms/List/MainPageCircleList";
import { getMain } from "@/infra/api/main";
import { Circle } from "@/lib/types/model/Circle";

type Props = {
    circles: Circle[]
}
const Index: NextPage<Props> = ({ circles }) => {
    return (
        <div>
            <BaseHeader />

            Hello
            <div>
                <MainPageCircleList circles={circles} />
            </div>

            <BaseFooter />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { circles } = await getMain()

    return {
        props: {
            circles
        }
    }
}

export default Index