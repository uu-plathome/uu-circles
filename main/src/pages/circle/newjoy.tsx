import { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { IndexTodayCircleNewJoyTemplate } from '@/src/components/pages/CircleNewJoy/Today/IndexTodayCircleNewJoyTemplate'
import {
  getTodayCircleNewJoy,
  TodayCircleNewJoy,
} from '@/src/lib/infra/api/circleNewJoy'
import { Announcement } from '@/src/lib/types/model/Announcement'

type Props = {
  errorCode?: number
  /** 今日の新歓 */ todayCircleNewJoys?: TodayCircleNewJoy[]
  /** 未来の新歓 */ futureCircleNewJoys?: TodayCircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  errorCode,
  futureCircleNewJoys,
  todayCircleNewJoys,
  uuYellArticles,
  announcements,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div>
      <BaseHead title="今日の新歓" />

      <IndexTodayCircleNewJoyTemplate
        futureCircleNewJoys={futureCircleNewJoys}
        todayCircleNewJoys={todayCircleNewJoys}
        uuYellArticles={uuYellArticles}
        announcements={announcements}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const {
      futureCircleNewJoys,
      todayCircleNewJoys,
      uuYellArticles,
      announcements,
    } = await getTodayCircleNewJoy()

    return {
      props: {
        futureCircleNewJoys,
        todayCircleNewJoys,
        uuYellArticles,
        announcements,
      },
      revalidate: 180,
    }
  } catch (e) {
    console.error(e)
    return { props: { errorCode: 500 } }
  }
}

export default Page
