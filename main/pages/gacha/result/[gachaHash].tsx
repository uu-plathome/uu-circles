import colors from '@/colors'
import { GreenButton } from '@/components/atoms/button/GreenButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { PageNotFoundError } from '@/infra/api/error'
import { resultGacha } from '@/infra/api/gacha'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  count?: number
  createdAt?: string
  gachaHash?: string
  pickupCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  resultCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  errorCode?: number
}
const Page: NextPage<Props> = ({
  count,
  pickupCircles,
  resultCircles,
  errorCode,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div>
      <BaseHead title="サークルガチャ結果" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>

            <h1 className="font-bold text-2xl text-center py-8">- 結果 -</h1>

            {count === 1 &&
            resultCircles &&
            Array.isArray(resultCircles) &&
            resultCircles.length > 0 ? (
              <div className="flex justify-center cursor-pointer">
                <Link
                  href="/circle/slug"
                  as={`/circle/${resultCircles[0].slug}`}
                >
                  <div>
                    <div className="rounded">
                      <Image
                        src={resultCircles[0].handbillImageUrl}
                        width="250"
                        height="350"
                      />
                    </div>

                    <h2 className="text-center">{resultCircles[0].name}</h2>
                  </div>
                </Link>
              </div>
            ) : (
              ''
            )}

            {count === 10 &&
            resultCircles &&
            Array.isArray(resultCircles) &&
            resultCircles.length > 0 ? (
              <div className="flex justify-center">
                {resultCircles.map((resultCircle, idx) => {
                  return (
                    <div
                      key={`resultCircles-${resultCircle.slug}-${idx}`}
                      className="w-1/5 flex justify-center cursor-pointer"
                    >
                      <Link
                        href="/circle/slug"
                        as={`/circle/${resultCircles[0].slug}`}
                      >
                        <div>
                          <div className="rounded">
                            <Image
                              src={resultCircles[0].handbillImageUrl}
                              width="250"
                              height="350"
                            />
                          </div>

                          <h2 className="text-center">
                            {resultCircles[0].name}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            ) : (
              ''
            )}

            <div className="flex justify-center py-8">
              <GreenButton href="/gacha">ガチャTOPへ</GreenButton>
            </div>

            {pickupCircles &&
            Array.isArray(pickupCircles) &&
            pickupCircles.length > 0 ? (
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
                    {pickupCircles.map((circle, idx) => {
                      return (
                        <div
                          key={`pickupCircles-${circle.slug}-${idx}`}
                          className="mb-4 cursor-pointer"
                        >
                          <Link
                            href="/circle/slug"
                            as={`/circle/${resultCircles[0].slug}`}
                          >
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
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.gachaHash || Array.isArray(params.gachaHash)) {
    return {
      notFound: true,
    }
  }

  try {
    const res = await resultGacha({
      gachaHash: params.gachaHash,
    })

    return {
      props: res,
      revalidate: 60 * 60 * 24,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
