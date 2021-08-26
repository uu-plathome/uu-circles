import { FC } from 'react'
import { CircleUserListItem } from './CircleUserListItem'
import { User } from '@/lib/types/model/User'

type Props = {
  circleId: number
  users: User[]
}
const IndexCircleUserList: FC<Props> = ({ circleId, users }) => {
  return (
    <div className="bg-gray-50">
      <div className="md:flex justify-center flex-wrap">
        {users &&
          users.map((user, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            return (
              <div key={user.id} className={`md:px-4 ${className}`}>
                <CircleUserListItem circleId={circleId} user={user} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleUserList }
