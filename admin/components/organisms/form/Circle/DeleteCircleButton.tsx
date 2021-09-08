import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { Circle } from '@/src/lib/types/model/Circle'

const customStyles = {
  content: {
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

type DeleteConfirmCircleButtonProps = {
  circle: Circle
  onClose(): void
  onDelete(): void
}
export const DeleteConfirmCircleButton: FC<DeleteConfirmCircleButtonProps> = ({
  circle,
  onClose,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onDelete()
  }

  return (
    <div>
      <RedButton onClick={() => setIsOpen(true)}>削除</RedButton>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルを削除"
      >
        <h2 className="mb-4 text-lg font-bold text-center text-red-600">
          え、まじ？本当にいいんだよね？
        </h2>

        <p className="mb-8 text-center">{circle.name}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>削除</RedButton>
          </div>
          <div className="mx-2">
            <GrayButton
              onClick={() => {
                setIsOpen(false)
                onClose()
              }}
            >
              閉じる
            </GrayButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

type Props = {
  circle: Circle
  onDelete(): void
}
export const DeleteCircleButton: FC<Props> = ({ circle, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onDelete()
  }

  return (
    <div>
      <RedButton onClick={() => setIsOpen(true)}>サークルを削除</RedButton>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルを削除"
      >
        <h2 className="mb-4 text-lg font-bold text-center">
          本当にサークルを削除しますか？
        </h2>

        <p className="mb-8 text-center">{circle.name}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <DeleteConfirmCircleButton
              circle={circle}
              onClose={() => setIsOpen(false)}
              onDelete={onClickDeleteButton}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
