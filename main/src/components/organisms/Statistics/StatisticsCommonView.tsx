import { FC } from 'react'
import { StatisticsHeader } from './StatisticsHeader'
import { StatisticsListItem } from './StatisticsListItem'
import { Statistics } from '@/src/lib/types/model/Statistics'
import { dayjs } from '@/src/plugins/Dayjs'

type Props = {
  statistics: Statistics
}
const StatisticsCommonView: FC<Props> = ({ statistics }) => {
  return (
    <div className="pb-16">
      {/* 基本情報 */}
      <div className="mb-16">
        <div className="py-2 px-6 mx-auto mb-2 bg-white rounded">
          {/* 掲載団体数 */}
          <div className="py-4">
            <p className="mb-2 text-gray-400">掲載団体数</p>
            <p>{statistics.circleCount}</p>
          </div>

          {/* 総アクセス人数 */}
          <div className="py-4 border-t border-gray-400">
            <p className="mb-2 text-gray-400">総アクセス人数</p>
            <p>
              {statistics.allActiveUsers
                ? statistics.allActiveUsers.toLocaleString()
                : `5,000`}
            </p>
          </div>

          {/* 総PV数 */}
          <div className="py-4 border-t border-gray-400">
            <p className="mb-2 text-gray-400">総PV数</p>
            <p>
              {statistics.allPageViews
                ? statistics.allPageViews.toLocaleString()
                : `180,000`}
            </p>
          </div>
        </div>

        <div>
          <p className="py-1 text-sm text-right">
            更新日時 {dayjs().format('YYYY/MM/DD')}
          </p>
        </div>
      </div>

      <div className="mb-16">
        <StatisticsHeader>サークルページ閲覧数</StatisticsHeader>

        <div className="py-2 px-6 mx-auto mb-2 bg-white rounded">
          {statistics && statistics.circlePageViewsHighRanking ? (
            <div className="pt-8 pb-4">
              {statistics.circlePageViewsHighRanking.first ? (
                <StatisticsListItem
                  rank={1}
                  circle={statistics.circlePageViewsHighRanking.first}
                  value={
                    statistics.circlePageViewsHighRanking.firstPageView
                      .pageViews
                  }
                  unit="View"
                />
              ) : (
                ''
              )}

              {statistics.circlePageViewsHighRanking.second ? (
                <StatisticsListItem
                  rank={2}
                  circle={statistics.circlePageViewsHighRanking.second}
                  value={
                    statistics.circlePageViewsHighRanking.secondPageView
                      .pageViews
                  }
                  unit="View"
                />
              ) : (
                ''
              )}

              {statistics.circlePageViewsHighRanking.third ? (
                <StatisticsListItem
                  rank={3}
                  circle={statistics.circlePageViewsHighRanking.third}
                  value={
                    statistics.circlePageViewsHighRanking.thirdPageView
                      .pageViews
                  }
                  unit="View"
                />
              ) : (
                ''
              )}

              {statistics.circlePageViewsHighRanking.fourth ? (
                <StatisticsListItem
                  rank={4}
                  circle={statistics.circlePageViewsHighRanking.fourth}
                  value={
                    statistics.circlePageViewsHighRanking.fourthPageView
                      .pageViews
                  }
                  unit="View"
                />
              ) : (
                ''
              )}

              {statistics.circlePageViewsHighRanking.fifth ? (
                <StatisticsListItem
                  rank={5}
                  circle={statistics.circlePageViewsHighRanking.fifth}
                  value={
                    statistics.circlePageViewsHighRanking.fifthPageView
                      .pageViews
                  }
                  unit="View"
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

export { StatisticsCommonView }
