import colors from '@/colors'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { dayjs } from '@/plugins/Dayjs'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { WP_REST_API_Media, WP_REST_API_Post } from 'wp-types'

const WpPostBlock: FC<{
  post: WP_REST_API_Post
  media?: WP_REST_API_Media
}> = ({ post, media }) => {
  return (
    <article className="rounded-sm bg-white pb-4 mb-12 shadow-md md:pb-6 cursor-pointer">
      <a href={post.link} className="transition-all">
        <p className="wp-cardtype__img">
          <img
            src={(media && media.source_url) || '/images/uuyell-post.png'}
            alt={(media && media.alt_text) || ''}
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
  posts: WP_REST_API_Post[]
  medias: WP_REST_API_Media[]
}
const MainUucircleBottomButtons: FC<Props> = ({ medias, posts }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="bg-gray-100  pt-10 pb-10 ">
      <div
        className="text-center my-8 mx-auto"
        style={{ width: isMd ? 'auto' : 280 }}
      >
        <h2 className="text-lg font-bold mb-2">新宇大生必見の情報サイト！</h2>
        <p className="text-sm">
          アパートの探し方から美味しいお店、おすすめのカフェまで全てここ！
        </p>
      </div>

      <div>
        <nav
          className="horizontal_scroll md:grid grid-cols-1 md:grid-cols-2 md:gap-4 md:justify-center hidden"
          style={{ margin: '0 auto!important', width: 700 }}
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
  )
}

export { MainUucircleBottomButtons }
