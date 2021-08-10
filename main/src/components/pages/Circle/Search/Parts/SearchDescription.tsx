import { FC } from "react"

export const SearchDescription: FC<{
  id: string,
  title?: string,
  text?: string,
}> = ({
  id,
  title,
  text,
}) => {
    return (
      <div id={id}>
        {title ? (
          <p id={`${id}_title`} className="text-base pb-4 font-bold">{title}</p>
        ) : (
          ''
        )}
        {text ? (
          <p id={`${id}_text`} className="text-sm pb-8">{text}</p>
        ) : (
          ''
        )}
      </div>
    )
  }
