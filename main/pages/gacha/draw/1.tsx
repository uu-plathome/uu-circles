import { BaseFooter } from "@/components/layouts/BaseFooter"
import { BaseHead } from "@/components/layouts/BaseHead"
import { BaseLayout } from "@/components/layouts/BaseLayout"
import { BaseContainer } from "@/components/molecules/Container/BaseContainer"
import { drawGacha } from "@/infra/api/gacha"
import { NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"

const Page: NextPage = () => {
  const router = useRouter()

  const redirect = async () => {
    await drawGacha(1)

    await router.push('/gacha')
  }

  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>

            aaa

            <div className="flex justify-end">
              <a onClick={redirect} className="underline text-blue-600 text-right cursor-pointer">
                動画が再生されない場合はこちらをクリック
              </a>
            </div>

          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
