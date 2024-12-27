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
  children: React.ReactNode
}> = ({ children, title }) => {
  return (
    <div className="mb-2 w-1/3 pr-2 lg:w-1/6">
      <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
        {title}
      </p>
      <div className="flex h-7 items-center justify-center">{children}</div>
    </div>
  )
}
const CircleListItem: FC<Props> = ({ circle }) => {
  const imageLink =
    circle.mainImageUrl || circle.handbillImageUrl || `/images/no-image.png`
  return (
    <div className="mb-4 flex text-white">
      <div className="hidden lg:block">
        <Image
          src={imageLink}
          alt="サークル画像"
          width="100"
          height="100"
          className="square-image object-contain"
        />
      </div>

      <div className="ml-2 w-full">
        <div className="mb-4 flex items-center lg:mb-0">
          <div className="mr-2 lg:hidden">
            <Image
              src={imageLink}
              alt="サークル画像"
              width="100"
              height="100"
              className="square-image object-contain"
            />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-300">
            {circle.name}
          </h2>
        </div>

        <div className="flex w-full flex-wrap">
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
              <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="タグ">
            <Link href="/circle/[id]/tag" as={`/circle/${circle.id}/tag`}>
              <FontAwesomeIcon size="lg" color="orange" icon={faTags} />
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="新歓">
            <Link href="/circle/[id]/newjoy" as={`/circle/${circle.id}/newjoy`}>
              <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="ユーザー">
            <Link href="/circle/[id]/user" as={`/circle/${circle.id}/user`}>
              <FontAwesomeIcon size="lg" color="orange" icon={faUserAlt} />
            </Link>
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { CircleListItem }
