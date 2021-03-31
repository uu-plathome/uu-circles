import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { IndexCircleNewJoyListPC } from '@/components/organisms/List/IndexCircleNewJoyListPC'
import { CircleNewJoyDetail } from '@/components/organisms/Newjoy/CircleNewJoyDetail'
import { showCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { InformationCircleBesideNewJoyPCWithButton } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoyPCWithButton'
import { YellowButton } from '@/components/atoms/button/YellowButton'
import { PageNotFoundError } from '@/infra/api/error'
import Error from 'next/error'
import { ShowCircleNewJoySpLayout } from '@/components/organisms/CircleNewJoy/ShowCircleNewJoySpLayout'
import { BaseHead } from '@/components/layouts/BaseHead'

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
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${circleNewJoy.title}の新歓イベント日程詳細`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl pl-4 py-8 md:py-20 md:text-center text-left">
              新歓イベント日程詳細
            </h1>

            {/* PC */}
            <div className="hidden md:block">
              <div className="pb-16 grid grid-cols-7">
                <div className="col-span-5">
                  <CircleNewJoyDetail circleNewJoy={circleNewJoy} />
                </div>

                <div className="col-span-2  ml-6">
                  <h2 className="text-xl">主催サークル</h2>

                  <InformationCircleBesideNewJoyPCWithButton circle={circle} />
                  <Link href="/circle/newjoy">
                    <a>
                      {/* <div
                        className="rounded-md text-white bg-yellow-500 text-center px-2 py-2 mt-6"
                        style={{ width: 222 }}
                      > */}
                      <div className="my-6 w-full">
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

              <div className="pb-16">
                <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                  開催中
                </h2>
                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <IndexCircleNewJoyListPC
                    slug={circle.slug}
                    circleNewJoys={nowCircleNewJoys}
                  />
                ) : (
                  <p className="text-center">開催中の新歓はありません</p>
                )}
              </div>

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

              <div className="pb-32">
                <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                  開催済み
                </h2>

                <IndexCircleNewJoyListPC
                  slug={circle.slug}
                  circleNewJoys={pastCircleNewJoys}
                />
              </div>
            </div>

            {/* SP */}
            <div className="md:hidden">
              <ShowCircleNewJoySpLayout
                circle={circle}
                circleNewJoy={circleNewJoy}
                pastCircleNewJoys={pastCircleNewJoys}
                futureCircleNewJoys={futureCircleNewJoys}
                nowCircleNewJoys={nowCircleNewJoys}
                todayCircleNewJoys={todayCircleNewJoys}
              />
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
  if (!params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
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
      revalidate: 120,
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
