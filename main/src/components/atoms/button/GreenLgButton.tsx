import { UrlObject } from 'url'
import Link, { LinkProps } from 'next/link'
import React from 'react'
type Url = string | UrlObject

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  as?: Url
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  href?: LinkProps['href']
}

const GreenLgButton: React.FC<Props> = ({
  children,
  as,
  href,
  onClick,
  type,
}) => {
  if (href) {
    return (
      <div>
        <Link href={href} as={as}>
          <a className="p-4 mx-4 font-bold text-gray-50 bg-green-500 hover:bg-green-700 rounded focus:outline-none shadow hover:shadow-lg">
            {children}
          </a>
        </Link>
      </div>
    )
  } else {
    return (
      <button
        className="p-4 mx-4 font-bold text-gray-50 bg-green-500 hover:bg-green-700 rounded focus:outline-none shadow hover:shadow-lg"
        onClick={onClick}
        type={type ? type : 'button'}
      >
        {children}
      </button>
    )
  }
}

export { GreenLgButton }
