import { FC } from 'react'
import { CircleUserListItemByImport } from './CircleUserListItemByImport'
import { User } from '@/lib/types/model/User'

type Props = {
  users: User[]
  /** サークル管理者にする */ onClickManager(userId: number): void
  /** 一般ユーザーにする */ onClickCommon(userId: number): void
}
const IndexCircleUserListByImport: FC<Props> = ({
  users,
  onClickManager,
  onClickCommon,
}) => {
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
                <CircleUserListItemByImport
                  user={user}
                  onClickCommon={onClickCommon}
                  onClickManager={onClickManager}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleUserListByImport }
