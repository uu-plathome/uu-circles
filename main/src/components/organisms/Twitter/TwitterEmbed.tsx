import { FC, useEffect } from 'react'

type Props = {
  name: string
  twitterLink: string
}
const TwitterEmbed: FC<Props> = ({ name, twitterLink }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.body.appendChild(script)
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
