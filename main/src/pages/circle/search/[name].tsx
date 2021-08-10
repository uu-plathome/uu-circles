import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { CarouselCircleList } from '@/src/components/organisms/List/CarouselCircleList'
import { searchCircle } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

const ID_LIST = {
  /** タイトル */
  MAIN_HEADING: 'main_heading',
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
  /** タグページ閲覧数 */ tagPageViewRanking?: TagPageViewRanking
}
const Page: NextPage<Props> = ({
  circles,
  recommendCircles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  const router = useRouter()
  const { name } = router.query

  return (
    <div>
      <BaseHead title={`${String(name)}の検索結果`} />

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
              <h1 id={ID_LIST.MAIN_HEADING} className="text-2xl py-8">{`${String(name)}の検索結果`}</h1>

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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  res,
}) => {
  if (!params.name || Array.isArray(params.name)) {
    res.statusCode = 404
    return { props: { errorCode: 404 } }
  }

  const { circles, recommendCircles, uuYellArticles, tagPageViewRanking } =
    await searchCircle(params.name)

  return {
    props: {
      circles,
      recommendCircles,
      uuYellArticles,
      tagPageViewRanking,
    },
  }
}

export default Page
