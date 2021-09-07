import { UrlObject } from 'url'
import Link, { LinkProps } from 'next/link'
import React from 'react'
type Url = string | UrlObject

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  as?: Url
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: LinkProps['href']
  rounded?: boolean
}

const buttonClassName = `
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
    bg-green-500
    shadow
    ripple
    hover:shadow-lg
    hover:opacity-80
    focus:outline-none
`
const GreenButton: React.FC<Props> = ({
  children,
  as,
  href,
  onClick,
  type,
  rounded,
}) => {
  if (href) {
    return (
      <Link href={href} as={as}>
        <a
          className={buttonClassName + (rounded ? ' rounded-2xl' : ' rounded')}
        >
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button
        className={buttonClassName + (rounded ? ' rounded-2xl' : ' rounded')}
        onClick={onClick}
        type={type ? type : 'button'}
      >
        {children}
      </button>
    )
  }
}

export { GreenButton }
