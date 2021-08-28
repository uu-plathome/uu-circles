import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
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
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { PageNotFoundError } from '@/src/lib/infra/api/error'
import { resultGacha, SimpleGachaDto } from '@/src/lib/infra/api/gacha'
import colors from '@/src/styles/colors'

const BaseFooter = dynamic(() =>
  import('@/src/components/layouts/BaseFooter').then(
    (mod) => mod.BaseFooter
  )
)

type Props = {
  count?: number
  createdAt?: string
  gachaHash?: string
  pickupCircles?: SimpleGachaDto[]
  resultCircles?: SimpleGachaDto[]
  errorCode?: number
}
const Page: NextPage<Props> = ({
  count,
  gachaHash,
  pickupCircles,
  resultCircles,
  errorCode,
}) => {
  const pageUrl = useMemo(
    () => `https://uu-circles.com/gacha/result/${gachaHash}`,
    [gachaHash]
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div>
      <BaseHead title="サークルガチャ結果" />

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

              <h1 className="py-8 text-2xl font-bold text-center">- 結果 -</h1>

              {count === 1 &&
                resultCircles &&
                Array.isArray(resultCircles) &&
                resultCircles.length > 0 ? (
                <div className="flex justify-center cursor-pointer">
                  <Link
                    href="/circle/slug"
                    as={`/circle/${resultCircles[0].slug}`}
                    passHref
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

              {count === 5 &&
                resultCircles &&
                Array.isArray(resultCircles) &&
                resultCircles.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {resultCircles.map((resultCircle, idx) => {
                    return (
                      <div
                        key={`resultCircles-${resultCircle.slug}-${idx}`}
                        className="flex justify-center cursor-pointer"
                      >
                        <Link
                          href="/circle/slug"
                          as={`/circle/${resultCircle.slug}`}
                          passHref
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
                <Link href="/gacha">
                  <a>
                    <div className="flex-initial py-4 px-4 md:px-8 my-6 mx-4 font-black text-white bg-green-500 rounded-md shadow-sm hover:shadow-md cursor-pointer">
                      ガチャTOPへ
                    </div>
                  </a>
                </Link>
                <Link href={count === 10 ? '/gacha/draw/10' : '/gacha/draw/1'}>
                  <a>
                    <div className="flex-initial py-4 px-4 md:px-8 my-6 mx-4 font-black text-white bg-green-500 rounded-md shadow-sm hover:shadow-md cursor-pointer">
                      もう一回引く
                    </div>
                  </a>
                </Link>
              </div>

              <div className="pb-12 md:pb-0">
                <h2 className="md:py-4 pl-1 mb-4 md:mb-0 text-lg md:text-2xl font-bold md:font-normal text-center">
                  SNSでガチャ結果をShare
                </h2>

                <div className="flex justify-center pb-2 my-2">
                  <TwitterShareButton
                    url={pageUrl}
                    title={
                      count === 5
                        ? '5連ガチャ結果を見る！'
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
                      {pickupCircles.map((circle, idx) => {
                        return (
                          <div
                            key={`pickupCircles-${circle.slug}-${idx}`}
                            className="mb-4 cursor-pointer"
                          >
                            <Link
                              href="/circle/slug"
                              as={`/circle/${resultCircles[0].slug}`}
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
                                    alt={`${circle.name}-ビラ`}
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
