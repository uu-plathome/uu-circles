import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { WP_REST_API_Posts } from 'wp-types'
import { useTag } from './Hooks/useTag'
import { MainHeading } from './Parts/MainHeading'
import { RecommendCircleList } from './Parts/RecommendCircleList'
import { SearchDescription } from './Parts/SearchDescription'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const ID_LIST = {
  /** タイトル */
  MAIN_HEADING: 'main_heading',
  /** カテゴリー説明 */
  TAG_DESCRIPTION: 'tag_description',
  /** サークル一覧 */
  CIRCLE_LIST: 'circle_list',
  /** 他のサークルも見る */
  SEARCH_OTHER_CIRCLE: 'search_other_circle',
}

type Props = {
  /** 検索結果 */ circles?: Circle[]
  /** 他のサークルも見る */ recommendCircles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
export const SearchCircleByTagTemplate: NextPage<Props> = ({
  circles,
  recommendCircles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  const { tagTranslated, tagDescriptionText, tagDescriptionTitle } = useTag()

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
          <div className="px-5">
            <MainHeading id={ID_LIST.MAIN_HEADING}>{tagTranslated}</MainHeading>

            {/*  カテゴリーやタグの説明 */}
            <SearchDescription
              id={ID_LIST.TAG_DESCRIPTION}
              title={tagDescriptionTitle}
              text={tagDescriptionText}
            />

            {/*  サークル一覧 */}
            <BaseCircleList id={ID_LIST.CIRCLE_LIST} circles={circles || []} />

            {/*  他のサークルも見る */}
            <RecommendCircleList
              id={ID_LIST.SEARCH_OTHER_CIRCLE}
              recommendCircles={recommendCircles || []}
            />
          </div>
        </TwoColumnContainer>
      </div>

      {/*  フッター */}
      <BaseFooter uuYellArticles={uuYellArticles} />
    </BaseLayout>
  )
}
