import {
  faCheckCircle,
  faTimesCircle,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import { User } from '@/src/lib/types/model/User'

type Props = {
  user: User
  onResendEmail(email: string): void
}
const AllUserListItem: FC<Props> = ({ user, onResendEmail }) => {
  return (
    <div>
      <div className="mb-4 ml-2 w-full">
        <h2 className="mb-2 text-lg font-bold text-gray-300">
          {user.displayName}
        </h2>

        <div className="flex w-full flex-wrap">
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              ユーザー名
            </p>
            <div className="flex h-7 items-center justify-center text-white">
              {user.username}
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              有効なアカウント
            </p>
            <div className="flex h-7 items-center justify-center">
              <FontAwesomeIcon
                size="lg"
                color={user.active ? 'green' : 'red'}
                icon={user.active ? faCheckCircle : faTimesCircle}
              />
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              認証済みか
            </p>
            <div className="flex h-7 items-center justify-center">
              <div>
                <div className="flex items-center justify-center">
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
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              所属サークル
            </p>
            <div className="flex h-7 items-center justify-center">
              <Link href="/user/circle/[userId]" as={`/user/circle/${user.id}`}>
                <FontAwesomeIcon
                  size="lg"
                  color="orange"
                  icon={faUserFriends}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AllUserListItem }
