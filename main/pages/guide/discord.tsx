import { NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import Image from "next/image";

type Props = {}
const Page: NextPage<Props> = () => {
    return (
        <div>
            <BaseLayout>
                <div className="bg-gray-100 px-2">
                    <BaseContainer>
                        <h1 className="text-2xl py-8">Discordの使い方</h1>
                        <Image src="/images/discord.png" width="60" height="60" />

                        
                    </BaseContainer>
                </div>

                {/*  フッター */}
                <BaseFooter />
            </BaseLayout>
        </div>
    )
}

export default Page