import { FC } from 'react'
import { User } from '@/lib/types/model/User'
import { isManager } from '@/lib/enum/api/Role'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'

type Props = {
  user: User
  /** サークル管理者にする */ onClickManager(userId: number): void
  /** 一般ユーザーにする */ onClickCommon(userId: number): void
}
const CircleUserListItemByImport: FC<Props> = ({
  user,
  /** サークル管理者にする */ onClickManager,
  /** 一般ユーザーにする */ onClickCommon,
}) => {
  return (
    <div
      className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-4 py-2 mx-auto mb-2"
      style={{ width: 320 }}
    >
      <div className="w-full pr-3">
        <h3 className="text-black font-bold mb-1">
          {isManager(user.role) ? '[管理者]' : ''}
          {user.displayName}
        </h3>

        <p className="text-sm border-b border-gray-400 mb-1">
          <span className="text-gray-400 text-xs pl-1 mb-2">ユーザー名</span>
          <span className="block pl-1 pb-1">@{user.username}</span>
        </p>

        <div className="flex justify-center space-x-2">
          <GreenButton onClick={() => onClickCommon(user.id)}>一般</GreenButton>

          <BlueButton
            onClick={() => onClickManager(user.id)}
            type="button"
            rounded
          >
            管理者
          </BlueButton>
        </div>
      </div>
    </div>
  )
}

export { CircleUserListItemByImport }
