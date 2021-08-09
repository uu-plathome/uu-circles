import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { RecommendTagList } from '@/src/components/organisms/Circles/RecommendTagList'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { PagePositions } from '@/src/lib/types/model/PagePosition'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'
import { FC } from 'react'
import { WP_REST_API_Posts } from 'wp-types'
import { CircleLengthView } from './Parts/CircleLengthView'
import { SearchCircle } from './Parts/SearchCircle'

const ID_LIST = {
  CIRCLE_LENGTH: 'circle_length',
  RECOMMEND_TAG_LIST: 'recommend_tag_list',
  CIRCLE_LIST: 'circle_list',
}

type Props = {
  circles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
  pagePositions: PagePositions
  onChangeId(_pagePositionId: string): Promise<void>
}
export const IndexCircleTemplate: FC<Props> = ({
  circles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
  // pagePositions,
  onChangeId,
}) => {
  return (
    <div>
      <BaseHead title="サークル一覧" />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer
            sidebar={
              <CircleSidebar
                tagPageViewRanking={tagPageViewRanking}
                excludeTags={[
                  TagSlugProperty.sport,
                  TagSlugProperty.music,
                  TagSlugProperty.culture,
                  TagSlugProperty.community,
                ]}
              />
            }
          >
            <div className="px-7">
              <h1 className="text-2xl py-8">サークル一覧</h1>

              <div className="md:hidden mb-8">
                {/* サークル検索 */}
                <SearchCircle />
              </div>

              {/* 現在の掲載団体数 */}
              <CircleLengthView
                id={ID_LIST.CIRCLE_LENGTH}
                circleLength={circles.length}
                onChangeId={onChangeId}
              />

              <div
                id={ID_LIST.RECOMMEND_TAG_LIST}
                onMouseMove={() => onChangeId(ID_LIST.RECOMMEND_TAG_LIST)}
              >
                {/*  おすすめのタグ */}
                <RecommendTagList />
              </div>

              <div
                id={ID_LIST.CIRCLE_LIST}
                onMouseMove={() => onChangeId(ID_LIST.CIRCLE_LIST)}
              >
                {/*  サークル一覧 */}
                <BaseCircleList circles={circles} />
              </div>
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}
