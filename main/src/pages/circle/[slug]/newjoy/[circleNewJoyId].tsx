import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Error from 'next/error'
import { WP_REST_API_Posts } from 'wp-types'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { ShowCircleNewJoyPcLayout } from '@/src/components/pages/CircleNewJoy/Show/Parts/ShowCircleNewJoyPcLayout'
import { ShowCircleNewJoySpLayout } from '@/src/components/pages/CircleNewJoy/Show/Parts/ShowCircleNewJoySpLayout'
import { showCircleNewJoyBySlug } from '@/src/lib/infra/api/circleNewJoy'
import { PageNotFoundError } from '@/src/lib/infra/api/error'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

type Props = {
  errorCode?: number
  /** サークル */ circle?: Circle
  /** 新歓詳細 */ circleNewJoy?: CircleNewJoy
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  errorCode,
  circle,
  circleNewJoy,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
  uuYellArticles,
  announcements,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle || !circleNewJoy) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead
        title={`${circleNewJoy.title}の新歓イベント日程詳細`}
        description={circleNewJoy.description}
      />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100">
          <BaseContainer>
            <h1 className="py-8 pl-4 text-2xl text-left md:py-20 md:text-center">
              新歓イベント日程詳細
            </h1>

            {/* PC */}
            <div className="hidden md:block">
              <ShowCircleNewJoyPcLayout
                circle={circle}
                circleNewJoy={circleNewJoy}
                pastCircleNewJoys={pastCircleNewJoys}
                futureCircleNewJoys={futureCircleNewJoys}
                nowCircleNewJoys={nowCircleNewJoys}
                todayCircleNewJoys={todayCircleNewJoys}
              />
            </div>

            {/* SP */}
            <div className="md:hidden">
              <ShowCircleNewJoySpLayout
                circle={circle}
                circleNewJoy={circleNewJoy}
                pastCircleNewJoys={pastCircleNewJoys}
                futureCircleNewJoys={futureCircleNewJoys}
                nowCircleNewJoys={nowCircleNewJoys}
                todayCircleNewJoys={todayCircleNewJoys}
              />
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || !params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
  }

  try {
    const {
      circle,
      circleNewJoy,
      pastCircleNewJoys,
      futureCircleNewJoys,
      nowCircleNewJoys,
      todayCircleNewJoys,
      allTodayCircleNewJoys,
      uuYellArticles,
      announcements,
    } = await showCircleNewJoyBySlug(params.slug, Number(params.circleNewJoyId))

    return {
      props: {
        circle,
        circleNewJoy,
        pastCircleNewJoys,
        futureCircleNewJoys,
        nowCircleNewJoys,
        todayCircleNewJoys,
        allTodayCircleNewJoys,
        uuYellArticles,
        announcements,
      },
      revalidate: 120,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    console.error(e)
    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
