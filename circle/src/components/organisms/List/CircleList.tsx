import Link from 'next/link'
import { FC } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'

const CircleListItem: FC<{
  circle: Circle
}> = ({ circle }) => {
  return (
    <Link href="/circle/[circleId]" as={`/circle/${circle.id}`}>
      <a>
        <div
          className="flex justify-center items-center py-6 bg-white rounded border border-gray-200"
          style={{ width: 280 }}
        >
          <p className="font-bold font-lg">{circle.name}</p>
        </div>
      </a>
    </Link>
  )
}

type Props = {
  circles: Circle[]
}
const CircleList: FC<Props> = ({ circles }) => {
  return (
    <div>
      {circles.map((circle) => {
        return (
          <div
            key={`CircleList-${circle.id}`}
            className="flex justify-center mb-4"
          >
            <CircleListItem circle={circle} />
          </div>
        )
      })}
    </div>
  )
}

export { CircleList }
