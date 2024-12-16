import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  WP_REST_API_Attachment,
  WP_REST_API_Attachments,
  WP_REST_API_Post,
  WP_REST_API_Posts,
} from 'wp-types'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'
import { dayjs } from '@/src/plugins/Dayjs'
import colors from '@/src/styles/colors'

const WpPostBlock: FC<{
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
            width={342}
            height={180}
          />
        </div>

        <div className="py-2 px-6 mb-2">
          {post.date ? (
            <p className="flex items-center pt-2 mb-2">
              <FontAwesomeIcon
                icon={faClock}
                color={colors.gray[400]}
                className="mr-1"
              />
              <span className="text-sm text-gray-400">
                {dayjs(post.date).format('YYYY年MM月DD日')}
              </span>
            </p>
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {
  posts: WP_REST_API_Posts
  medias: WP_REST_API_Attachments
}
const MainUucircleBottomButtons: FC<Props> = ({
  medias,
  posts,
}) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="pt-10 pb-10 bg-gray-100 ">
      <div className="my-8 mx-auto text-center">

        <h2 className="mb-2 text-lg font-bold">
          新宇大生必見の情報サイト「uu-yell」！
        </h2>

        <div className="px-16">
          <p className="mb-2 text-sm">宇大を生き抜くヒントがここに。</p>
        </div>
      </div>

      <div>
        <div className="md:flex md:justify-center">
          <nav
            className="hidden md:grid md:grid-cols-2 md:gap-4 md:justify-center"
            style={{ width: isMd ? 700 : 280 }}
            id="top-button-scroll"
          >
            {posts &&
              posts.map((post, key) => {
                return (
                  <div
                    key={`MainUucircleBottomButtons.md-${key}`}
                    className="mb-4"
                  >
                    <WpPostBlock
                      post={post}
                      media={
                        medias &&
                        medias.find((media) => media.id === post.featured_media)
                      }
                    />
                  </div>
                )
              })}
          </nav>

          <div className="md:hidden">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides={true}
              loop
              navigation
              pagination={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {posts &&
                posts.map((post, key) => {
                  return (
                    <SwiperSlide
                      key={`MainUucircleBottomButtons.sp-${key}`}
                      className="flex justify-center"
                      style={{ width: 300 }}
                    >
                      <div>
                        <div className="mb-4" style={{ width: 300 }}>
                          <WpPostBlock
                            post={post}
                            media={
                              medias &&
                              medias.find(
                                (media) => media.id === post.featured_media
                              )
                            }
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { Props }
export { MainUucircleBottomButtons }
