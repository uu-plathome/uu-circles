import { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { StatisticsHeader } from './StatisticsHeader'
import { __ } from '@/src/lang/ja'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { Statistics } from '@/src/lib/types/model/Statistics'
import { rgba } from '@/src/lib/utils/Color'
import colors from '@/src/styles/colors'

type Props = {
  statistics: Statistics
}
const StatisticsOtherView: FC<Props> = ({ statistics }) => {
  return (
    <div>
      <div className="pb-16">
        <StatisticsHeader>サークルの平均活動費用</StatisticsHeader>
        <p className="text-center">
          UU-Circlesに登録されているサークルの平均活動費用は、
          <b className="text-xl">
            {statistics.averageActivityCost.toLocaleString()}
          </b>
          円です！
        </p>
      </div>

      <div className="pb-16">
        <StatisticsHeader>週の活動頻度</StatisticsHeader>

        <div className="flex justify-center">
          <div style={{ width: 300 }}>
            <Doughnut
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
            />
          </div>
        </div>
      </div>

      <div className="pb-16">
        <StatisticsHeader>活動場所</StatisticsHeader>

        <div className="flex justify-center">
          <div style={{ width: 300 }}>
            <Doughnut
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
            />
          </div>
        </div>
      </div>

      <div className="pb-16">
        <StatisticsHeader>オンライン活動状況</StatisticsHeader>

        <div className="flex justify-center">
          <div style={{ width: 300 }}>
            <Doughnut
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
            />
          </div>
        </div>
      </div>

      <div className="pb-16">
        <StatisticsHeader>サークル種別</StatisticsHeader>

        <div className="flex justify-center">
          <div style={{ width: 300 }}>
            <Doughnut
              data={{
                labels: [
                  __(CircleType.OFFICIAL_ORGANIZATION, CircleType._type),
                  __(CircleType.UNOFFICIAL_ORGANIZATION, CircleType._type),
                  __(CircleType.STUDENT_GROUP, CircleType._type),
                  __(CircleType.SENDING_ORGANIZATION, CircleType._type),
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export type { Props }
export { StatisticsOtherView }
