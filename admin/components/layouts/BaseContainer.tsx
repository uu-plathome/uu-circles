import { FC } from 'react'

const BaseContainer: FC = ({ children }) => {
  return (
    <div className="container">
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  )
}

export { BaseContainer }
