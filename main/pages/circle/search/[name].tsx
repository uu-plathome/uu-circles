import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { CarouselCircleList } from '@/components/organisms/List/CarouselCircleList'
import { searchCircle } from '@/infra/api/circle'
import { Announcement } from '@/lib/types/model/Announcement'
import { Circle } from '@/lib/types/model/Circle'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Post } from 'wp-types'

type Props = {
  errorCode?: number
  circles?: Circle[]
  recommendCircles?: Circle[]
  /** UU-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  circles,
  recommendCircles,
  uuYellArticles,
  announcements,
}) => {
  const router = useRouter()
  const { name } = router.query

  return (
    <div>
      <BaseHead title={`${String(name)}の検索結果`} />

      <BaseLayout announcement={announcements && announcements.length > 0 ? announcements[0] : undefined}>
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar />}>
            <div className="px-5">
              <h1 className="text-2xl py-8">{`${String(name)}の検索結果`}</h1>

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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  res,
}) => {
  if (!params.name || Array.isArray(params.name)) {
    res.statusCode = 404
    return { props: { errorCode: 404 } }
  }

  const { circles, recommendCircles, uuYellArticles } = await searchCircle(
    params.name
  )

  return {
    props: {
      circles,
      recommendCircles,
      uuYellArticles,
    },
  }
}

export default Page
