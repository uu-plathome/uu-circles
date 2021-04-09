import colors from '@/colors'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { getStatistics } from '@/infra/api/statistics'
import { __ } from '@/lang/ja'
import { CircleType } from '@/lib/enum/api/CircleType'
import { Statistics } from '@/lib/types/model/Statistics'
import { rgba } from '@/lib/utils/Color'
import { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'

const SubHeader: FC = ({ children }) => {
  return <h2 className="text-xl font-bold md:text-center mb-4">{children}</h2>
}

type Props = {
  statistics: Statistics
}
const Page: NextPage<Props> = ({ statistics }) => {
  return (
    <div>
      <BaseHead title="統計情報" />

      <BaseLayout>
        <div className="bg-gray-100">
          <BaseContainer>
            <div className="px-4">
              <h1 className="text-2xl py-8 md:py-20 md:text-center text-left">
                統計情報
              </h1>

              <div className="pb-16">
                <SubHeader>サークル数</SubHeader>
                <p className="text-center">
                  UU-Circlesには、
                  <b className="text-xl">{statistics.circleCount}</b>
                  団体が登録されています！
                </p>
              </div>

              <div className="pb-16">
                <SubHeader>サークルの平均活動費用</SubHeader>
                <p className="text-center">
                  UU-Circlesに登録されているサークルの平均活動費用は、
                  <b className="text-xl">
                    {statistics.averageActivityCost.toLocaleString()}
                  </b>
                  円です！
                </p>
              </div>

              <div className="pb-16">
                <SubHeader>週の活動頻度</SubHeader>
                <Doughnut
                  width={300}
                  data={{
                    labels: [
                      '週0',
                      '週1',
                      '週2',
                      '週3',
                      '週4',
                      '週5',
                      '週6',
                      '週7',
                    ],
                    datasets: [
                      {
                        label: '週の活動頻度',
                        data: [
                          statistics.activityFrequency.zero,
                          statistics.activityFrequency.one,
                          statistics.activityFrequency.two,
                          statistics.activityFrequency.three,
                          statistics.activityFrequency.four,
                          statistics.activityFrequency.five,
                          statistics.activityFrequency.six,
                          statistics.activityFrequency.seven,
                        ],
                        backgroundColor: [
                          colors.white,
                          rgba(colors.gray[300], 0.5),
                          rgba(colors.gray[600], 0.5),
                          rgba(colors.blue[800], 0.5),
                          rgba(colors.green[700], 0.5),
                          rgba(colors.orange[400], 0.5),
                          rgba(colors.red[400], 0.5),
                          rgba(colors.red[600], 0.5),
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>

              <div className="pb-16">
                <SubHeader>活動場所</SubHeader>
                <Doughnut
                  width={300}
                  data={{
                    labels: ['峰', '陽東', 'その他'],
                    datasets: [
                      {
                        label: '活動場所',
                        data: [
                          statistics.placeOfActivityFrequency.mine,
                          statistics.placeOfActivityFrequency.yoto,
                          statistics.placeOfActivityFrequency.other,
                        ],
                        backgroundColor: [
                          rgba(colors.orange[400], 0.5),
                          rgba(colors.green[700], 0.5),
                          rgba(colors.gray[300], 0.5),
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>

              <div className="pb-16">
                <SubHeader>オンライン活動状況</SubHeader>
                <Doughnut
                  width={300}
                  data={{
                    labels: ['オンライン活動あり', 'オフライン活動のみ'],
                    datasets: [
                      {
                        label: '活動場所',
                        data: [
                          statistics.onlineActivityActivity.doOnlineCount,
                          statistics.onlineActivityActivity.onlyOnlineCount,
                        ],
                        backgroundColor: [
                          rgba(colors.blue[600], 0.5),
                          colors.white,
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>

              <div className="pb-16">
                <SubHeader>サークル種別</SubHeader>
                <Doughnut
                  width={300}
                  data={{
                    labels: [
                      __(CircleType.OFFICIAL_ORGANIZATION),
                      __(CircleType.UNOFFICIAL_ORGANIZATION),
                      __(CircleType.STUDENT_GROUP),
                      __(CircleType.SENDING_ORGANIZATION),
                    ],
                    datasets: [
                      {
                        label: 'サークル種別',
                        data: [
                          statistics.circleType.officialOrganization,
                          statistics.circleType.unofficialOrganization,
                          statistics.circleType.studentGroup,
                          statistics.circleType.sendingOrganization,
                        ],
                        backgroundColor: [
                          rgba(colors.green[500], 0.6),
                          rgba(colors.red[500], 0.6),
                          rgba(colors.blue[400], 0.6),
                          rgba(colors.yellow[500], 0.6),
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const statistics = await getStatistics()

  return {
    props: {
      statistics,
    },
    revalidate: 60 * 60,
  }
}

export default Page
