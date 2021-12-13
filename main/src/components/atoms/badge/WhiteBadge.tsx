import Link from 'next/link'
import { FC } from 'react'

type Props = {
  href: string
  as?: string
}
const WhiteBadge: FC<Props> = ({ children, href, as }) => {
  return (
    <div>
      <Link href={href} as={as}>
        <a>
          <div className="py-2 px-3 md:px-4 text-xs md:text-sm text-gray-600 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 shadow">
            {children}
          </div>
        </a>
      </Link>
    </div>
  )
}

export { WhiteBadge }
