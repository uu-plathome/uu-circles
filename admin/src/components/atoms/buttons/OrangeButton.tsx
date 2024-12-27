import Link from 'next/link'
import React from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: string
  children: React.ReactNode
}

const OrangeButton: React.FC<Props> = ({ children, href, onClick, type }) => {
  if (href) {
    return (
      <Link href={href}>
        <p
          className={`
                    min-w-120
                    ripple
                    inline-block
                    rounded
                    bg-yellow-300
                    px-6
                    py-2
                    text-center
                    text-sm
                    font-medium
                    uppercase
                    leading-6
                    text-white
                    shadow
                    transition
                    hover:opacity-80
                    hover:shadow-lg
                    focus:outline-none
                `}
        >
          {children}
        </p>
      </Link>
    )
  } else {
    return (
      <button
        className={`
                    min-w-120
                    ripple
                    inline-block
                    rounded
                    bg-yellow-300
                    px-6
                    py-2
                    text-center
                    text-sm
                    font-medium
                    uppercase
                    leading-6
                    text-white
                    shadow
                    transition
                    hover:opacity-80
                    hover:shadow-lg
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
