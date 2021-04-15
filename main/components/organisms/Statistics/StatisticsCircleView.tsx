import { Statistics } from '@/lib/types/model/Statistics'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { StatisticsHeader } from './StatisticsHeader'

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
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#EFC743"
                      />
                      1位
                    </span>
                    <span className="font-bold">
                      {statistics.numberOfActivitiesRanking.first.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {statistics.numberOfActivitiesRanking.first.numberOfMembers}
                    人
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.second ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#B4B4B4"
                      />
                      2位
                    </span>
                    <span className="font-bold">
                      {statistics.numberOfActivitiesRanking.second.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.numberOfActivitiesRanking.second
                        .numberOfMembers
                    }
                    人
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.third ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#5F2B2B"
                      />
                      3位
                    </span>
                    <span className="font-bold">
                      {statistics.numberOfActivitiesRanking.third.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {statistics.numberOfActivitiesRanking.third.numberOfMembers}
                    人
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.fourth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">4位</span>
                    <span className="font-bold">
                      {statistics.numberOfActivitiesRanking.fourth.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {
                      statistics.numberOfActivitiesRanking.fourth
                        .numberOfMembers
                    }
                    人
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.numberOfActivitiesRanking.fifth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">5位</span>
                    <span className="font-bold">
                      {statistics.numberOfActivitiesRanking.fifth.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {statistics.numberOfActivitiesRanking.fifth.numberOfMembers}
                    人
                  </span>
                </div>
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
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#EFC743"
                      />
                      1位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearHighRankings.first.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearHighRankings.first
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.second ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#B4B4B4"
                      />
                      2位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearHighRankings.second.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearHighRankings.second
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.third ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#5F2B2B"
                      />
                      3位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearHighRankings.third.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearHighRankings.third
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.fourth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">4位</span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearHighRankings.fourth.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearHighRankings.fourth
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearHighRankings.fifth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">5位</span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearHighRankings.fifth.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearHighRankings.fifth
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
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
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#EFC743"
                      />
                      1位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearSmallRankings.first.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearSmallRankings.first
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.second ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#B4B4B4"
                      />
                      2位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearSmallRankings.second.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearSmallRankings.second
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.third ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="mr-2"
                        color="#5F2B2B"
                      />
                      3位
                    </span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearSmallRankings.third.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearSmallRankings.third
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.fourth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">4位</span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearSmallRankings.fourth.name}
                    </span>
                  </div>
                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearSmallRankings.fourth
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
              ) : (
                ''
              )}

              {statistics.admissionFeePerYearSmallRankings.fifth ? (
                <div className="mb-4 flex justify-between mr-6">
                  <div>
                    <span className="ml-7 mr-4">5位</span>
                    <span className="font-bold">
                      {statistics.admissionFeePerYearSmallRankings.fifth.name}
                    </span>
                  </div>

                  <span className="font-bold">
                    {
                      statistics.admissionFeePerYearSmallRankings.fifth
                        .admissionFeePerYear
                    }
                    円/年
                  </span>
                </div>
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
