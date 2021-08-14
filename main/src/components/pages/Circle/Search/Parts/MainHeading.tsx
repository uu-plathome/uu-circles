import { FC } from 'react'

export const MainHeading: FC<{
  id: string
}> = ({ children, id }) => {
  return (
    <h1 id={id} className="py-8 text-2xl">
      {children}
    </h1>
  )
}
