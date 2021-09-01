import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faTags,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { Circle } from '@/lib/types/model/Circle'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '200px',
  },
}

type DeleteButtonProps = {
  circle: Circle
  onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ circle, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onDelete()
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="連携解除"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当に連携解除しますか？
        </h2>

        <p className="mb-8 text-center">{circle.name}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>削除</RedButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

type Props = {
  circle: Circle
  userId: number
  onDeleteRelation(arg: { circleId: number }): void
}

const CircleListItemTableColumn: FC<{
  title: string
}> = ({ children, title }) => {
  return (
    <div className="pr-2 w-full lg:w-1/6">
      <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
        {title}
      </p>
      <div className="flex justify-center items-center h-7">{children}</div>
    </div>
  )
}
const CircleUserRelationListItem: FC<Props> = ({
  circle,
  userId,
  onDeleteRelation,
}) => {
  const imageLink =
    circle.mainImageUrl || circle.handbillImageUrl || `/images/no-image.png`

  return (
    <div className="flex mb-4 text-white">
      <div className="hidden lg:block">
        <Image
          src={imageLink}
          width="100"
          height="100"
          className="object-contain square-image"
          alt="新歓ビラ"
        />
      </div>

      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="lg:hidden mr-2">
            <Image
              src={imageLink}
              width="100"
              height="100"
              className="object-contain square-image"
              alt="新歓ビラ"
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
          <CircleListItemTableColumn title="ユーザー情報">
            <Link
              href="/circle/[id]/user/[userId]/edit"
              as={`/circle/${circle.id}/user/${userId}/edit`}
            >
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faUser} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="連携解除">
            <DeleteButton
              circle={circle}
              onDelete={() => onDeleteRelation({ circleId: circle.id })}
            />
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { CircleUserRelationListItem }
