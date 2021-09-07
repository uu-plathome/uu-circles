import Link from 'next/link'
import { FC } from 'react'
import { isManager } from '@/src/lib/enum/api/Role'
import { User } from '@/src/lib/types/model/User'

type Props = {
  circleId: number
  user: User
}
const CircleUserListItem: FC<Props> = ({ circleId, user }) => {
  return (
    <Link
      href="/circle/[circleId]/user/[userId]/edit"
      as={`/circle/${circleId}/user/${user.id}/edit`}
    >
      <a>
        <div
          className="flex justify-between items-center py-2 px-4 mx-auto mb-2 bg-white rounded-lg border border-gray-300"
          style={{ width: 320 }}
        >
          <div className="pr-3 w-full">
            <h3 className="mb-1 font-bold text-black">
              {isManager(user.role) ? '[管理者]' : ''}
              {user.displayName}
            </h3>

            <p className="mb-1 text-sm border-b border-gray-400">
              <span className="pl-1 mb-2 text-xs text-gray-400">
                ユーザー名
              </span>
              <span className="block pb-1 pl-1">@{user.username}</span>
            </p>

            <p className="mb-1 text-sm border-b border-gray-400">
              <span className="pl-1 mb-2 text-xs text-gray-400">メアド</span>
              <span className="block pb-1 pl-1">{user.email}</span>
            </p>
          </div>
          <div>
            <div
              className="flex justify-center items-center text-xs text-white bg-blue-800 rounded-full cursor-pointer"
              style={{ width: 52, height: 52 }}
            >
              編集
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export { CircleUserListItem }
