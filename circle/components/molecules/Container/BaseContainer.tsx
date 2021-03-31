import { FC } from 'react'

const BaseContainer: FC = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto" style={{ maxWidth: 700 }}>
        {children}
      </div>
    </div>
  )
}

export { BaseContainer }
