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
        <div className="flex justify-between items-center">
          <h2 className="mb-2 text-lg font-bold text-gray-300">
            {user.displayName}
          </h2>

          <div className="px-4">
            <Link href="/user/circle/[userId]" as={`/user/circle/${user.id}`}>
              <a className="text-sm md:text-base text-white underline">
                サークルに所属させる→
              </a>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-3/12">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              ユーザー名
            </p>
            <div className="flex justify-center items-center h-7 text-white">
              {`@${user.username}`}
            </div>
          </div>
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-3/12">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              権限
            </p>
            <div className="flex justify-center items-center h-7 text-white">
              {__(user.role, 'Role')}
            </div>
          </div>
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-2/12">
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
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-2/12">
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
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-1/12">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              編集
            </p>
            <div className="flex justify-center items-center h-7">
              <Link
                href="/user/admin/[userId]/edit"
                as={`/user/admin/${user.id}/edit`}
              >
                <a>
                  <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
                </a>
              </Link>
            </div>
          </div>
          <div className="pr-2 mb-4 lg:mb-0 w-1/2 sm:w-1/3 lg:w-1/12">
            <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
              削除
            </p>
            <div className="flex justify-center items-center h-7">
              {authUser && user.id !== authUser.id ? (
                <Link
                  href="/user/admin/[userId]/delete"
                  as={`/user/admin/${user.id}/delete`}
                >
                  <a>
                    <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
                  </a>
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
