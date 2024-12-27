import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type Props = {
  text: string
}
const DangerBunner: FC<Props> = ({ text }) => {
  return (
    <div className="border-red-700 mb-4 rounded border-4 p-4">
      <p className="text-lg text-white">
        <FontAwesomeIcon icon={faExclamationTriangle} color="red" /> {text}
      </p>
    </div>
  )
}

export { DangerBunner }
