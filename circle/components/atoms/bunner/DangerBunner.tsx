import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type Props = {
    text: string
}
const DangerBunner: FC<Props> = ({ text }) => {
    return (
        <div className="p-4 mb-4 border-4 bg-gray-100 border-red-700 rounded">
            <p className="text-red-600 text-sm">
                <FontAwesomeIcon icon={ faExclamationTriangle } color="red" /> { text }
            </p>
        </div>
    )
}

export { DangerBunner }
