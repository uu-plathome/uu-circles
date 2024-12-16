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
