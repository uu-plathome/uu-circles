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
      <h2 className="font-bold md:font-normal text-lg md:text-2xl pl-1 mb-4 md:mb-0 md:py-4 md:text-center">
        SNSで今日の新歓をShare
      </h2>

      <div className="my-2 pb-2 flex justify-center">
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
