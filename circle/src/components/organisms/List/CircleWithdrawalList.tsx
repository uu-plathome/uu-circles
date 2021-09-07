import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/src/components/atoms/buttons/GrayButton'
import { RedButton } from '@/src/components/atoms/buttons/RedButton'
import { Circle } from '@/src/lib/types/model/Circle'

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

type DeleteButtonProps = {
  circle: Circle
  onWithdrawal(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ circle, onWithdrawal }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onWithdrawal()
  }

  return (
    <div>
      <a
        className="shadow hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="flex justify-center items-center py-6 bg-white rounded border border-gray-200"
          style={{ width: 280 }}
        >
          <p className="font-bold font-lg">{circle.name}</p>
        </div>
      </a>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルを脱退"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当にサークルを脱退しますか？
        </h2>

        <p className="mb-8 text-center">{circle.name}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>脱退</RedButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const CircleWithdrawalListItem: FC<{
  circle: Circle
  onWithdrawal(): void
}> = ({ circle, onWithdrawal }) => {
  return <DeleteButton circle={circle} onWithdrawal={onWithdrawal} />
}

type Props = {
  circles: Circle[]
  onWithdrawal(circleId: number): void
}
const CircleWithdrawalList: FC<Props> = ({ circles, onWithdrawal }) => {
  return (
    <div>
      {circles.map((circle) => {
        return (
          <div
            key={`CircleWithdrawalList-${circle.id}`}
            className="flex justify-center mb-4"
          >
            <CircleWithdrawalListItem
              circle={circle}
              onWithdrawal={() => onWithdrawal(circle.id)}
            />
          </div>
        )
      })}
    </div>
  )
}

export { CircleWithdrawalList }
