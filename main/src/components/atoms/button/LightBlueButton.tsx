import { FC } from 'react'

type Props = {
  href?: string
  target?: string
}
const LightBlueButton: FC<Props> = ({ children, href, target }) => {
  return (
    <a
      className="block p-6 text-lg text-center text-white bg-blue-500 rounded hover:shadow-lg hover:opacity-80 focus:outline-none"
      href={href}
      target={target}
    >
      {children}
    </a>
  )
}

export { LightBlueButton }
