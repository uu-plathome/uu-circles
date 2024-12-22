import dynamic from 'next/dynamic'
import { useMemo, FC } from 'react'
import { ID_LIST } from './id_list'
import YouTube from 'react-youtube'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { Props as MainCircleListProps } from '@/src/components/pages/Main/Parts/MainCircleList'
import { Props as MainSponsorshipFooterProps } from '@/src/components/pages/Main/Parts/MainSponsorshipFooter'
import { Props as MainUucircleAdProps } from '@/src/components/pages/Main/Parts/MainUucircleAd'
import { Props as MainUucircleBottomButtonsProps } from '@/src/components/pages/Main/Parts/MainUucircleBottomButtons'
import { MainUucircleTopButtons } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtons'
import { MainUucircleTopCarousel } from '@/src/components/pages/Main/Parts/MainUucircleTopCarousel'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'

const MainCircleList = dynamic<MainCircleListProps>(() =>
  import('@/src/components/pages/Main/Parts/MainCircleList').then(
    (mod) => mod.MainCircleList
  )
)
const MainTagList = dynamic<{}>(() =>
  import('@/src/components/pages/Main/Parts/MainTagList').then(
    (mod) => mod.MainTagList
  )
)
const MainUucircleAd = dynamic<MainUucircleAdProps>(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleAd').then(
    (mod) => mod.MainUucircleAd
  )
)
const MainUucircleBottomButtons = dynamic<MainUucircleBottomButtonsProps>(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleBottomButtons').then(
    (mod) => mod.MainUucircleBottomButtons
  )
)
const MainSponsorshipFooter = dynamic<MainSponsorshipFooterProps>(() =>
  import('@/src/components/pages/Main/Parts/MainSponsorshipFooter').then(
    (mod) => mod.MainSponsorshipFooter
  )
)

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  uuYellForMain: {
    posts?: WP_REST_API_Posts
    medias?: WP_REST_API_Attachments
  }
}
export const MainTemplate: FC<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  uuYellForMain,
  announcements,
}) => {
  return (
    <>
      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <MainUucircleTopCarousel advertises={mainAdvertises} />

        <div
          id={ID_LIST.HEADER_CATCH_COPY}
          style={{ marginTop: '-6px' }}
          className="relative bg-white"
        >
          <p className="py-8 text-center">新歓をハックする！</p>
        </div>

        <div id={ID_LIST.TOP_BUTTONS} className="relative bg-white">
          <MainUucircleTopButtons />
        </div>

        <BaseContainer>
          <div className="relative px-7" id={ID_LIST.CIRCLE_LIST_CONTAINER}>
            <MainTagList />

            {/*  サークル一覧 */}
            <MainCircleList id={ID_LIST.CIRCLE_LIST} circles={circles} />

            <div className="flex justify-center pt-4 pb-10 bg-gray-100">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <div id={ID_LIST.UU_CIRCLES_AD}>
            <MainUucircleAd />
          </div>

          <div id={ID_LIST.UU_YELL_ARTICLES}>
            <MainUucircleBottomButtons
              medias={
                uuYellForMain && uuYellForMain.medias
                  ? uuYellForMain.medias
                  : []
              }
              posts={
                uuYellForMain && uuYellForMain.posts ? uuYellForMain.posts : []
              }
            />
          </div>

          <div className="flex justify-center mb-12">
            <div className="px-4 md:px-0 main-advertise-youtube">
              <div
                className="overflow-hidden relative pb-0 mb-4 w-full h-0"
                style={{ paddingBottom: '56.25%' }}
              >
                <YouTube
                  videoId={'f_YOvzGCe3w'}
                  containerClassName="main-advertise-youtube mb-2"
                  className="absolute top-0 left-0 h-full main-advertise-youtube"
                />
              </div>

              <p className="text-sm text-center text-black">
                UU-Circles 宣伝動画
              </p>
            </div>
          </div>

          <div id={ID_LIST.SPONSORSHIP_FOOTER}>
            <MainSponsorshipFooter advertises={advertises} />
          </div>

          <BaseFooter uuYellArticles={uuYellArticles} />
        </div>
      </BaseLayout>
    </>
  )
}
