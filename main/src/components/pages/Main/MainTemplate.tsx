import dynamic from 'next/dynamic'
import { useMemo, FC } from 'react'
import YouTube from 'react-youtube'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { computedPagePositionIdNowLength } from './computedPagePositionIdNowLength'
import { ID_LIST } from './id_list'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainUucircleTopButtons } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtons'
import { MainUucircleTopCarousel } from '@/src/components/pages/Main/Parts/MainUucircleTopCarousel'
import { PagePositionRecord } from '@/src/hooks/usePagePosition'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { PagePositions } from '@/src/lib/types/model/PagePosition'

const MainCircleList = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainCircleList').then(
    (mod) => mod.MainCircleList
  )
)
const MainTagList = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainTagList').then(
    (mod) => mod.MainTagList
  )
)
const MainUucircleAd = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleAd').then(
    (mod) => mod.MainUucircleAd
  )
)
const MainUucircleBottomButtons = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleBottomButtons').then(
    (mod) => mod.MainUucircleBottomButtons
  )
)
const MainSponsorshipFooter = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainSponsorshipFooter').then(
    (mod) => mod.MainSponsorshipFooter
  )
)
const BaseFooter = dynamic(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  uuYellForMain: {
    posts: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }
  pagePositions: PagePositions
  recordPagePosition: PagePositionRecord[]
  onChangeId: (_pagePositionId: string) => Promise<void>
}
export const MainTemplate: FC<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  uuYellForMain,
  announcements,
  pagePositions,
  recordPagePosition,
  onChangeId,
}) => {
  const pagePositionIdNowLength = useMemo(() => {
    return computedPagePositionIdNowLength({
      pagePositions,
      recordPagePosition,
    })
  }, [pagePositions, recordPagePosition])

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
          onMouseMove={() => onChangeId(ID_LIST.HEADER_CATCH_COPY)}
        >
          <p className="py-8 text-center">新歓をハックする！</p>
        </div>

        <div id={ID_LIST.TOP_BUTTONS} className="relative bg-white">
          <MainUucircleTopButtons
            pagePositionIdNowLength={pagePositionIdNowLength}
            onChangeId={onChangeId}
          />
        </div>

        <BaseContainer>
          <div className="relative px-7" id={ID_LIST.CIRCLE_LIST_CONTAINER}>
            <MainTagList
              id={ID_LIST.RECOMMEND_TAG_LIST}
              pagePositionIdNowLength={pagePositionIdNowLength}
              onChangeId={onChangeId}
            />

            {/*  サークル一覧 */}
            <MainCircleList
              id={ID_LIST.CIRCLE_LIST}
              circles={circles}
              pagePositionIdNowLength={pagePositionIdNowLength}
              onChangeId={onChangeId}
            />

            <div className="flex justify-center pt-4 pb-10 bg-gray-100">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <div
            id={ID_LIST.UU_CIRCLES_AD}
            onMouseMove={() => onChangeId(ID_LIST.UU_CIRCLES_AD)}
          >
            <MainUucircleAd />
          </div>

          <div
            id={ID_LIST.UU_YELL_ARTICLES}
            onMouseMove={() => onChangeId(ID_LIST.UU_YELL_ARTICLES)}
          >
            <MainUucircleBottomButtons
              pagePositionIdNowLength={pagePositionIdNowLength}
              medias={uuYellForMain ? uuYellForMain.medias : []}
              posts={uuYellForMain ? uuYellForMain.posts : []}
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

              <p className="text-sm text-center text-black">UU-Circles 宣伝</p>
            </div>
          </div>

          <div
            id={ID_LIST.SPONSORSHIP_FOOTER}
            onMouseMove={() => onChangeId(ID_LIST.SPONSORSHIP_FOOTER)}
          >
            <MainSponsorshipFooter
              pagePositionIdNowLength={pagePositionIdNowLength}
              advertises={advertises}
            />
          </div>

          <BaseFooter uuYellArticles={uuYellArticles} />
        </div>
      </BaseLayout>
    </>
  )
}
