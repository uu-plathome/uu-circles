import { FC } from 'react'
import Modal from 'react-modal'
import Skeleton from 'react-loading'
import Color from 'colors'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: Color.blue[500],
  },
}
type Props = {
  isOpen: boolean
}
const SubmitLoading: FC<Props> = ({ isOpen }) => {
  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={isOpen}
        appElement={document && (document.getElementById('app') as HTMLElement)}
        contentLabel="Loading..."
      >
        <div>
          <Skeleton
            width="100px"
            height="100px"
            color={Color.blue[600]}
            type="spin"
          />
        </div>
      </Modal>
    </div>
  )
}

export { SubmitLoading }
