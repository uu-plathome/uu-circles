import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { User } from '@/src/lib/types/model/User'

type Props = {
  user: User
  authUser: User
  onResendEmail(email: string): void
}
const AdminUserListItem: FC<Props> = ({ user, authUser, onResendEmail }) => {
  return (
    <div className="mb-4">
      <div className="ml-2 w-full">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-lg font-bold text-gray-300">
            {user.displayName}
          </h2>

          <div className="px-4">
            <Link href="/user/circle/[userId]" as={`/user/circle/${user.id}`}>
              <p className="text-sm text-white underline md:text-base">
                サークルに所属させる→
              </p>
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-wrap">
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-3/12">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              ユーザー名
            </p>
            <div className="flex h-7 items-center justify-center text-white">
              {`@${user.username}`}
            </div>
          </div>
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-3/12">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              権限
            </p>
            <div className="flex h-7 items-center justify-center text-white">
              {__(user.role, 'Role')}
            </div>
          </div>
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-2/12">
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
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-2/12">
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
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-1/12">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              編集
            </p>
            <div className="flex h-7 items-center justify-center">
              <Link
                href="/user/admin/[userId]/edit"
                as={`/user/admin/${user.id}/edit`}
              >
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </Link>
            </div>
          </div>
          <div className="mb-4 w-1/2 pr-2 sm:w-1/3 lg:mb-0 lg:w-1/12">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              削除
            </p>
            <div className="flex h-7 items-center justify-center">
              {authUser && user.id !== authUser.id ? (
                <Link
                  href="/user/admin/[userId]/delete"
                  as={`/user/admin/${user.id}/delete`}
                >
                  <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
                </Link>
              ) : (
                <FontAwesomeIcon size="lg" color="white" icon={faMinus} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AdminUserListItem }
