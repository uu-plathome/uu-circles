import { NextPage } from "next";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { MainPageCircleList } from "@/components/organisms/List/MainPageCircleList";

const Index: NextPage = () => {
    return (
        <div>
            <BaseHeader />

            Hello
            <div>
                <MainPageCircleList />
            </div>

            <BaseFooter />
        </div>
    )
}

export default Index