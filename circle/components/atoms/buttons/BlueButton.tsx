import React from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  rounded?: boolean
}
const BlueButton: React.FC<Props> = ({
  children,
  onClick,
  type = 'button',
  rounded,
}) => {
  return (
    <button
      className={
        'min-w-120 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-800 shadow ripple hover:shadow-lg hover:opacity-80 focus:outline-none' +
        (rounded ? ' rounded-2xl' : ' rounded')
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export { BlueButton }
