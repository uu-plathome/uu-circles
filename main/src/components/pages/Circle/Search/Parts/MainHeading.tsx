import { FC } from 'react'

export const MainHeading: FC<{
  id: string
}> = ({ children, id }) => {
  return (
    <h1 id={id} className="text-2xl py-8">
      {children}
    </h1>
  )
}
