import { Circle } from '@/lib/types/model/Circle'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { FC } from 'react'
import Color from 'colors'

type Props = {
  circle: Circle
}
const SnsList: FC<Props> = ({ circle }) => {
  return (
    <div className="grid grid-cols-5 mt-2">
      {circle.twitterUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.twitterUrl}>
            <Image
              src="/images/twitter.png"
              alt="twiiter link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.facebookUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.facebookUrl}>
            <Image
              src="/images/facebook.png"
              alt="Fackbook link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.instagramUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.instagramUrl}>
            <Image
              src="/images/instagram.png"
              alt="Instagram link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.homepageUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.homepageUrl}>
            <Image
              src="/images/hp.png"
              alt="Homepage link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.youtubeUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.youtubeUrl}>
            <Image
              src="/images/youtube.png"
              alt="Youtube link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.lineUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.lineUrl}>
            <Image
              src="/images/line.png"
              alt="twiiter link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.githubUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.githubUrl}>
            <Image
              src="/images/github.png"
              alt="twiiter link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.tiktokUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.tiktokUrl} style={{ width: '100%', height: '100%' }}>
            <FontAwesomeIcon
              icon={faTiktok}
              color={Color.black}
              style={{ width: '100%', height: '100%' }}
            />
          </a>
        </div>
      ) : (
        ''
      )}
      {circle.peingUrl ? (
        <div className="w-10 h-10 mb-4">
          <a href={circle.peingUrl}>
            <Image
              src="/images/peing.png"
              alt="twiiter link"
              width="40"
              height="40"
            />
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export { SnsList }
