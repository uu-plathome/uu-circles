import { BaseHead } from '@/components/layouts/BaseHead'
import { NewjoyTemplate } from '@/components/pages/Newjoy/NewjoyTemplate'
import {
  getDemoTodayCircleNewJoy,
  TodayCircleNewJoy,
} from '@/infra/api/circleNewJoy'
import { Announcement } from '@/lib/types/model/Announcement'
import { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { WP_REST_API_Posts } from 'wp-types'

type Props = {
  errorCode?: number
  futureCircleNewJoys?: TodayCircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: TodayCircleNewJoy[]
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
    <>
      <BaseHead title="今日の新歓 デモ画面" />

      <NewjoyTemplate
        futureCircleNewJoys={futureCircleNewJoys}
        todayCircleNewJoys={todayCircleNewJoys}
        uuYellArticles={uuYellArticles}
        announcements={announcements}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const {
      futureCircleNewJoys,
      todayCircleNewJoys,
      uuYellArticles,
      announcements,
    } = await getDemoTodayCircleNewJoy()

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
    return { props: { errorCode: 500 } }
  }
}

export default Page
