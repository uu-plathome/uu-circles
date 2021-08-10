import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getGachaHistory, SimpleGachaDto } from '@/src/lib/infra/api/gacha'

type Props = {
  history: {
    list: {
      createdAt: string
      resultCircles: SimpleGachaDto[]
    }[]
  }
}
const Page: NextPage<Props> = () => {
  const [identifierHash, setIdentifierHash] = useState(null)

  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  const { data: gachaHistory } = useSWR(
    identifierHash
      ? `/api/gacha/circle/history?X-IDENTIFIER_HASH=${identifierHash}`
      : null,
    () => getGachaHistory({ identifierHash })
  )

  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="px-4">
              <div className="flex justify-center items-center pt-6">
                <Image src="/images/gacha-logo.png" width="360" height="120" />
              </div>

              <h1 className="text-2xl pt-6 px-4 text-center font-bold">
                - ガチャ結果 -
              </h1>

              <h2 className="text-lg pt-6 px-4 text-center">
                もう一度ガチャを引く
              </h2>

              <div className="flex justify-center">
                <Link href="/gacha/draw/1">
                  <div className="flex-initial rounded-md bg-green-500 px-4 md:px-8 py-4 text-white mx-4 my-6 font-black cursor-pointer shadow-sm hover:shadow-md">
                    1連ガチャ
                  </div>
                </Link>
                <Link href="/gacha/draw/5">
                  <div className="flex-initial rounded-md bg-green-500 px-4 md:px-8 py-4 text-white mx-4 my-6 font-black cursor-pointer shadow-sm hover:shadow-md">
                    5連ガチャ
                  </div>
                </Link>
              </div>

              <h2 className="text-lg pt-6 px-4 text-center mb-4">ガチャ結果</h2>

              <div className="px-4">
                {gachaHistory &&
                  gachaHistory.history.list &&
                  gachaHistory.history.list.map((gachaResult, index) => {
                    return (
                      <div
                        key={`gachaHistory-${index}-container-${gachaResult.gachaHash}`}
                        className="mb-4 cursor-pointer"
                      >
                        <Link
                          href="/gacha/result/[gachaHash]"
                          as={`/gacha/result/${gachaResult.gachaHash}`}
                        >
                          <div className="rounded bg-white flex items-center px-6 py-4">
                            <div
                              style={{ minWidth: 60 }}
                              className="rounded border border-gray-300"
                            >
                              <Image
                                src={
                                  gachaResult.resultCircles[0].handbillImageUrl
                                }
                                width="60"
                                height="60"
                              />
                            </div>

                            <div className="pl-2">
                              <h3 className="font-bold text-lg mb-2">
                                {gachaResult.resultCircles[0].name}
                                {gachaResult.resultCircles.length > 1
                                  ? 'など'
                                  : ''}
                              </h3>
                              <p className="text-sm max-line-2 text-gray-400">
                                {gachaResult.resultCircles.length}連ガチャ
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
              </div>

              <div className="py-8 flex justify-center">
                <GreenButton href="/gacha">ガチャTOP</GreenButton>
              </div>
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
