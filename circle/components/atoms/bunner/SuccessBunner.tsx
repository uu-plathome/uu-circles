import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type Props = {
  text: string
}
const SuccessBunner: FC<Props> = ({ text }) => {
  return (
    <div className="p-4 mb-4 border-4 border-green-700 rounded">
      <p className="text-black text-lg">
        <FontAwesomeIcon icon={faCheckCircle} color="green" /> {text}
      </p>
    </div>
  )
}

export { SuccessBunner }
