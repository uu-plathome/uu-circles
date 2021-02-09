import React from "react";

type Props = {
    type: "button" | "submit" | "reset",
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const BlueButton: React.FC<Props> = ({ children, onClick, type }) => {
    return (
        <button
            className="min-w-120 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
            onClick={onClick}
            type={type}
        >
            { children }
        </button>
    )
}

export { BlueButton }