import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { FC } from 'react'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'
import { Circle } from '@/src/lib/types/model/Circle'
import Color from '@/src/styles/colors'

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
              src={ImagePath.SNS_ICON.TWITTER}
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
              src={ImagePath.SNS_ICON.FACEBOOK}
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
              src={ImagePath.SNS_ICON.INSTAGRAM}
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
              src={ImagePath.SNS_ICON.HP}
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
              src={ImagePath.SNS_ICON.YOUTUBE}
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
              src={ImagePath.SNS_ICON.LINE}
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
              src={ImagePath.SNS_ICON.GITHUB}
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
              src={ImagePath.SNS_ICON.PEING}
              alt="peing link"
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
