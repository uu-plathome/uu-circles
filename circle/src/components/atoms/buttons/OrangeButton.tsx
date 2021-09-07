import Link from 'next/link'
import React from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: string
}

const OrangeButton: React.FC<Props> = ({ children, href, onClick, type }) => {
  if (href) {
    return (
      <Link href={href}>
        <a
          className={`
            min-w-120
            inline-block
            px-6
            py-2
            text-sm
            font-medium
            leading-6
            text-center
            text-white
            uppercase
            transition
            bg-orange-400
            rounded
            shadow
            ripple
            hover:shadow-lg
            hover:bg-orange-500
            focus:outline-none
        `}
        >
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button
        className={`
    min-w-120
    inline-block
    px-6
    py-2
    text-sm
    font-medium
    leading-6
    text-center
    text-white
    uppercase
    transition
    bg-orange-400
    rounded
    shadow
    ripple
    hover:shadow-lg
    hover:bg-orange-500
    focus:outline-none
`}
        onClick={onClick}
        type={type ? type : 'button'}
      >
        {children}
      </button>
    )
  }
}

export { OrangeButton }
