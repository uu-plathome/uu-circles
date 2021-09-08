import React from 'react'

type Props = {
  type: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const BlueButton: React.FC<Props> = ({ children, onClick, type }) => {
  return (
    <button
      className="inline-block py-2 px-6 text-xs font-medium leading-6 text-center text-white uppercase bg-blue-500 rounded shadow hover:shadow-lg hover:opacity-80 transition focus:outline-none min-w-120 ripple"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export { BlueButton }
