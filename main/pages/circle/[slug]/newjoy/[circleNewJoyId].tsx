import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import Error from 'next/error'
import { PageNotFoundError } from '@/infra/api/error'
import { ShowCircleNewJoyPcLayout } from '@/components/organisms/CircleNewJoy/ShowCircleNewJoyPcLayout'
import { ShowCircleNewJoySpLayout } from '@/components/organisms/CircleNewJoy/ShowCircleNewJoySpLayout'
import { showCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'

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
}
const Page: NextPage<Props> = ({
  errorCode,
  circle,
  circleNewJoy,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${circleNewJoy.title}の新歓イベント日程詳細`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl pl-4 py-8 md:py-20 md:text-center text-left">
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
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.slug || Array.isArray(params.slug)) {
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
      },
      revalidate: 120,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
