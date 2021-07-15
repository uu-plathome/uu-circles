import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { getGachaHistory } from '@/infra/api/gacha'
import { LocalStorageKey } from '@/lib/enum/app/LocalStorageKey'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import useSWR from 'swr'

type Props = {
  history: {
    list: {
      createdAt: string;
      resultCircles: {
        handbillImageUrl: string;
        name: string;
        slug: string;
      }[];
    }[];
  };
}
const Page: NextPage<Props> = () => {
  const [identifierHash, setIdentifierHash] = useState(null)

  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  const { data: gachaHistory, error } = useSWR(
    identifierHash ? `/api/gacha/circle/history?X-IDENTIFIER_HASH=${identifierHash}` : null,
    getGachaHistory
  )

  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>

            <h1 className="text-2xl pt-6 px-4 text-center">- ガチャ結果 -</h1>

            <h2 className="text-lg pt-6 px-4 text-center">もう一度ガチャを引く</h2>

            <div className="flex justify-center">
              <Link href="/gacha/draw/1">
                <div className="flex-initial rounded bg-green-500 px-8 py-4 text-white mx-6 my-6 font-black cursor-pointer hover:shadow-sm">
                  1連ガチャ
                </div>
              </Link>
              <Link href="/gacha/draw/10">
                <div className="flex-initial rounded bg-green-500 px-8 py-4 text-white mx-6 my-6 font-black cursor-pointer hover:shadow-sm">
                  10連ガチャ
                </div>
              </Link>
            </div>

            <h2 className="text-lg pt-6 px-4 text-center">ガチャ結果</h2>
            {gachaHistory && gachaHistory.history.list && gachaHistory.history.list.map((gachaResult, index) => {
              return (
                <div key={`gachaHistory-${index}-container-${gachaResult.gachaHash}`}>
                  <Link href="/gacha/result/[gachaHash]" as={`/gacha/result/${gachaResult.gachaHash}`}>
                    <div className="rounded bg-white flex items-center px-6 py-4">
                      <div
                        style={{ minWidth: 60 }}
                        className="rounded border border-gray-300"
                      >
                        <Image
                          src={gachaResult.resultCircles[0].handbillImageUrl}
                          width="60"
                          height="60"
                        />
                      </div>

                      <div className="pl-2">
                        <h3 className="font-bold text-lg mb-2">
                          {gachaResult.resultCircles[0].name}
                        </h3>
                        <p className="text-sm max-line-2 text-gray-400">
                          {gachaResult.resultCircles.length + 1}連ガチャ
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}

          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
