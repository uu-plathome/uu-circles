import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { useTag } from '@/src/components/pages/Circle/Search/Hooks/useTag'
import { SearchCircleByTagTemplate } from '@/src/components/pages/Circle/Search/SearchCircleByTagTemplate'
import { getCircleByTag } from '@/src/lib/infra/api/circle'
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
  const { tag, tagTranslated, tagDescriptionText, tagDescriptionTitle } =
    useTag()

  if (!circles) {
    return <div></div>
  }

  return (
    <>
      <BaseHead
        title={`${tagTranslated} - タグ検索`}
        description={`${tagDescriptionTitle}。${tagDescriptionText}`}
        breadcrumbJsonLdItemListElements={[
          {
            position: 1,
            name: 'Home',
            item: baseUuCirclesUrl,
          },
          {
            position: 2,
            name: 'サークル一覧',
            item: `${baseUuCirclesUrl}/circle`,
          },
          {
            position: 3,
            name: `${tagTranslated} - タグ検索`,
            item: `${baseUuCirclesUrl}/circle/tag/${tag}`,
          },
        ]}
        carouselJsonLdData={[
          ...circles.map((circle) => ({
            url: `${baseUuCirclesUrl}/circle/${circle.slug}`,
          })),
        ]}
      />

      <SearchCircleByTagTemplate
        circles={circles}
        recommendCircles={recommendCircles}
        uuYellArticles={uuYellArticles}
        announcements={announcements}
        tagPageViewRanking={tagPageViewRanking}
      />
    </>
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
