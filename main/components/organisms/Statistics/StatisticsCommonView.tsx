import { Statistics } from '@/lib/types/model/Statistics'
import { FC } from 'react'

type Props = {
  statistics: Statistics
}
const StatisticsCommonView: FC<Props> = ({ statistics }) => {
  return (
    <div className="pb-16">
      {/* 基本情報 */}
      <div>
        <div className="rounded bg-white px-6 py-2 mx-auto mb-2">
          {/* 掲載団体数 */}
          <div className="py-4">
            <p className="text-gray-400 mb-2">掲載団体数</p>
            <p>{statistics.circleCount}</p>
          </div>

          {/* 総アクセス人数 */}
          <div className="py-4 border-t border-gray-400">
            <p className="text-gray-400 mb-2">総アクセス人数</p>
            <p>{statistics.allActiveUsers ? statistics.allActiveUsers.toLocaleString() : `5,000`}</p>
          </div>

          {/* 総PV数 */}
          <div className="py-4 border-t border-gray-400">
            <p className="text-gray-400 mb-2">総PV数</p>
            <p>{statistics.allPageViews ? statistics.allPageViews.toLocaleString() : `180,000`}</p>
          </div>
        </div>

        <div>
          <p className="text-right text-sm py-1">更新日時 2021/4/15</p>
        </div>
      </div>
    </div>
  )
}

export { StatisticsCommonView }
