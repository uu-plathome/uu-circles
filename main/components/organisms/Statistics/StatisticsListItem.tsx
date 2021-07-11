import { Circle } from '@/lib/types/model/Circle'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'

type StatisticsListItem = {
  rank: 1 | 2 | 3 | 4 | 5
  circle: Circle
  // key
  circleKey?: keyof Circle
  // 値
  value?: string | number
  /** 単位 */
  unit: string
}
const StatisticsListItem: FC<StatisticsListItem> = ({
  circle,
  circleKey,
  value,
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
          <Link
            href="/circle/[slug]"
            as={`/circle/${circle.slug}`}
            prefetch={false}
          >
            <a className="hover:underline">{circle.name}</a>
          </Link>
        </span>
      </div>
      <span className="font-bold">
        {circleKey
          ? typeof circle[circleKey] === 'number'
            ? circle[circleKey].toLocaleString()
            : circle[circleKey]
          : ''}
        {value
          ? typeof value === 'number'
            ? value.toLocaleString()
            : value
          : ''}

        {unit}
      </span>
    </div>
  )
}

export { StatisticsListItem }
