import { FC } from "react";
import { useMemo } from 'react'
import { WP_REST_API_Posts } from 'wp-types'
import { ShareSns } from "./Parts/ShareSns";
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { IndexCircleNewJoyListForNoSlug } from '@/src/components/organisms/List/IndexCircleNewJoyListForNoSlug'
import {
  TodayCircleNewJoy,
} from '@/src/lib/infra/api/circleNewJoy'
import { Announcement } from '@/src/lib/types/model/Announcement'

const ID_LIST = {
  /** タイトル */
  MAIN_HEADING: 'main_heading',
  /** SNSのシェア */
  SHARE_SNS: 'share_sns',
  /** 今日の新歓 */
  TODAY_CIRCLE_NEW_JOY_LIST: 'today_circle_new_joy_list',
  /** 未来の新歓 */
  FUTURE_CIRCLE_NEW_JOY_LIST: 'today_circle_new_joy_list',
} as const
type Props = {
  /** 今日の新歓 */ todayCircleNewJoys?: TodayCircleNewJoy[]
  /** 未来の新歓 */ futureCircleNewJoys?: TodayCircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  onChangeId: (id: string) => void
}
export const IndexTodayCircleNewJoyTemplate: FC<Props> = ({
  futureCircleNewJoys,
  todayCircleNewJoys,
  uuYellArticles,
  announcements,
  onChangeId
}) => {
  const pageUrl = useMemo(() => `https://uu-circles.com/newjoy`, [])

  return (
    <BaseLayout
      announcement={
        announcements && announcements.length > 0
          ? announcements[0]
          : undefined
      }
    >
      <div className="bg-gray-100 px-2">
        <BaseContainer>
          <h1
            id={ID_LIST.MAIN_HEADING}
            className="text-2xl py-8 md:py-20 md:text-center"
            onMouseOver={() => onChangeId(ID_LIST.MAIN_HEADING)}
          >
            今日の新歓
          </h1>

          <div
            id={ID_LIST.TODAY_CIRCLE_NEW_JOY_LIST}
            className="pb-16"
            onMouseOver={() => onChangeId(ID_LIST.TODAY_CIRCLE_NEW_JOY_LIST)}
          >
            <h2 className="md:hidden font-bold text-lg md:text-center pl-1 mb-3">
              今日開催予定の新歓イベント
            </h2>

            {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
              <IndexCircleNewJoyListForNoSlug
                circleNewJoys={todayCircleNewJoys}
              />
            ) : (
              <p className="text-center">今日の新歓はありません</p>
            )}
          </div>

          <ShareSns
            id={ID_LIST.SHARE_SNS}
            pageUrl={pageUrl}
          />

          <div
            id={ID_LIST.FUTURE_CIRCLE_NEW_JOY_LIST}
            className="pb-16"
            onMouseOver={() => onChangeId(ID_LIST.FUTURE_CIRCLE_NEW_JOY_LIST)}
          >
            <section>
              <h2 className="font-bold md:font-normal text-lg md:text-2xl pl-1 mb-4 md:mb-0 md:py-20 md:text-center">
                開催日時が近い新歓イベント
              </h2>

              <IndexCircleNewJoyListForNoSlug
                circleNewJoys={futureCircleNewJoys}
              />
            </section>
          </div>
        </BaseContainer>
      </div>

      {/*  フッター */}
      <BaseFooter uuYellArticles={uuYellArticles} />
    </BaseLayout>
  )
}
