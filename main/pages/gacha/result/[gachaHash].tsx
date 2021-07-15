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
import { useMemo } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

type Props = {
  count?: number
  createdAt?: string
  gachaHash?: string
  pickupCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
    description?: string
  }[]
  resultCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
    description?: string
  }[]
  errorCode?: number
}
const Page: NextPage<Props> = ({
  count,
  gachaHash,
  pickupCircles,
  resultCircles,
  errorCode,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const pageUrl = useMemo(
    () => `https://uu-circles.com/gacha/result/${gachaHash}`,
    [gachaHash]
  )

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
                        alt={`${resultCircles[0].name}-ビラ`}
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
              <div className="grid grid-cols-5 gap-4">
                {resultCircles.map((resultCircle, idx) => {
                  return (
                    <div
                      key={`resultCircles-${resultCircle.slug}-${idx}`}
                      className="flex justify-center cursor-pointer"
                    >
                      <Link
                        href="/circle/slug"
                        as={`/circle/${resultCircle.slug}`}
                      >
                        <div>
                          <div className="rounded">
                            <Image
                              src={resultCircle.handbillImageUrl}
                              width="250"
                              height="350"
                              alt={`${resultCircle.name}-ビラ`}
                            />
                          </div>

                          <h2 className="text-center">{resultCircle.name}</h2>
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

            <div className="pb-16 md:pb-0">
              <h2 className="font-bold md:font-normal text-lg md:text-2xl pl-1 mb-4 md:mb-0 md:py-4 md:text-center">
                SNSでガチャ結果をShare
              </h2>

              <div className="my-2 pb-2 flex justify-center">
                <TwitterShareButton
                  url={pageUrl}
                  title={
                    count === 10
                      ? '10連ガチャ結果を見る！'
                      : `${resultCircles[0].name}があたりました！`
                  }
                  hashtags={['春から宇大']}
                  className="mr-2"
                >
                  <TwitterIcon size={50} round />
                </TwitterShareButton>

                <LineShareButton url={pageUrl} className="mr-2">
                  <LineIcon size={50} round />
                </LineShareButton>

                <FacebookShareButton
                  url={pageUrl}
                  hashtag={'春から宇大'}
                  className="mr-2"
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
              </div>
            </div>

            {pickupCircles &&
              Array.isArray(pickupCircles) &&
              pickupCircles.length > 0 ? (
              <div className="flex justify-center pt-8">
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
                                  alt={`${circle.name}-ビラ`}
                                />
                              </div>

                              <div className="pl-2">
                                <h3 className="font-bold text-lg mb-2">
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
