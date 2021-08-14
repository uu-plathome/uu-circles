import { FC } from 'react'

export const SearchDescription: FC<{
  id: string
  title?: string
  text?: string
}> = ({ id, title, text }) => {
  return (
    <div id={id}>
      {title ? (
        <p id={`${id}_title`} className="pb-4 text-base font-bold">
          {title}
        </p>
      ) : (
        ''
      )}
      {text ? (
        <p id={`${id}_text`} className="pb-8 text-sm">
          {text}
        </p>
      ) : (
        ''
      )}
    </div>
  )
}
