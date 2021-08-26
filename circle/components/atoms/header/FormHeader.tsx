import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const FormHeader: FC<Props> = ({ children }) => {
  return (
    <h2 className="py-8 mb-4 text-lg font-bold text-center text-black">
      {children}
    </h2>
  )
}

export { FormHeader }
