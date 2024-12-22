import { FC } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

export const ShareSns: FC<{
  id: string
  pageUrl: string
}> = ({ id, pageUrl }) => {
  return (
    <div id={id} className="pb-16 md:pb-0">
      <h2 className="pl-1 mb-4 text-lg font-bold md:py-4 md:mb-0 md:text-2xl md:font-normal md:text-center">
        SNSで今日の新歓をShare
      </h2>

      <div className="flex justify-center pb-2 my-2">
        <TwitterShareButton
          url={pageUrl}
          title={`UU-Circlesで今日の新歓を見る！`}
          hashtags={['春から宇大']}
          className="mr-2"
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>

        <LineShareButton url={pageUrl} className="mr-2">
          <LineIcon size={50} round />
        </LineShareButton>

        <FacebookShareButton
          url={pageUrl}
          hashtag={'春から宇大'}
          className="mr-2"
        >
          <FacebookIcon size={50} round />
        </FacebookShareButton>
      </div>
    </div>
  )
}
