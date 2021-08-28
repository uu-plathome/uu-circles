import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const FormHeader: FC<Props> = ({ children }) => {
  return <h2 className="mb-4 text-lg font-bold text-white">{children}</h2>
}

export { FormHeader }
