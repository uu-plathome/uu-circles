import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { StatisticsButtonGroup } from '@/components/organisms/Statistics/StatisticsButtonGroup'
import { StatisticsButtonState } from '@/components/organisms/Statistics/StatisticsButtonState'
import { StatisticsCircleView } from '@/components/organisms/Statistics/StatisticsCircleView'
import { StatisticsCommonView } from '@/components/organisms/Statistics/StatisticsCommonView'
import { StatisticsOtherView } from '@/components/organisms/Statistics/StatisticsOtherView'
import { getStatistics } from '@/infra/api/statistics'
import { Announcement } from '@/lib/types/model/Announcement'
import { Statistics } from '@/lib/types/model/Statistics'
import { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import { WP_REST_API_Posts } from 'wp-types'

type Props = {
  statistics?: Statistics
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  statistics,
  uuYellArticles,
  announcements,
}) => {
  const [buttonState, setButtonState] = useState<StatisticsButtonState>(
    StatisticsButtonState.COMMON
  )

  return (
    <div>
      <BaseHead title="統計情報" />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100 pb-16">
          <BaseContainer>
            <div className="px-4">
              <h1 className="text-2xl py-8 md:py-20 md:text-center text-left">
                統計情報
              </h1>

              <StatisticsButtonGroup
                buttonState={buttonState}
                setButtonState={setButtonState}
              />

              <div
                className={`${
                  buttonState === StatisticsButtonState.COMMON ? '' : 'hidden'
                }`}
              >
                <StatisticsCommonView statistics={statistics} />
              </div>

              <div
                className={`${
                  buttonState === StatisticsButtonState.CIRCLE ? '' : 'hidden'
                }`}
              >
                <StatisticsCircleView statistics={statistics} />
              </div>

              {buttonState === StatisticsButtonState.OTHER ? (
                <StatisticsOtherView statistics={statistics} />
              ) : (
                ''
              )}
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { statistics, uuYellArticles, announcements } = await getStatistics()

  return {
    props: {
      statistics,
      uuYellArticles,
      announcements,
    },
    revalidate: 60 * 60,
  }
}

export default Page
