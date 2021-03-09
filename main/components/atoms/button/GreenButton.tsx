import Link, { LinkProps } from 'next/link'
import React from 'react'
import { UrlObject } from 'url'
type Url = string | UrlObject

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  as?: Url
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: LinkProps['href']
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
    rounded-2xl
    shadow
    ripple
    hover:shadow-lg
    hover:bg-green-600
    focus:outline-none
`
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
        <a className={buttonClassName}>{children}</a>
      </Link>
    )
  } else {
    return (
      <button
        className={buttonClassName}
        onClick={onClick}
        type={type ? type : 'button'}
      >
        {children}
      </button>
    )
  }
}

export { GreenButton }
