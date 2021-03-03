import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import Image from 'next/image'
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faUserAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { __ } from '@/lang/ja'
import { Circle } from '@/lib/types/model/Circle'

type Props = {
  circle: Circle
  userId: number
  onDeleteRelation(circleId: number): void
}

const CircleListItemTableColumn: FC<{
  title: string
}> = ({ children, title }) => {
  return (
    <div className="w-full lg:w-1/6 pr-2">
      <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
        {title}
      </p>
      <div className="flex justify-center h-7 items-center">{children}</div>
    </div>
  )
}
const CircleUserRelationListItem: FC<Props> = ({
  circle,
  userId,
  onDeleteRelation,
}) => {
  return (
    <div className="text-white flex">
      <div className="ml-2 w-full">
        <h2 className="font-bold text-lg text-gray-300 mb-2">{circle.name}</h2>

        <div className="flex flex-wrap w-full">
          <CircleListItemTableColumn title="種別">
            {__(circle.circleType) || '不明'}
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="連携解除">
            <button onClick={() => onDeleteRelation(userId)}>
              <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
            </button>
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { CircleUserRelationListItem }
