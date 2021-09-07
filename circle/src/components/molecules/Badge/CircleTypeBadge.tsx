import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { CircleType } from '@/src/lib/enum/api/CircleType'

const getCircleTypeColor = (circleType: CircleType) => {
  if (circleType === CircleType.OFFICIAL_ORGANIZATION) {
    return 'bg-green-500'
  }

  if (circleType === CircleType.UNOFFICIAL_ORGANIZATION) {
    return 'bg-red-500'
  }

  if (circleType === CircleType.STUDENT_GROUP) {
    return 'bg-blue-400'
  }

  if (circleType === CircleType.SENDING_ORGANIZATION) {
    return 'bg-yellow-500'
  }

  return 'bg-gray-50'
}

const shortCircleType = (circleType: CircleType) => {
  if (circleType === CircleType.OFFICIAL_ORGANIZATION) {
    return '公認'
  }

  if (circleType === CircleType.UNOFFICIAL_ORGANIZATION) {
    return '非認'
  }

  if (circleType === CircleType.STUDENT_GROUP) {
    return '学生'
  }

  if (circleType === CircleType.SENDING_ORGANIZATION) {
    return '届出'
  }

  return '不明'
}

type Props = {
  circleType: CircleType
}
const CircleTypeBadge: FC<Props> = ({ circleType }) => {
  const circleTypeColor = getCircleTypeColor(circleType)

  return (
    <div>
      <p
        className={`
                ${circleTypeColor}
                text-white
                text-sm
                font-bold
                p-1
                rounded-full
                md:rounded-none
                w-12
                h-12
                md:w-auto
                md:h-auto
                md:p-2
                flex
                justify-center
                items-center
            `}
      >
        <span className="hidden md:block">
          {__(circleType, CircleType._type)}
        </span>
        <span className="md:hidden">{shortCircleType(circleType)}</span>
      </p>
    </div>
  )
}

export { CircleTypeBadge }
