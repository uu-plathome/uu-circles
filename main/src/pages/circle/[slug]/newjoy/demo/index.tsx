import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Error from 'next/error'
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
import { WP_REST_API_Posts } from 'wp-types'
import { YellowButton } from '@/src/components/atoms/button/YellowButton'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { IndexCircleNewJoyListPC } from '@/src/components/organisms/List/IndexCircleNewJoyListPC'
import { IndexCircleNewJoyListSP } from '@/src/components/organisms/List/IndexCircleNewJoyListSP'
import { InformationCircleBesideNewJoyPC } from '@/src/components/pages/CircleNewJoy/Show/Parts/InformationCircleBesideNewJoyPC'
import { InformationCircleBesideNewJoySP } from '@/src/components/pages/CircleNewJoy/Show/Parts/InformationCircleBesideNewJoySP'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'
import { getDemoCircleNewJoyBySlug } from '@/src/lib/infra/api/circleNewJoy'
import { PageNotFoundError } from '@/src/lib/infra/api/error'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const BaseFooter = dynamic(() =>
  import('@/src/components/layouts/BaseFooter').then(
    (mod) => mod.BaseFooter
  )
)

type Props = {
  /** サークル */ circle?: Circle
  errorCode?: number
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  errorCode,
  circle,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
  uuYellArticles,
  announcements,
}) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため
  const pageUrl = useMemo(
    () => `https://uu-circles.com/${circle.slug}/newjoy`,
    [circle.slug]
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${circle.name}の新歓 デモ画面`} />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="px-2 bg-gray-100">
          <BaseContainer>
            {isMd ? (
              //PC
              <div style={{ width: 750 }}>
                <h1 className="py-20 text-2xl text-center">
                  {circle.name}の新歓 デモ画面
                </h1>

                <div className="grid grid-cols-7">
                  <div className="col-span-5">
                    {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                      <div className="pb-16">
                        <h2 className="pl-6 mb-3 text-lg text-left">開催中</h2>

                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={nowCircleNewJoys}
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="pb-16">
                      <h2 className="pl-6 mb-3 text-lg text-left">
                        今日の新歓
                      </h2>
                      {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={todayCircleNewJoys}
                        />
                      ) : (
                        <p className="text-center">今日の新歓はありません</p>
                      )}
                    </div>

                    <div className="pb-16">
                      <h2 className="pl-6 mb-3 text-lg text-left">開催予定</h2>
                      {futureCircleNewJoys && futureCircleNewJoys.length > 0 ? (
                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={futureCircleNewJoys}
                        />
                      ) : (
                        <p className="text-center">
                          開催予定の新歓はありません
                        </p>
                      )}
                    </div>

                    <div className="pb-16">
                      <h2 className="pl-6 mb-3 text-lg text-left">開催済み</h2>
                      {pastCircleNewJoys && pastCircleNewJoys.length > 0 ? (
                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={pastCircleNewJoys}
                        />
                      ) : (
                        <p className="text-center">
                          開催済みの新歓はありません
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 mx-1">
                    <h2 className="text-xl">主催サークル</h2>

                    <InformationCircleBesideNewJoyPC circle={circle} />
                    <Link href="/circle/newjoy" as={'/circle/newjoy'}>
                      <a>
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

                    <h2 className="text-base font-bold">
                      SNSで{circle.shortName || circle.name}の新歓をShare
                    </h2>

                    <div className="pb-2 my-2">
                      <TwitterShareButton
                        url={pageUrl}
                        title={`UU-Circlesで${circle.shortName || circle.name
                          }の新歓を見る！`}
                        hashtags={['春から宇大']}
                        className="mr-2"
                      >
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>

                      <LineShareButton url={pageUrl} className="mr-2">
                        <LineIcon size={40} round />
                      </LineShareButton>

                      <FacebookShareButton
                        url={pageUrl}
                        hashtag={'春から宇大'}
                        className="mr-2"
                      >
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="py-8 pl-4 text-2xl">{`${circle.name}の新歓`}</h1>
                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <div className="pb-16">
                    <h2 className="pl-4 mb-3 font-bold text-center">開催中</h2>

                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={nowCircleNewJoys}
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className="pb-16">
                  <h2 className="pl-4 mb-3 font-bold text-center">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={todayCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">今日の新歓はありません</p>
                  )}
                </div>

                <div className="pb-16">
                  <h2 className="pl-4 mb-3 font-bold text-center">開催予定</h2>
                  {futureCircleNewJoys && futureCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={futureCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">開催予定の新歓はありません</p>
                  )}
                </div>

                <div className="pb-16">
                  <h2 className="pl-4 mb-3 font-bold text-center">開催済み</h2>
                  {pastCircleNewJoys && pastCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={pastCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">開催済みの新歓はありません</p>
                  )}
                </div>

                <InformationCircleBesideNewJoySP circle={circle} />

                <div className="pb-16">
                  <h2 className="font-bold text-center">
                    SNSで{circle.shortName || circle.name}の新歓をShare
                  </h2>

                  <div className="flex justify-center pb-2 my-2">
                    <TwitterShareButton
                      url={pageUrl}
                      title={`UU-Circlesで${circle.shortName || circle.name
                        }の新歓を見る！`}
                      hashtags={['春から宇大']}
                      className="mr-2"
                    >
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>

                    <LineShareButton url={pageUrl} className="mr-2">
                      <LineIcon size={40} round />
                    </LineShareButton>

                    <FacebookShareButton
                      url={pageUrl}
                      hashtag={'春から宇大'}
                      className="mr-2"
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>
            )}
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
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
      pastCircleNewJoys,
      futureCircleNewJoys,
      nowCircleNewJoys,
      todayCircleNewJoys,
      allTodayCircleNewJoys,
      uuYellArticles,
    } = await getDemoCircleNewJoyBySlug(params.slug)

    const announcements: Announcement[] = [
      {
        announcementId: 0,
        title: 'これはデモ画面です。正しい新歓ではありません。',
        announcementType: AnnouncementType.UPDATE_FEATURE,
        importance: Importance.MIDDLE,
      },
    ]

    return {
      props: {
        circle,
        pastCircleNewJoys,
        futureCircleNewJoys,
        nowCircleNewJoys,
        todayCircleNewJoys,
        allTodayCircleNewJoys,
        uuYellArticles,
        announcements,
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
