import { FC, useState } from 'react'
import Modal from 'react-modal'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { isManager } from '@/lib/enum/api/Role'
import { User } from '@/lib/types/model/User'

const customStyles = {
  content: {
    padding: '20px 12px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '200px',
  },
}

type ManagerButtonProps = {
  user: User
  onClickManager(): void
}
const ManagerButton: FC<ManagerButtonProps> = ({ user, onClickManager }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickManagerButton = () => {
    setIsOpen(false)
    onClickManager()
  }

  return (
    <div>
      <BlueButton onClick={() => setIsOpen(true)} rounded>
        管理者
      </BlueButton>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルに招待する"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当にサークルに招待しますか？
        </h2>

        <p className="mb-8 text-center">{user.displayName}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <BlueButton onClick={onClickManagerButton}>招待</BlueButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

type CommonButtonProps = {
  user: User
  onClickCommon(): void
}
const CommonButton: FC<CommonButtonProps> = ({ user, onClickCommon }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickCommonButton = () => {
    setIsOpen(false)
    onClickCommon()
  }

  return (
    <div>
      <GreenButton onClick={() => setIsOpen(true)} rounded>
        一般
      </GreenButton>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルに招待する"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当にサークルに招待しますか？
        </h2>

        <p className="mb-8 text-center">{user.displayName}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <GreenButton onClick={onClickCommonButton}>招待</GreenButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

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
      className="flex justify-between items-center py-2 px-4 mx-auto mb-2 bg-white rounded-lg border border-gray-300"
      style={{ width: 320 }}
    >
      <div className="pr-3 w-full">
        <h3 className="mb-1 font-bold text-black">
          {isManager(user.role) ? '[管理者]' : ''}
          {user.displayName}
        </h3>

        <p className="mb-1 text-sm border-b border-gray-400">
          <span className="pl-1 mb-2 text-xs text-gray-400">ユーザー名</span>
          <span className="block pb-1 pl-1">@{user.username}</span>
        </p>

        <div className="flex justify-center py-2 space-x-2">
          <CommonButton
            user={user}
            onClickCommon={() => onClickCommon(user.id)}
          />

          <ManagerButton
            user={user}
            onClickManager={() => onClickManager(user.id)}
          />
        </div>
      </div>
    </div>
  )
}

export { CircleUserListItemByImport }
