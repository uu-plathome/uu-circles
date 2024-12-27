import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type Props = {
  text: string
}
const SuccessBunner: FC<Props> = ({ text }) => {
  return (
    <div className="mb-4 rounded border-4 border-green-500 p-4">
      <p className="text-lg text-white">
        <FontAwesomeIcon icon={faCheckCircle} color="green" /> {text}
      </p>
    </div>
  )
}

export { SuccessBunner }
