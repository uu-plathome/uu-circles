import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'

export type BaseBreadcrumbItem = {
  text: string
  href?: string
  as?: string
  icon?: IconDefinition
  active?: boolean
}

type Props = {
  items: BaseBreadcrumbItem[]
}

const BaseBreadcrumbs: FC<Props> = ({ items }) => {
  const breadcrumbsItems: BaseBreadcrumbItem[] = [
    ...[
      {
        text: 'Home',
        href: '/',
        icon: faHome,
      },
    ],
    ...items,
  ]

  console.log('BaseBreadcrumbs', breadcrumbsItems)

  return (
    <div>
      <div className="px-4 py-2">
        {breadcrumbsItems &&
          breadcrumbsItems.map((item, idx) => {
            return (
              <>
                {!item.href || !item.active ? (
                  <Link
                    key={`BaseBreadcrumbs-${idx}`}
                    href={item.href}
                    as={item.as}
                  >
                    <a>
                      {item.icon ? (
                        <FontAwesomeIcon icon={item.icon} className="mr-1" />
                      ) : (
                        ''
                      )}
                      <span className="text-sm text-blue-600">{item.text}</span>
                      {breadcrumbsItems.length - 1 !== idx ? (
                        <span> / </span>
                      ) : (
                        ''
                      )}
                    </a>
                  </Link>
                ) : (
                  <span key={`BaseBreadcrumbs-${idx}`}>
                    {item.icon ? (
                      <FontAwesomeIcon icon={item.icon} className="mr-1" />
                    ) : (
                      ''
                    )}
                    <span className="text-sm">{item.text}</span>
                    {breadcrumbsItems.length - 1 !== idx ? (
                      <span> / </span>
                    ) : (
                      ''
                    )}
                  </span>
                )}
              </>
            )
          })}
      </div>
    </div>
  )
}

export { BaseBreadcrumbs }
