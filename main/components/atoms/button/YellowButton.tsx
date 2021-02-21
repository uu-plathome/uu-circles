import Link, { LinkProps } from "next/link";
import React from "react";
import { UrlObject } from 'url';
type Url = string | UrlObject;

type Props = {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    as?: Url
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    href?: LinkProps['href']
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
    hover:bg-yellow-500
    focus:outline-none
`
const YellowButton: React.FC<Props> = ({ children, as, href, onClick, type }) => {

    if (href) {
        return (
            <Link href={href} as={as}>
                <a className={buttonClassName}>
                    { children }
                </a>
            </Link>
        )
    } else {
        return (
            <button
                className={buttonClassName}
                onClick={onClick}
                type={type ? type : 'button'}
            >
                { children }
            </button>
        )
    }
}

export { YellowButton }