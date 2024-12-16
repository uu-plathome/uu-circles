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
                    bg-yellow-300
                    rounded
                    shadow
                    ripple
                    hover:shadow-lg
                    hover:opacity-80
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
                    bg-yellow-300
                    rounded
                    shadow
                    ripple
                    hover:shadow-lg
                    hover:opacity-80
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
