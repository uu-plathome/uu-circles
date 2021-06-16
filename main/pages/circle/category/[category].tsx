import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { CarouselCircleList } from '@/components/organisms/List/CarouselCircleList'
import { getCircleByCategory } from '@/infra/api/circle'
import { __ } from '@/lang/ja'
import { CategorySlugProperty } from '@/lib/enum/api/CategorySlugProperty'
import { Category } from '@/lib/enum/app/Category'
import { Announcement } from '@/lib/types/model/Announcement'
import { Circle } from '@/lib/types/model/Circle'
import { TagPageViewRanking } from '@/lib/types/model/TagPageViewRanking'
import { categoryToCircleType } from '@/lib/utils/category/Category'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Posts } from 'wp-types'

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
  const router = useRouter()
  const { category } = router.query

  if (!circles) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead
        title={`${__(
          String(categoryToCircleType(category as Category))
        )} カテゴリー検索`}
      />

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
              <h1 className="text-2xl py-8">
                {__(String(categoryToCircleType(category as Category)))}
              </h1>

              <p className="text-base pb-4 font-bold">
                {__(
                  String(categoryToCircleType(category as Category)),
                  'CircleTypeTitle'
                )}
              </p>
              <p className="text-sm pb-8">
                {__(
                  String(categoryToCircleType(category as Category)),
                  'CircleTypeText'
                )}
              </p>

              {/*  サークル一覧 */}
              <BaseCircleList circles={circles} />

              <div className="pb-8">
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
  if (!params.category || Array.isArray(params.category)) {
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
  } = await getCircleByCategory(params.category)

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
  paths: [
    `/circle/category/${CategorySlugProperty.official_organization}`,
    `/circle/category/${CategorySlugProperty.unofficial_organization}`,
    `/circle/category/${CategorySlugProperty.club}`,
    `/circle/category/${CategorySlugProperty.student_group}`,
  ],
  fallback: true,
})

export default Page
