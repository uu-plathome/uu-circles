import React from 'react'
import { GreenButton } from '../atoms/buttons/GreenButton'
import { BaseSidebar } from './BaseSidebar'

type Props = {
  title: string
  actionHref?: string
  actionAs?: string
  actionText?: string
  children: React.ReactNode
}
const BaseWrapper: React.FC<Props> = ({
  title,
  actionHref,
  actionAs,
  actionText,
  children,
}) => {
  return (
    <main className="flex flex-wrap">
      <div className="w-full md:w-1/3 lg:w-1/5">
        <BaseSidebar />
      </div>

      <div className="w-full md:w-2/3 lg:w-4/5">
        <div className="pt-20 pb-10 md:pt-16 lg:pt-10">
          <div className="mb-8 justify-between md:flex">
            <h1 className="mb-4 text-2xl text-gray-100 md:mb-0">{title}</h1>

            {actionText ? (
              <div className="text-right">
                <GreenButton href={actionHref} as={actionAs}>
                  {actionText}
                </GreenButton>
              </div>
            ) : (
              ''
            )}
          </div>

          <div>{children}</div>
        </div>
      </div>
    </main>
  )
}

export { BaseWrapper }
