import Link from 'next/link'
import { FC } from 'react'

type Props = {
  href?: string
  as?: string
}
const WhiteBadge: FC<Props> = ({ children, href, as }) => {
  return (
    <div>
      <Link href={href} as={as}>
        <a>
          <div className="text-gray-600 text-xs md:text-sm border border-gray-200 rounded-2xl bg-white shadow hover:bg-gray-50 py-2 px-3 md:px-4">
            {children}
          </div>
        </a>
      </Link>
    </div>
  )
}

export { WhiteBadge }
