import { NextPage } from "next";
import { BaseHeader } from "@/components/layouts/BaseHeader";
import { BaseFooter } from "@/components/layouts/BaseFooter";

const Index: NextPage = () => {
    return (
        <div>
            <BaseHeader />

            Hello

            <BaseFooter />
        </div>
    )
}

export default Index