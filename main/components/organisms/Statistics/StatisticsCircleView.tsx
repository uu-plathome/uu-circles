import { Circle } from '@/lib/types/model/Circle'
import { Statistics } from '@/lib/types/model/Statistics'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import { StatisticsHeader } from './StatisticsHeader'

type StatisticsListItem = {
  rank: 1 | 2 | 3 | 4 | 5
  circle: Circle
  circleKey: keyof Circle
  /** 単位 */
  unit: string
}
const StatisticsListItem: FC<StatisticsListItem> = ({
  circle,
  circleKey,
  rank,
  unit,
}) => {
  const RANK_COLOR = ((rank: 1 | 2 | 3 | 4 | 5) => {
    if (rank === 1) {
      return '#EFC743'
    }

    if (rank === 2) {
      return '#B4B4B4'
    }

    if (rank === 3) {
      return '#5F2B2B'
    }

    return null
  })(rank)

  return (
    <div className="mb-4 flex justify-between md:mr-6">
      <div>
        {[1, 2, 3].includes(rank) ? (
          <span className="mr-4">
            <FontAwesomeIcon
              icon={faCrown}
              className="mr-2"
              color={RANK_COLOR}
            />
            {rank}位
          </span>
        ) : (
          <span className="ml-7 mr-4">{rank}位</span>
        )}

        <span className="font-bold">
          <Link href="/circle/[slug]" as={`/circle/${circle.slug}`} prefetch={false}>
            <a className="hover:underline">{circle.name}</a>
          </Link>
        </span>
      </div>
      <span className="font-bold">
        {typeof circle[circleKey] === 'number'
          ? circle[circleKey].toLocaleString()
          : circle[circleKey]}
        {unit}
      </span>
    </div>
  )
}

type Props = {
  statistics: Statistics
}
const StatisticsCircleView: FC<Props> = ({ statistics }) => {
  return (
    <div>
      {/* 基本情報 */}
      <div className="mb-16">
        <StatisticsHeader>活動人数</StatisticsHeader>

        <div className="rounded bg-white px-6 py-2 mx-auto mb-2">
          {statistics && statistics.numberOfActivitiesRanking ? (
            <div className="pb-4">
              <p className="text-center py-4">活動人数ランキング</p>
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

        <div className="rounded bg-white px-6 py-2 mx-auto mb-16">
          {statistics && statistics.admissionFeePerYearHighRankings ? (
            <div className="pb-4">
              <p className="text-center py-4">活動費用ランキング高い順</p>
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

        <div className="rounded bg-white px-6 py-2 mx-auto mb-16">
          {statistics && statistics.admissionFeePerYearSmallRankings ? (
            <div className="pb-4">
              <p className="text-center py-4">活動費用ランキング低い順</p>
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

        <div className="rounded bg-white px-6 py-2 mx-auto mb-16">
          {statistics && statistics.activityFrequencyRankingDto ? (
            <div className="pb-4">
              <p className="text-center py-4">週の活動頻度ランキング</p>
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
