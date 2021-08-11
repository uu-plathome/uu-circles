import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Posts } from 'wp-types'
import { SearchCircleByFreeWordTemplate } from '@/src/components/pages/Circle/Search/SearchCircleByFreeWordTemplate'
import { searchCircle } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

type Props = {
  errorCode?: number
  /** 検索結果 */ circles?: Circle[]
  /** 他のサークルも見る */ recommendCircles?: Circle[]
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
    <SearchCircleByFreeWordTemplate
      searchWord={String(name)}
      circles={circles}
      recommendCircles={recommendCircles}
      uuYellArticles={uuYellArticles}
      announcements={announcements}
      tagPageViewRanking={tagPageViewRanking}
    />
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

  const {
    circles,
    recommendCircles,
    uuYellArticles,
    tagPageViewRanking,
    announcements,
  } = await searchCircle(params.name)

  return {
    props: {
      circles,
      recommendCircles,
      uuYellArticles,
      tagPageViewRanking,
      announcements,
    },
  }
}

export default Page
