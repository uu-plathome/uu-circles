import { GetStaticProps, NextPage } from 'next'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { IndexCircleTemplate } from '@/src/components/pages/Circle/Index/IndexCircleTemplate'
import { getAllCircleList } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

type Props = {
  errorCode?: number
  circles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
const Page: NextPage<Props> = ({
  circles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  return (
    <>
      <BaseHead
        title="サークル一覧"
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
        ]}
        carouselJsonLdData={
          circles
            ? [
                ...circles.map((circle) => ({
                  url: `${baseUuCirclesUrl}/circle/${circle.slug}`,
                })),
              ]
            : []
        }
      />

      <IndexCircleTemplate
        circles={circles ? circles : []}
        uuYellArticles={uuYellArticles}
        announcements={announcements}
        tagPageViewRanking={tagPageViewRanking}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, uuYellArticles, announcements, tagPageViewRanking } =
    await getAllCircleList()

  return {
    props: {
      circles,
      uuYellArticles,
      announcements,
      tagPageViewRanking,
    },
    revalidate: 120,
  }
}

export default Page
