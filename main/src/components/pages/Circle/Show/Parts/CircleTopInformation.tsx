import {
  faUserFriends,
  faWallet,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useMemo } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { CircleTypeBadge } from '@/src/components/molecules/Badge/CircleTypeBadge'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { Circle } from '@/src/lib/types/model/Circle'
import colors from '@/src/styles/colors'

/**
 * 週の活動日数の色
 *
 * @param days 週の活動日数
 * @returns
 */
const weeklyActivityDaysColorClass = (days: number) => {
  switch (days) {
    case 0:
    case 1:
      return colors.green[500]
    case 2:
    case 3:
    case 4:
    case 5:
      return colors.blue[400]
    case 6:
      return colors.yellow[500]
    case 7:
      return colors.red[500]
    default:
      return ''
  }
}

type Props = {
  circle: Circle
}
const CircleTopInformation: FC<Props> = ({ circle }) => {
  const pageUrl = useMemo(
    () => `https://uu-circles.com/${circle.slug}`,
    [circle.slug]
  )

  return (
    <div>
      <div className="flex justify-between py-6 px-4 bg-white border-b border-gray-50 md:px-10">
        <div>
          <p className="text-sm">{circle.prefixName}</p>
          <h1 className="text-lg font-bold md:text-2xl">{circle.name}</h1>
        </div>

        <div>
          {/* 団体種類 (公認団体, 非公認団体, 学生団体...) */}
          <CircleTypeBadge circleType={circle.circleType as CircleType} />
        </div>
      </div>

      <div className="justify-between items-center px-4 bg-white md:flex md:px-10">
        {/*最終更新日を表示*/}
        <p className="pt-3 text-gray-500">
          最終更新:{' '}
          {new Date(circle.updatedAt).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      <div className="justify-between items-center px-4 bg-white md:flex md:px-10">
        <div className="flex justify-between py-2 md:justify-start">
          {/* 活動人数 */}
          <div className="md:mr-4">
            <p>
              <FontAwesomeIcon color={colors.gray[600]} icon={faUserFriends} />
              {circle.numberOfMembers === null ? (
                <span className="pl-2">未発表</span>
              ) : (
                <span className="pl-2">{circle.numberOfMembers}人</span>
              )}
            </p>
          </div>
          {/* 週の活動日数 */}
          <div className="md:mr-4">
            <p>
              <FontAwesomeIcon
                color={weeklyActivityDaysColorClass(
                  circle.weeklyActivityDays || 0
                )}
                icon={faWaveSquare}
              />
              <span className={`pl-2`}>週{circle.weeklyActivityDays || 0}</span>
            </p>
          </div>
          {/* 年間費用 */}
          <div className="md:mr-4">
            <p>
              <FontAwesomeIcon color={colors.gray[600]} icon={faWallet} />
              {circle.admissionFeePerYear === null ? (
                <span className="pl-2">未発表</span>
              ) : (
                <span className="pl-2">
                  {Number(circle.admissionFeePerYear).toLocaleString()}円/年
                </span>
              )}
            </p>
          </div>
        </div>

        {/* SNS Share */}
        <div className="flex justify-end items-center py-2">
          <span className="mr-2 text-sm">Share</span>
          <TwitterShareButton
            url={pageUrl}
            title={`UU-Circlesで${circle.shortName || circle.name}を見る！`}
            hashtags={['春から宇大']}
            className="mr-2"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <LineShareButton url={pageUrl} className="mr-2">
            <LineIcon size={40} round />
          </LineShareButton>

          <FacebookShareButton url={pageUrl} hashtag={'春から宇大'}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  )
}

export { CircleTopInformation }
