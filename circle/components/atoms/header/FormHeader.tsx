import { FC } from 'react'

type Props = {}
const FormHeader: FC<Props> = ({ children }) => {
  return (
    <h2 className="text-black text-lg text-center mb-4 font-bold py-8">
      {children}
    </h2>
  )
}

export { FormHeader }
