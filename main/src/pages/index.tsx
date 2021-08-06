import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainCircleList } from '@/src/components/organisms/Main/MainCircleList'
import { MainSponsorshipFooter } from '@/src/components/organisms/Main/MainSponsorshipFooter'
import { MainTagList } from '@/src/components/organisms/Main/MainTagList'
import { MainUucircleAd } from '@/src/components/organisms/Main/MainUucircleAd'
import { MainUucircleBottomButtons } from '@/src/components/organisms/Main/MainUucircleBottomButtons'
import { MainUucircleTopButtons } from '@/src/components/organisms/Main/MainUucircleTopButtons'
import { MainUucircleTopCarousel } from '@/src/components/organisms/Main/MainUucircleTopCarousel'
import { ApiUrl } from '@/src/lib/enum/app/ApiUrl'
import { UuYellTagNumber } from '@/src/lib/enum/app/UuYellTagNumber'
import { getMain } from '@/src/lib/infra/api/main'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'

const UU_YELL_URL = ApiUrl.UU_YELL
Pusher.logToConsole = true;

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
const Index: NextPage<Props> = (ssrProps) => {
  const {
    data: {
      advertises,
      mainAdvertises,
      circles,
      uuYellArticles,
      announcements,
    },
  } = useSWR('main.refresh', getMain, {
    initialData: {
      advertises: ssrProps.advertises,
      mainAdvertises: ssrProps.mainAdvertises,
      circles: ssrProps.circles,
      uuYellArticles: ssrProps.uuYellArticles,
      announcements: ssrProps.announcements,
    },
  })

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


  // const [socket, _] = useState(() => io())
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.info('socket connected!!')
  //   })
  //   socket.on('disconnect', () => {
  //     console.info('socket disconnected!!')
  //   })
  //   socket.on('update-data', (newData) => {
  //     console.info('Get Updated Data', newData)
  //   })
  //   return () => {
  //     socket.close()
  //   }
  // }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     axiosInstance.post('http://localhost:3000/api/chat', {
  //       data: 'aaaa'
  //     })
  //   })
  // }, [])

  // const [pusher, setPusher] = useState<Pusher | null>()
  useEffect(() => {
    const pusher = new Pusher('a9b069e2da6cbb2a3766', {
      cluster: 'ap3'
    });

    pusher.subscribe('my-channel-name').bind('my-event', (data) => {
      console.info('Received event:', data)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>UU-Circles</title>
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
        <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/favicons/android-chrome-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicons/android-chrome-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/favicons/android-chrome-72x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/android-chrome-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicons/android-chrome-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicons/android-chrome-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="152x152"
          href="/favicons/android-chrome-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/favicons/android-chrome-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="384x384"
          href="/favicons/android-chrome-384x384.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/favicons/icon-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicons/icon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/favicons/icon-72x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicons/icon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicons/icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="152x152"
          href="/favicons/icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="160x160"
          href="/favicons/icon-160x160.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/favicons/icon-196x196.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/favicons/icon-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="384x384"
          href="/favicons/icon-384x384.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/icon-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/icon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="24x24"
          href="/favicons/icon-24x24.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/icon-32x32.png"
        />
        <link rel="manifest" href="/manifest.json" />
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

        <MainUucircleTopButtons />

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
  const { circles, advertises, mainAdvertises, uuYellArticles, announcements } =
    await getMain()

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
