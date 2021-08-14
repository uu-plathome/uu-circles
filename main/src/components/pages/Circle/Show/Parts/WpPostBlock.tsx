import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { FC } from 'react'
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'
import { dayjs } from '@/src/plugins/Dayjs'
import colors from '@/src/styles/colors'

export const WpPostBlock: FC<{
  post: WP_REST_API_Post
  media?: WP_REST_API_Attachment
}> = ({ post, media }) => {
  return (
    <article className="pb-4 md:pb-6 mb-12 bg-white rounded-sm shadow-md cursor-pointer">
      <a href={post.link} className="transition-all">
        <div className="wp-cardtype__img">
          <Image
            src={(media && media.source_url) || ImagePath.UU_YELL.MAIN}
            alt={(media && media.alt_text) || ''}
            layout="fill"
          />
        </div>

        <div className="py-2 px-6 mb-2">
          {post.date ? (
            <div className="flex items-center pt-2 mb-2">
              <FontAwesomeIcon
                icon={faClock}
                color={colors.gray[400]}
                className="mr-1"
              />
              <span className="text-sm text-gray-400">
                {dayjs(post.date).format('YYYY年MM月DD日')}
              </span>
            </div>
          ) : (
            ''
          )}

          <div className="pr-3 w-full">
            <h3
              className="mb-1 font-bold text-black max-line-4"
              style={{
                minHeight: '48px',
              }}
            >
              {post.title.rendered}
            </h3>
          </div>
        </div>
      </a>
    </article>
  )
}
