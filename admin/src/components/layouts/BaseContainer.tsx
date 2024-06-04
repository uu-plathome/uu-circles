import React from 'react'

type Props = { children: React.ReactNode }
const BaseContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <div className="mx-auto max-w-screen-lg">{children}</div>
    </div>
  )
}

export { BaseContainer }
