import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useState } from 'react'
import {
  faCheckCircle,
  faTimesCircle,
  faTrash,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { User } from '@/lib/types/model/User'
import Link from 'next/link'
import Modal from 'react-modal'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
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
        <h2 className="text-center text-lg mb-4 font-bold">
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
  onResendEmail(email: string): void
}
const AllUserListItem: FC<Props> = ({ user, onResendEmail }) => {
  return (
    <div>
      <div className="ml-2 w-full mb-4">
        <h2 className="font-bold text-lg text-gray-300 mb-2">
          {user.displayName}
        </h2>

        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              ユーザー名
            </p>
            <div className="flex justify-center h-7 items-center text-white">
              {user.username}
            </div>
          </div>
          <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              有効なアカウント
            </p>
            <div className="flex justify-center h-7 items-center">
              <FontAwesomeIcon
                size="lg"
                color={user.active ? 'green' : 'red'}
                icon={user.active ? faCheckCircle : faTimesCircle}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              認証済みか
            </p>
            <div className="flex justify-center h-7 items-center">
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
          <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              所属サークル
            </p>
            <div className="flex justify-center h-7 items-center">
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
        </div>
      </div>
    </div>
  )
}

export { AllUserListItem }
