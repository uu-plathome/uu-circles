import dynamic from 'next/dynamic'
import { FC } from 'react'
import { WP_REST_API_Posts } from 'wp-types'
import { CircleLengthView } from './Parts/CircleLengthView'
import { SearchCircle } from './Parts/SearchCircle'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { RecommendTagList } from '@/src/components/organisms/Circles/RecommendTagList'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const ID_LIST = {
  /** 現在の掲載団体数 */
  CIRCLE_LENGTH: 'circle_length',
  /** おすすめのタグ */
  RECOMMEND_TAG_LIST: 'recommend_tag_list',
  /** サークル一覧 */
  CIRCLE_LIST: 'circle_list',
}

type Props = {
  circles: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
export const IndexCircleTemplate: FC<Props> = ({
  circles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  return (
    <BaseLayout
      announcement={
        announcements && announcements.length > 0 ? announcements[0] : undefined
      }
    >
      <div className="px-2 bg-gray-100">
        <TwoColumnContainer
          sidebar={<CircleSidebar tagPageViewRanking={tagPageViewRanking} />}
        >
          <div className="px-7">
            <h1 className="py-8 text-2xl">サークル一覧</h1>

            <div className="mb-8 md:hidden">
              {/* サークル検索 */}
              <SearchCircle />
            </div>

            {/* 現在の掲載団体数 */}
            <CircleLengthView
              id={ID_LIST.CIRCLE_LENGTH}
              circleLength={circles.length}
            />

            <div id={ID_LIST.RECOMMEND_TAG_LIST}>
              {/*  おすすめのタグ */}
              <RecommendTagList />
            </div>

            {/*  サークル一覧 */}
            <BaseCircleList id={ID_LIST.CIRCLE_LIST} circles={circles} />
          </div>
        </TwoColumnContainer>
      </div>

      {/*  フッター */}
      <BaseFooter uuYellArticles={uuYellArticles} />
    </BaseLayout>
  )
}
