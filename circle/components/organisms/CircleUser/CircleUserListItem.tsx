import { FC } from 'react'
import Link from 'next/link'
import { User } from '@/lib/types/model/User'

type Props = {
  circleId: number
  user: User
}
const CircleUserListItem: FC<Props> = ({ circleId, user }) => {
  return (
    <Link
      href="/circle/[circleId]/user/"
      as={`/circle/${circleId}/user`}
    >
      <a>
        <div
          className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-4 py-2 mx-auto mb-2"
          style={{ width: 320 }}
        >
          <div className="w-full pr-3">
            <h3 className="text-black font-bold mb-1">{user.displayName}</h3>

            <p className="text-sm border-b border-gray-400 mb-1">
              <span className="text-gray-400 text-xs pl-1 mb-2">ユーザー名</span>
              <span className="block pl-1 pb-1">
                @{user.username}
              </span>
            </p>

            <p className="text-sm border-b border-gray-400 mb-1">
              <span className="text-gray-400 text-xs pl-1 mb-2">メアド</span>
              <span className="block pl-1 pb-1">
                {user.email}
              </span>
            </p>
          </div>
          <div>
            <div
              className="text-white bg-blue-800 rounded-full text-xs flex items-center justify-center cursor-pointer"
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
