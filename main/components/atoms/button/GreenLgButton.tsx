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

const GreenLgButton: React.FC<Props> = ({ children, as, href, onClick, type }) => {

    if (href) {
        return (
            <div>
                <Link href={href} as={as}>
                    <a className="hover:shadow-lg bg-green-500 hover:bg-green-700 shadow text-gray-50 font-bold py-4 px-4 rounded mx-4 focus:outline-none">
                        { children }
                    </a>
                </Link>
            </div>
        )
    } else {
        return (
            <button
                className="hover:shadow-lg bg-green-500 hover:bg-green-700 shadow text-gray-50 font-bold py-4 px-4 rounded mx-4 focus:outline-none"
                onClick={onClick}
                type={type ? type : 'button'}
            >
                { children }
            </button>
        )
    }
}

export { GreenLgButton }