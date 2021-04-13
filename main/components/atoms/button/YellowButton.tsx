import { UrlObject } from 'url'
import Link, { LinkProps } from 'next/link'
import React, { CSSProperties } from 'react'
type Url = string | UrlObject

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  as?: Url
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: LinkProps['href']
  width?: string | number
}

const buttonClassName = `
    sm:w-30
    inline-block
    px-2
    sm:px-6
    py-1
    sm:py-2
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
`
const YellowButton: React.FC<Props> = ({
  children,
  as,
  href,
  onClick,
  type,
  width,
}) => {
  if (href) {
    return (
      <Link href={href} as={as}>
        <a
          className={buttonClassName}
          style={{
            width: width,
          }}
        >
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button
        className={buttonClassName}
        style={{
          width: width,
        }}
        onClick={onClick}
        type={type ? type : 'button'}
      >
        {children}
      </button>
    )
  }
}

export { YellowButton }
