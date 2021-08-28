import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type Props = {
  text: string
}
const DangerBunner: FC<Props> = ({ text }) => {
  return (
    <div className="p-4 mb-4 rounded border-4 border-red-700">
      <p className="text-lg text-white">
        <FontAwesomeIcon icon={faExclamationTriangle} color="red" /> {text}
      </p>
    </div>
  )
}

export { DangerBunner }
