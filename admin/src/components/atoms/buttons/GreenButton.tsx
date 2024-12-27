import { UrlObject } from 'url'
import Link, { LinkProps } from 'next/link'
import React from 'react'
type Url = string | UrlObject

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  as?: Url
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: LinkProps['href']
  children: React.ReactNode
}

const GreenButton: React.FC<Props> = ({
  children,
  as,
  href,
  onClick,
  type,
}) => {
  if (href) {
    return (
      <Link href={href} as={as}>
        <p
          className={`
                    min-w-120
                    ripple
                    inline-block
                    rounded
                    bg-green-600
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
                    bg-green-600
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

export { GreenButton }
