import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Page: NextPage = () => {
  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>

            <h1 className="text-2xl pt-6 px-4 text-center">サークルガチャ</h1>

            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha800.png" width="360" height="450" />
            </div>

            <div className="flex justify-center">
              <Link href="/gacha/draw/1">
                <div className="flex-initial rounded bg-green-500 px-8 py-4 text-white mx-6 my-6 font-black cursor-pointer hover:shadow-sm">
                  1連ガチャ
                </div>
              </Link>
              <a className="" href="">
                <div className="flex-initial rounded bg-green-500 px-8 py-4 text-white mx-6 my-6 font-black cursor-pointer hover:shadow-sm">
                  10連ガチャ
                </div>
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
