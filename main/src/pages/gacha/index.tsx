import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { getGachaPickup, SimpleGachaDto } from '@/src/lib/infra/api/gacha'
import colors from '@/src/styles/colors'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

type Props = {
  pickupCircle: {
    list: SimpleGachaDto[]
  }
  pickupDate: string
}
const Page: NextPage<Props> = ({ pickupCircle }) => {
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

              <h1 className="px-4 pt-6 text-2xl text-center">サークルガチャ</h1>

              <div className="flex justify-center items-center pt-6">
                <Image
                  src="/images/gacha800.png"
                  width="360"
                  height="450"
                  alt="サークルガチャを引く"
                />
              </div>

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

              {pickupCircle.list &&
              Array.isArray(pickupCircle.list) &&
              pickupCircle.list.length > 0 ? (
                <div className="flex justify-center">
                  <div style={{ width: 360 }}>
                    <div className="flex justify-center items-center mb-4">
                      <FontAwesomeIcon
                        icon={faStar}
                        color={colors.yellow[500]}
                        size="lg"
                      />
                      <h2 className="text-2xl font-bold text-yellow-500">
                        Pick Up
                      </h2>
                      <FontAwesomeIcon
                        icon={faStar}
                        color={colors.yellow[500]}
                        size="lg"
                      />
                    </div>

                    <div>
                      {pickupCircle.list.map((circle, idx) => {
                        return (
                          <div
                            key={`${circle.slug}-${idx}`}
                            className="mb-4 cursor-pointer"
                          >
                            <Link
                              href="/circle/[slug]"
                              as={`/circle/${circle.slug}`}
                              passHref
                            >
                              <div className="flex items-center py-4 px-6 bg-white rounded">
                                <div
                                  style={{ minWidth: 60 }}
                                  className="rounded border border-gray-300"
                                >
                                  <Image
                                    src={circle.handbillImageUrl}
                                    width="60"
                                    height="60"
                                    alt={`${circle.name} - 新歓ビラ`}
                                  />
                                </div>

                                <div className="pl-2">
                                  <h3 className="mb-2 text-lg font-bold">
                                    {circle.name}
                                  </h3>
                                  <p className="text-sm max-line-2">
                                    {circle.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="flex justify-center py-8">
                <GreenButton href="/gacha/history">ガチャ結果一覧</GreenButton>
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await getGachaPickup()

  return {
    props: res,
    revalidate: 60 * 60 * 6,
  }
}

export default Page
