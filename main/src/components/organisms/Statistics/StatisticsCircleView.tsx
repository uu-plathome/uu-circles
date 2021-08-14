import { FC } from 'react'
import { StatisticsHeader } from './StatisticsHeader'
import { StatisticsListItem } from './StatisticsListItem'
import { Statistics } from '@/src/lib/types/model/Statistics'

type Props = {
  statistics: Statistics
}
const StatisticsCircleView: FC<Props> = ({ statistics }) => {
  return (
    <div>
      {/* 基本情報 */}
      <div className="mb-16">
        <StatisticsHeader>活動人数</StatisticsHeader>

        <div className="py-2 px-6 mx-auto mb-2 bg-white rounded">
          {statistics && statistics.numberOfActivitiesRanking ? (
            <div className="pb-4">
              <p className="py-4 text-center">活動人数ランキング</p>
              {statistics.numberOfActivitiesRanking.first ? (
                <StatisticsListItem
                  rank={1}
                  circle={statistics.numberOfActivitiesRanking.first}
                  circleKey="numberOfMembers"
                  unit="人"
                />
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.second ? (
                <StatisticsListItem
                  rank={2}
                  circle={statistics.numberOfActivitiesRanking.second}
                  circleKey="numberOfMembers"
                  unit="人"
                />
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.third ? (
                <StatisticsListItem
                  rank={3}
                  circle={statistics.numberOfActivitiesRanking.third}
                  circleKey="numberOfMembers"
                  unit="人"
                />
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.fourth ? (
                <StatisticsListItem
                  rank={4}
                  circle={statistics.numberOfActivitiesRanking.fourth}
                  circleKey="numberOfMembers"
                  unit="人"
                />
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.fifth ? (
                <StatisticsListItem
                  rank={5}
                  circle={statistics.numberOfActivitiesRanking.fifth}
                  circleKey="numberOfMembers"
                  unit="人"
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div>
        <StatisticsHeader>活動費用ランキング</StatisticsHeader>

        <div className="py-2 px-6 mx-auto mb-16 bg-white rounded">
          {statistics && statistics.admissionFeePerYearHighRankings ? (
            <div className="pb-4">
              <p className="py-4 text-center">活動費用ランキング高い順</p>
              {statistics.admissionFeePerYearHighRankings.first ? (
                <StatisticsListItem
                  rank={1}
                  circle={statistics.admissionFeePerYearHighRankings.first}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.second ? (
                <StatisticsListItem
                  rank={2}
                  circle={statistics.admissionFeePerYearHighRankings.second}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.third ? (
                <StatisticsListItem
                  rank={3}
                  circle={statistics.admissionFeePerYearHighRankings.third}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.fourth ? (
                <StatisticsListItem
                  rank={4}
                  circle={statistics.admissionFeePerYearHighRankings.fourth}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.fifth ? (
                <StatisticsListItem
                  rank={5}
                  circle={statistics.admissionFeePerYearHighRankings.fifth}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="py-2 px-6 mx-auto mb-16 bg-white rounded">
          {statistics && statistics.admissionFeePerYearSmallRankings ? (
            <div className="pb-4">
              <p className="py-4 text-center">活動費用ランキング低い順</p>
              {statistics.admissionFeePerYearSmallRankings.first ? (
                <StatisticsListItem
                  rank={1}
                  circle={statistics.admissionFeePerYearSmallRankings.first}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.second ? (
                <StatisticsListItem
                  rank={2}
                  circle={statistics.admissionFeePerYearSmallRankings.second}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.third ? (
                <StatisticsListItem
                  rank={3}
                  circle={statistics.admissionFeePerYearSmallRankings.third}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.fourth ? (
                <StatisticsListItem
                  rank={4}
                  circle={statistics.admissionFeePerYearSmallRankings.fourth}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.fifth ? (
                <StatisticsListItem
                  rank={5}
                  circle={statistics.admissionFeePerYearSmallRankings.fifth}
                  circleKey="admissionFeePerYear"
                  unit="円/年"
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div>
        <StatisticsHeader>週の活動頻度ランキング</StatisticsHeader>

        <div className="py-2 px-6 mx-auto mb-16 bg-white rounded">
          {statistics && statistics.activityFrequencyRankingDto ? (
            <div className="pb-4">
              <p className="py-4 text-center">週の活動頻度ランキング</p>
              {statistics.activityFrequencyRankingDto.first ? (
                <StatisticsListItem
                  rank={1}
                  circle={statistics.activityFrequencyRankingDto.first}
                  circleKey="weeklyActivityDays"
                  unit="日"
                />
              ) : (
                ''
              )}

              {statistics.activityFrequencyRankingDto.second ? (
                <StatisticsListItem
                  rank={2}
                  circle={statistics.activityFrequencyRankingDto.second}
                  circleKey="weeklyActivityDays"
                  unit="日"
                />
              ) : (
                ''
              )}

              {statistics.activityFrequencyRankingDto.third ? (
                <StatisticsListItem
                  rank={3}
                  circle={statistics.activityFrequencyRankingDto.third}
                  circleKey="weeklyActivityDays"
                  unit="日"
                />
              ) : (
                ''
              )}

              {statistics.activityFrequencyRankingDto.fourth ? (
                <StatisticsListItem
                  rank={4}
                  circle={statistics.activityFrequencyRankingDto.fourth}
                  circleKey="weeklyActivityDays"
                  unit="日"
                />
              ) : (
                ''
              )}

              {statistics.activityFrequencyRankingDto.fifth ? (
                <StatisticsListItem
                  rank={5}
                  circle={statistics.activityFrequencyRankingDto.fifth}
                  circleKey="weeklyActivityDays"
                  unit="日"
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export { StatisticsCircleView }
