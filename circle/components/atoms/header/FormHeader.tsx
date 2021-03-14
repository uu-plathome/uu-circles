import { FC } from 'react'

type Props = {}
const FormHeader: FC<Props> = ({ children }) => {
  return <h2 className="text-black text-lg mb-4 font-bold">{children}</h2>
}

export { FormHeader }
