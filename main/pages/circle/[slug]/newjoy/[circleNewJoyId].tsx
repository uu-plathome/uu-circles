import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { IndexCircleNewJoyListPC } from '@/components/organisms/List/IndexCircleNewJoyListPC'
import { IndexCircleNewJoyListSP } from '@/components/organisms/List/IndexCircleNewJoyListSP'
import { CircleNewJoyDetail } from '@/components/organisms/Newjoy/CircleNewJoyDetail'
import { showCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { InformationCircleBesideNewJoyPCWithButton } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoyPCWithButton'
import { InformationCircleBesideNewJoySP } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoySP'
import { YellowButton } from '@/components/atoms/button/YellowButton'
import { PageNotFoundError } from '@/infra/api/error'
import Error from 'next/error'

type Props = {
  errorCode?: number
  /** サークル */ circle?: Circle
  /** 新歓詳細 */ circleNewJoy?: CircleNewJoy
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
}
const Page: NextPage<Props> = ({
  errorCode,
  circle,
  circleNewJoy,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
}) => {
  // console.log(circleNewJoy)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const { isMd } = useMediaQuery()
  // console.log(circleNewJoy)
  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl pl-4 py-8 md:py-20 md:text-center text-left">
              新歓イベント日程詳細
            </h1>
            {isMd ? (
              //PC
              <div>
                <div className="pb-16 grid grid-cols-7">
                  <div className="col-span-5">
                    <CircleNewJoyDetail circleNewJoy={circleNewJoy} />
                  </div>
                  <div className="col-span-2  ml-6">
                    <h2 className="text-xl">主催サークル</h2>

                    <InformationCircleBesideNewJoyPCWithButton
                      circle={circle}
                    />
                    <Link href="/circle/newjoy" as={'/circle/newjoy'}>
                      <a>
                        {/* <div
                        className="rounded-md text-white bg-yellow-500 text-center px-2 py-2 mt-6"
                        style={{ width: 222 }}
                      > */}
                        <div className="mt-6 w-full">
                          <YellowButton width={'222px'}>
                            <div className="py-2">
                              <h4 className="text-xs">
                                他のサークルの新歓も見る
                              </h4>
                              <h3 className="text-sm font-bold">
                                今日の新歓をチェック！
                              </h3>
                            </div>
                          </YellowButton>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <>
                  {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                    <div className="pb-16">
                      <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                        開催中
                      </h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={nowCircleNewJoys}
                      />
                    </div>
                  ) : (
                    ''
                  )}{' '}
                </>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <div>
                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={todayCircleNewJoys}
                      />
                    </div>
                  ) : (
                    <p className="text-center">今日の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    開催予定
                  </h2>

                  <IndexCircleNewJoyListPC
                    slug={circle.slug}
                    circleNewJoys={futureCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    開催済み
                  </h2>

                  <IndexCircleNewJoyListPC
                    slug={circle.slug}
                    circleNewJoys={pastCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                    <a>
                      <h2 className="font-bold text-lg pl-1 mb-3">
                        主催サークル
                      </h2>
                      <div
                        className="border border-4 border-gray-300 bg-white rounded-lg flex justify-between items-center px-2 py-2 mx-auto mb-2"
                        style={{ width: 300 }}
                      >
                        <div className="mr-2" style={{ width: 64 }}>
                          <Image
                            src={
                              circle.mainImageUrl
                                ? circle.mainImageUrl
                                : '/images/no-image.png'
                            }
                            alt={`${circle.name}のロゴ`}
                            width={64}
                            height={64}
                            className="rounded-full border border-gray-300"
                          />
                        </div>
                        <div className="w-full pr-2" style={{ width: 200 }}>
                          <h3 className="text-black font-bold mb-1 text-sm font-bold">
                            {circle.name}
                          </h3>
                          <div>
                            <p className="text-xs text-gray-600">
                              {circle.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>{' '}
              </div>
            ) : (
              // SP
              <div>
                <>
                  <div className="pb-16">
                    <CircleNewJoyDetail circleNewJoy={circleNewJoy} />
                  </div>
                  {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                    <div className="pb-16">
                      <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                        開催中
                      </h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={nowCircleNewJoys}
                      />
                    </div>
                  ) : (
                    ''
                  )}{' '}
                </>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <div>
                      <IndexCircleNewJoyListSP
                        slug={circle.slug}
                        circleNewJoys={todayCircleNewJoys}
                      />
                    </div>
                  ) : (
                    <p className="text-center">今日の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催予定
                  </h2>
                  <IndexCircleNewJoyListSP
                    slug={circle.slug}
                    circleNewJoys={futureCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催済み
                  </h2>
                  <IndexCircleNewJoyListSP
                    slug={circle.slug}
                    circleNewJoys={pastCircleNewJoys}
                  />
                </div>
                <InformationCircleBesideNewJoySP circle={circle} />
              </div>
            )}
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  res,
}) => {
  if (!params.slug || Array.isArray(params.slug)) {
    res.statusCode = 404
    return { props: { errorCode: 404 } }
  }

  try {
    const {
      circle,
      circleNewJoy,
      pastCircleNewJoys,
      futureCircleNewJoys,
      nowCircleNewJoys,
      todayCircleNewJoys,
      allTodayCircleNewJoys,
    } = await showCircleNewJoyBySlug(params.slug, Number(params.circleNewJoyId))

    return {
      props: {
        circle,
        circleNewJoy,
        pastCircleNewJoys,
        futureCircleNewJoys,
        nowCircleNewJoys,
        todayCircleNewJoys,
        allTodayCircleNewJoys,
      },
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      res.statusCode = 404
      return { props: { errorCode: 404 } }
    }

    res.statusCode = 500
    return { props: { errorCode: 500 } }
  }
}

export default Page
