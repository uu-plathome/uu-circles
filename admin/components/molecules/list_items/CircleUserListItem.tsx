import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { User } from '@/src/lib/types/model/User'

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
  user: User
  onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ user, onDelete }) => {
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
        contentLabel="部員アカウント削除"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当に削除しますか？
        </h2>

        <p className="mb-8 text-center">{user.displayName}</p>

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
  user: User
  circleId: number
  onDelete(circleUser: number): void
  onResendEmail(email: string): void
}
const CircleUserListItem: FC<Props> = ({
  circleId,
  user,
  onDelete,
  onResendEmail,
}) => {
  return (
    <div>
      <div className="mb-4 ml-2 w-full">
        <h2 className="mb-2 text-lg font-bold text-gray-300">
          {user.displayName}
        </h2>

        <div className="flex flex-wrap w-full">
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              ユーザー名
            </p>
            <div className="flex justify-center items-center h-7 text-white">
              {user.username}
            </div>
          </div>
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              有効なアカウント
            </p>
            <div className="flex justify-center items-center h-7">
              <FontAwesomeIcon
                size="lg"
                color={user.active ? 'green' : 'red'}
                icon={user.active ? faCheckCircle : faTimesCircle}
              />
            </div>
          </div>
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              認証済みか
            </p>
            <div className="flex justify-center items-center h-7">
              <div>
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    size="lg"
                    color={user.emailVerifiedAt ? 'green' : 'red'}
                    icon={user.emailVerifiedAt ? faCheckCircle : faTimesCircle}
                  />
                </div>
                {!user.emailVerifiedAt ? (
                  <div className="text-sm text-white">
                    <button onClick={() => onResendEmail(user.email)}>
                      メールの再送信
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              所属サークル
            </p>
            <div className="flex justify-center items-center h-7">
              <Link href="/user/circle/[userId]" as={`/user/circle/${user.id}`}>
                <a>
                  <FontAwesomeIcon
                    size="lg"
                    color="orange"
                    icon={faUserFriends}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              編集する
            </p>
            <div className="flex justify-center items-center h-7">
              <Link
                href="/circle/[id]/user/[userId]/edit"
                as={`/circle/${circleId}/user/${user.id}/edit`}
              >
                <a>
                  <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
                </a>
              </Link>
            </div>
          </div>
          <div className="pr-2 w-full lg:w-1/6">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              削除する
            </p>
            <div className="flex justify-center items-center h-7">
              <DeleteButton user={user} onDelete={() => onDelete(user.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CircleUserListItem }
