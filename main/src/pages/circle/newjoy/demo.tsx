import { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { NewjoyTemplate } from '@/src/components/pages/Newjoy/NewjoyTemplate'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'
import {
  getDemoTodayCircleNewJoy,
  TodayCircleNewJoy,
} from '@/src/lib/infra/api/circleNewJoy'
import { Announcement } from '@/src/lib/types/model/Announcement'

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
        isDemo={true}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { futureCircleNewJoys, todayCircleNewJoys, uuYellArticles } =
      await getDemoTodayCircleNewJoy()

    const announcements: Announcement[] = [
      {
        announcementId: 0,
        title: 'これはデモ画面です。正しい新歓ではありません。',
        announcementType: AnnouncementType.UPDATE_FEATURE,
        importance: Importance.MIDDLE,
      },
    ]

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
