import colors from '@/colors'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ImagePath } from '@/lib/enum/app/ImagePath'
import { dayjs } from '@/plugins/Dayjs'
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

const WpPostBlock: FC<{
  post: WP_REST_API_Post
  media?: WP_REST_API_Attachment
}> = ({ post, media }) => {
  return (
    <article className="rounded-sm bg-white pb-4 mb-12 shadow-md md:pb-6 cursor-pointer">
      <a href={post.link} className="transition-all">
        <p className="wp-cardtype__img">
          <Image
            src={(media && media.source_url) || ImagePath.UU_YELL.MAIN}
            alt={(media && media.alt_text) || ''}
            width={342}
            height={180}
          />
        </p>

        <div className="px-6 py-2 mb-2">
          {post.date ? (
            <p className="pt-2 flex items-center mb-2">
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

          <div className="w-full pr-3">
            <h3
              className="text-black font-bold mb-1 max-line-4"
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
const MainUucircleBottomButtons: FC<Props> = ({ medias, posts }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="bg-gray-100  pt-10 pb-10 ">
      <div className="text-center my-8 mx-auto">
        <h2 className="text-lg font-bold mb-2">
          新宇大生必見の情報サイト「uu-yell」！
        </h2>

        <div className="px-16">
          <p className="text-sm mb-2">
            アパートの探し方から美味しいお店、おすすめのカフェまで全てここ！
          </p>

          <a
            href="https://media.uu-circles.com/"
            className="text-blue-600 hover:underline"
          >
            uu-yellを見る
          </a>
        </div>
      </div>

      <div>
        <div className="md:flex md:justify-center">
          <nav
            className="md:grid md:grid-cols-2 md:gap-4 md:justify-center hidden"
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

export { MainUucircleBottomButtons }
