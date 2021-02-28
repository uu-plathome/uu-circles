import Link from "next/link"
import { FC } from "react"

type Props = {
    href?: string
    as?: string
}
const WhiteBadge: FC<Props> = ({ children, href, as }) => {
    return (
        <div>
            <Link href={href} as={as}>
                <a>
                    <div className="text-xs md:text-sm border border-gray-200 rounded-2xl bg-white shadow hover:bg-gray-50 py-1 px-2 md:px-4">
                        { children }
                    </div>
                </a>
            </Link>
        </div>
    )
}

export { WhiteBadge }