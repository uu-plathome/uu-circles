import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { User } from '@/lib/types/model/User'
import Link from 'next/link'

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
      <div className="ml-2 w-full">
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
          <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              編集する
            </p>
            <div className="flex justify-center h-7 items-center">
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
          <div className="w-full lg:w-1/6">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
              削除する
            </p>
            <div className="flex justify-center h-7 items-center">
              <button onClick={() => onDelete(user.id)}>
                <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CircleUserListItem }
