import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { WP_REST_API_Posts } from 'wp-types'
import { SearchCircleByCategoryTemplate } from '@/src/components/pages/Circle/Search/SearchCircleByCategoryTemplate'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { getCircleByCategory } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

type Props = {
  errorCode?: number
  /** 検索結果 */ circles?: Circle[]
  /** 他のサークルも見る */ recommendCircles?: Circle[]
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

  if (!circles) {
    return <div></div>
  }

  return <SearchCircleByCategoryTemplate
    circles={circles}
    recommendCircles={recommendCircles}
    uuYellArticles={uuYellArticles}
    announcements={announcements}
    tagPageViewRanking={tagPageViewRanking}
  />
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
