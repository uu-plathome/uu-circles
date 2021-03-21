import { GrayButton } from "@/components/atoms/buttons/GrayButton"
import { RedButton } from "@/components/atoms/buttons/RedButton"
import { Circle } from "@/lib/types/model/Circle"
import { FC, useState } from "react"
import Modal from 'react-modal'

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
      <a className="shadow hover:shadow-md cursor-pointer" onClick={() => setIsOpen(true)}>
        <div
          className="flex justify-center items-center rounded border border-gray-200 bg-white py-6"
          style={{ width: 280 }}
        >
          <p className="font-lg font-bold">{ circle.name }</p>
        </div>
      </a>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルを脱退"
      >
        <h2 className="text-center text-lg mb-4 font-bold">
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
  circle: Circle,
  onWithdrawal(): void
}> = ({ circle, onWithdrawal }) => {
    return (
      <DeleteButton circle={circle} onWithdrawal={onWithdrawal} />
    )
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
              <div key={`CircleWithdrawalList-${circle.id}`} className="mb-4 flex justify-center">
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
