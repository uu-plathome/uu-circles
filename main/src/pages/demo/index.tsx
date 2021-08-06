import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainCircleList } from '@/src/components/organisms/Main/MainCircleList'
import { MainDemoUucircleTopButtons } from '@/src/components/organisms/Main/MainDemoUucircleTopButtons'
import { MainSponsorshipFooter } from '@/src/components/organisms/Main/MainSponsorshipFooter'
import { MainTagList } from '@/src/components/organisms/Main/MainTagList'
import { MainUucircleAd } from '@/src/components/organisms/Main/MainUucircleAd'
import { MainUucircleBottomButtons } from '@/src/components/organisms/Main/MainUucircleBottomButtons'
import { MainUucircleTopCarousel } from '@/src/components/organisms/Main/MainUucircleTopCarousel'
import { getMainDemo } from '@/src/infra/api/main'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'
import { ApiUrl } from '@/src/lib/enum/app/ApiUrl'
import { UuYellTagNumber } from '@/src/lib/enum/app/UuYellTagNumber'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'

const UU_YELL_URL = ApiUrl.UU_YELL

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
const Index: NextPage<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  announcements,
}) => {
  // uu-yellの記事の取得
  const { data: uuYellForMain } = useSWR<{
    posts: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }>(['main'], async () => {
    const TAG_NUMBER = UuYellTagNumber.UuCirclesRecommend
    const fetchedPosts = await axios.get<WP_REST_API_Posts>(
      `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&tags=${TAG_NUMBER}`
    )

    if (fetchedPosts.data.length === 0) {
      return {
        posts: [],
        medias: [],
      }
    }

    const mediaIds = fetchedPosts.data.map((post) => post.featured_media)
    const queryMediaIds = mediaIds.join(',')

    const fetchedMedias = await axios.get<WP_REST_API_Attachments>(
      `${UU_YELL_URL}/wp-json/wp/v2/media?perPage=100&context=embed&include=${queryMediaIds}`
    )

    return {
      posts: fetchedPosts.data,
      medias: fetchedMedias.data,
    }
  })

  return (
    <div>
      <Head>
        <title>UU-Circles デモ画面</title>
        <meta
          property="og:title"
          content={`UU-Circles | 宇都宮大学の“知りたいサークル“を知る場所`}
        />
        <meta
          property="og:description"
          content={`宇都宮大学のサークル一覧。なりたいジブンをさがす春。`}
        />
        <meta property="og:site_name" content="UU-Circles" />
        <meta property="og:type" content={'website'} />
        <meta property="og:url" content={`https://uu-circles.com/`} />
        <meta
          name="og:image"
          content="https://uu-circles.com/images/uucircles_ogp.png"
        />
        <meta name="twitter:site" content="@Ulab_uu" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <MainUucircleTopCarousel advertises={mainAdvertises} />

        <div style={{ marginTop: '-6px' }} className="bg-white">
          <p className="text-center py-8">新歓をハックする！</p>
        </div>

        <MainDemoUucircleTopButtons />

        <BaseContainer>
          <div className="px-7">
            <MainTagList />

            {/*  サークル一覧 */}
            <MainCircleList circles={circles} />

            <div className="pt-4 pb-10 bg-gray-100 flex justify-center">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <MainUucircleAd />

          <MainUucircleBottomButtons
            medias={uuYellForMain ? uuYellForMain.medias : []}
            posts={uuYellForMain ? uuYellForMain.posts : []}
          />

          <MainSponsorshipFooter advertises={advertises} />

          <BaseFooter uuYellArticles={uuYellArticles} />
        </div>
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, advertises, mainAdvertises, uuYellArticles } =
    await getMainDemo()

  const announcements: Announcement[] = [
    {
      announcementId: 0,
      title: 'これはデモ画面です。正しい情報ではありません。',
      announcementType: AnnouncementType.UPDATE_FEATURE,
      importance: Importance.MIDDLE,
    },
  ]
  return {
    props: {
      advertises,
      circles,
      mainAdvertises,
      uuYellArticles,
      announcements,
    },
    revalidate: 120,
  }
}

export default Index
