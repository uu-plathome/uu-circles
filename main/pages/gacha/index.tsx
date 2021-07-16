import colors from '@/colors'
import { GreenButton } from '@/components/atoms/button/GreenButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { getGachaPickup, SimpleGachaDto } from '@/infra/api/gacha'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
              <Link href="/gacha/draw/10">
                <div className="flex-initial rounded bg-green-500 px-8 py-4 text-white mx-6 my-6 font-black cursor-pointer hover:shadow-sm">
                  10連ガチャ
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
                    <h2 className="text-yellow-500 font-bold text-2xl">
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
                          <Link href={`/circle/${circle.slug}`}>
                            <div className="rounded bg-white flex items-center px-6 py-4">
                              <div
                                style={{ minWidth: 60 }}
                                className="rounded border border-gray-300"
                              >
                                <Image
                                  src={circle.handbillImageUrl}
                                  width="60"
                                  height="60"
                                />
                              </div>

                              <div className="pl-2">
                                <h3 className="font-bold text-lg mb-2">
                                  {circle.name}
                                </h3>
                                <p className="text-sm max-line-2">
                                  初めましてU-labです。私たちは工学の知識を活用して地域で役に立つwebサービスの開発や...
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

            <div className="py-8 flex justify-center">
              <GreenButton href="/gacha/history">ガチャ結果一覧</GreenButton>
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
