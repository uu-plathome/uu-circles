import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faUserAlt,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  circle: Circle
}

const CircleListItemTableColumn: FC<{
  title: string
}> = ({ children, title }) => {
  return (
    <div className="pr-2 mb-2 w-1/3 lg:w-1/6">
      <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
        {title}
      </p>
      <div className="flex justify-center items-center h-7">{children}</div>
    </div>
  )
}
const CircleListItem: FC<Props> = ({ circle }) => {
  const imageLink =
    circle.mainImageUrl || circle.handbillImageUrl || `/images/no-image.png`
  return (
    <div className="flex mb-4 text-white">
      <div className="hidden lg:block">
        <Image
          src={imageLink}
          alt="サークル画像"
          width="100"
          height="100"
          className="object-contain square-image"
        />
      </div>

      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="lg:hidden mr-2">
            <Image
              src={imageLink}
              alt="サークル画像"
              width="100"
              height="100"
              className="object-contain square-image"
            />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-300">
            {circle.name}
          </h2>
        </div>

        <div className="flex flex-wrap w-full">
          <CircleListItemTableColumn title="公開中">
            <FontAwesomeIcon
              size="lg"
              color={circle.release ? 'green' : 'red'}
              icon={circle.release ? faCheckCircle : faTimesCircle}
            />
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="種別">
            {__(circle.circleType, CircleType._type) || '不明'}
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="編集">
            <Link href="/circle/[id]/edit" as={`/circle/${circle.id}/edit`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="タグ">
            <Link href="/circle/[id]/tag" as={`/circle/${circle.id}/tag`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faTags} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="新歓">
            <Link href="/circle/[id]/newjoy" as={`/circle/${circle.id}/newjoy`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="ユーザー">
            <Link href="/circle/[id]/user" as={`/circle/${circle.id}/user`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faUserAlt} />
              </a>
            </Link>
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { CircleListItem }
