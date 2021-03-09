import { FC } from 'react'

type Props = {
  href?: string
  target?: string
}
const LightBlueButton: FC<Props> = ({ children, href, target }) => {
  return (
    <a
      className="bg-blue-500 text-white text-lg rounded text-center p-6 hover:shadow-lg hover:opacity-80 focus:outline-none"
      href={href}
      target={target}
    >
      {children}
    </a>
  )
}

export { LightBlueButton }
