import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { WP_REST_API_Posts } from 'wp-types'
import { SearchCircleByTagTemplate } from '@/src/components/pages/Circle/Search/SearchCircleByTagTemplate'
import { getCircleByTag } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

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
  if (!circles) {
    return <div></div>
  }

  return <SearchCircleByTagTemplate
    circles={circles}
    recommendCircles={recommendCircles}
    uuYellArticles={uuYellArticles}
    announcements={announcements}
    tagPageViewRanking={tagPageViewRanking}
  />
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
