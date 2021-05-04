import { FC, useEffect } from 'react'

let isLoadwidgets = false

type Props = {
  name: string
  twitterLink: string
}
const TwitterEmbed: FC<Props> = ({ name, twitterLink }) => {
  useEffect(() => {
    if (!isLoadwidgets) {
      const s = document.createElement('script')
      s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
      document.body.appendChild(s)
      isLoadwidgets = true
    }
  }, [])

  return (
    <a
      className="twitter-timeline"
      data-width="100%"
      data-height="500"
      data-theme="dark"
      data-chrome="nofooter"
      href={`${twitterLink}?ref_src=twsrc%5Etfw`}
    >
      A Twitter List by {name}
    </a>
  )
}

export { TwitterEmbed }
