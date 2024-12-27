import React from 'react'

type Props = {
  type: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}
const BlueButton: React.FC<Props> = ({ children, onClick, type }) => {
  return (
    <button
      className="min-w-120 ripple inline-block rounded bg-blue-500 py-2 px-6 text-center text-xs font-medium uppercase leading-6 text-white shadow transition hover:opacity-80 hover:shadow-lg focus:outline-none"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export { BlueButton }
