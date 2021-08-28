import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getGachaHistory, SimpleGachaDto } from '@/src/lib/infra/api/gacha'

const BaseFooter = dynamic(() =>
  import('@/src/components/layouts/BaseFooter').then(
    (mod) => mod.BaseFooter
  )
)

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
        <div className="px-2 pb-36 bg-gray-100">
          <BaseContainer>
            <div className="px-4">
              <div className="flex justify-center items-center pt-6">
                <Image
                  src="/images/gacha-logo.png"
                  width="360"
                  height="120"
                  alt="サークルガチャへようこそ！"
                />
              </div>

              <h1 className="px-4 pt-6 text-2xl font-bold text-center">
                - ガチャ結果 -
              </h1>

              <h2 className="px-4 pt-6 text-lg text-center">
                もう一度ガチャを引く
              </h2>

              <div className="flex justify-center">
                <Link href="/gacha/draw/1" passHref>
                  <div className="flex-initial py-4 px-4 md:px-8 my-6 mx-4 font-black text-white bg-green-500 rounded-md shadow-sm hover:shadow-md cursor-pointer">
                    1連ガチャ
                  </div>
                </Link>
                <Link href="/gacha/draw/5" passHref>
                  <div className="flex-initial py-4 px-4 md:px-8 my-6 mx-4 font-black text-white bg-green-500 rounded-md shadow-sm hover:shadow-md cursor-pointer">
                    5連ガチャ
                  </div>
                </Link>
              </div>

              <h2 className="px-4 pt-6 mb-4 text-lg text-center">ガチャ結果</h2>

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
                          passHref
                        >
                          <div className="flex items-center py-4 px-6 bg-white rounded">
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
                                alt={`${gachaResult.resultCircles[0].name}の新歓ビラ`}
                              />
                            </div>

                            <div className="pl-2">
                              <h3 className="mb-2 text-lg font-bold">
                                {gachaResult.resultCircles[0].name}
                                {gachaResult.resultCircles.length > 1
                                  ? 'など'
                                  : ''}
                              </h3>
                              <p className="text-sm text-gray-400 max-line-2">
                                {gachaResult.resultCircles.length}連ガチャ
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
              </div>

              <div className="flex justify-center py-8">
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
