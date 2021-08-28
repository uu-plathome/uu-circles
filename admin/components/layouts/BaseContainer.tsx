import { FC } from 'react'

const BaseContainer: FC = ({ children }) => {
  return (
    <div className="container">
      <div className="mx-auto max-w-screen-lg">{children}</div>
    </div>
  )
}

export { BaseContainer }
