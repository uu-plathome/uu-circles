import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { CarouselCircleList } from '@/src/components/organisms/List/CarouselCircleList'
import { namespaceType, __ } from '@/src/lang/ja'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { getCircleByTag } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

const useTag = () => {
  const router = useRouter()
  const { tag: _tag } = router.query
  const tag = String(_tag) as TagSlugProperty

  return {
    tag,
    tagTranslated: __(tag, TagSlugProperty._type),
    tagDescriptionTitle: __(tag, namespaceType.TitleByTagSlugProperty),
    tagDescriptionText: __(tag, namespaceType.TextByTagSlugProperty),
  }
}

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
  errorCode?: number
  circles?: Circle[]
  recommendCircles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
const Page: NextPage<Props> = ({
  circles,
  recommendCircles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  const { tagTranslated, tagDescriptionText, tagDescriptionTitle } = useTag()

  if (!circles) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${tagTranslated}タグ検索`} />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer
            sidebar={<CircleSidebar tagPageViewRanking={tagPageViewRanking} />}
          >
            <div className="px-5">
              <h1 id={ID_LIST.MAIN_HEADING} className="text-2xl py-8">
                {tagTranslated}
              </h1>

              <div id={ID_LIST.TAG_DESCRIPTION}>
                {tagDescriptionTitle ? (
                  <p className="text-base pb-4 font-bold">{tagDescriptionTitle}</p>
                ) : (
                  ''
                )}
                {tagDescriptionText ? (
                  <p className="text-sm pb-8">{tagDescriptionText}</p>
                ) : (
                  ''
                )}
              </div>

              {/*  サークル一覧 */}
              <BaseCircleList
                id={ID_LIST.CIRCLE_LIST}
                circles={circles}
                onChangeId={async (_: string) => { return }}
              />

              <div id={ID_LIST.SEARCH_OTHER_CIRCLE} className="pb-8">
                <h2 className="text-lg py-8">他のサークルも見る</h2>

                <CarouselCircleList circles={recommendCircles} />
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.tag || Array.isArray(params.tag)) {
    return {
      notFound: true,
    }
  }

  const {
    circles,
    recommendCircles,
    uuYellArticles,
    announcements,
    tagPageViewRanking,
  } = await getCircleByTag(params.tag)

  return {
    props: {
      circles,
      recommendCircles,
      uuYellArticles,
      announcements,
      tagPageViewRanking,
    },
    revalidate: 120,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
