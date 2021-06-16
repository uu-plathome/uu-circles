import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const FormHeader: FC<Props> = ({ children }) => {
  return <h2 className="text-white text-lg mb-4 font-bold">{children}</h2>
}

export { FormHeader }
