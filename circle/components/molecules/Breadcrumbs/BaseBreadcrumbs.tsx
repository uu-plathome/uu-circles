import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { BaseContainer } from '../Container/BaseContainer'

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
  const breadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    const _breadcrumbsItems = [
      ...[
        {
          text: 'Home',
          href: '/',
          icon: faHome,
        },
      ],
      ...items,
    ]
    console.log('BaseBreadcrumbs', _breadcrumbsItems)
    return _breadcrumbsItems
  }, [items])

  return (
    <div className="">
      <BaseContainer>
        <div className="border-b border-gray-300 px-4 py-2">
          {breadcrumbsItems &&
            breadcrumbsItems.map((item, idx) => {
              return (
                <div
                  key={`BaseBreadcrumbs-${idx}-${item.href}`}
                  className="inline"
                >
                  {!item.href || !item.active ? (
                    <Link href={item.href} as={item.as}>
                      <a>
                        {item.icon ? (
                          <FontAwesomeIcon icon={item.icon} className="mr-1" />
                        ) : (
                          ''
                        )}
                        <span className="text-sm text-blue-600">
                          {item.text}
                        </span>
                        {breadcrumbsItems.length - 1 !== idx ? (
                          <span> / </span>
                        ) : (
                          ''
                        )}
                      </a>
                    </Link>
                  ) : (
                    <span>
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
                </div>
              )
            })}
        </div>
      </BaseContainer>
    </div>
  )
}

export { BaseBreadcrumbs }
