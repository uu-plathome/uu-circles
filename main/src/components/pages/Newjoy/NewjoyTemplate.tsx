import { NextPage } from 'next'
import dynamic from 'next/dynamic'
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
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { IndexCircleNewJoyListForNoSlug } from '@/src/components/organisms/List/IndexCircleNewJoyListForNoSlug'
import { TodayCircleNewJoy } from '@/src/lib/infra/api/circleNewJoy'
import { Announcement } from '@/src/lib/types/model/Announcement'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

type Props = {
  futureCircleNewJoys?: TodayCircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: TodayCircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
}
export const NewjoyTemplate: NextPage<Props> = ({
  futureCircleNewJoys,
  todayCircleNewJoys,
  uuYellArticles,
  announcements,
}) => {
  const pageUrl = useMemo(() => `https://uu-circles.com/circle/newjoy`, [])

  return (
    <div>
      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="px-2 bg-gray-100">
          <BaseContainer>
            <h1 className="py-8 md:py-20 text-2xl md:text-center">
              今日の新歓
            </h1>

            <h2 className="md:hidden pl-1 mb-3 text-lg font-bold md:text-center">
              今日開催予定の新歓イベント
            </h2>

            <div className="pb-16">
              {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                <IndexCircleNewJoyListForNoSlug
                  circleNewJoys={todayCircleNewJoys}
                />
              ) : (
                <p className="text-center">今日の新歓はありません</p>
              )}
            </div>

            <div className="pb-16 md:pb-0">
              <h2 className="md:py-4 pl-1 mb-4 md:mb-0 text-lg md:text-2xl font-bold md:font-normal md:text-center">
                SNSで今日の新歓をShare
              </h2>

              <div className="flex justify-center pb-2 my-2">
                <TwitterShareButton
                  url={pageUrl}
                  title={`UU-Circlesで今日の新歓を見る！`}
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

            <div className="pb-16">
              <section>
                <h2 className="md:py-20 pl-1 mb-4 md:mb-0 text-lg md:text-2xl font-bold md:font-normal md:text-center">
                  開催日時が近い新歓イベント
                </h2>
                <IndexCircleNewJoyListForNoSlug
                  circleNewJoys={futureCircleNewJoys || []}
                />
              </section>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}
