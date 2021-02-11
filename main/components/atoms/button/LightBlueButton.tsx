import { FC } from "react";

type Props = {

}
const LightBlueButton: FC = ({ children }) => {
    return (
        <div className="bg-blue-300 text-white text-lg rounded text-white text-center p-6">
            { children }
        </div>
    )
}

export { LightBlueButton }