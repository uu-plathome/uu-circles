import { MainTemplate } from '@/src/components/pages/Main/MainTemplate'
import { useFetchUuYell } from '@/src/hooks/useFetchUuYell'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getMain } from '@/src/lib/infra/api/main'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { GetStaticProps, NextPage } from 'next'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { WP_REST_API_Posts } from 'wp-types'

Pusher.logToConsole = true

/**
 * メインページのコンテンツを再取得
 */
const useRefetchMainData = (ssrProps: Props): Props => {
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

  return {
    advertises,
    mainAdvertises,
    circles,
    uuYellArticles,
    announcements,
  }
}

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
const Index: NextPage<Props> = (ssrProps) => {
  // 識別子の取得
  const [identifierHash, setIdentifierHash] = useState(null)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  const { advertises, mainAdvertises, circles, uuYellArticles, announcements } =
    useRefetchMainData(ssrProps)

  // 「編集長イチオシ」の取得
  const { uuYellForMain } = useFetchUuYell()

  // ページ位置
  const { pageData, onChangeId } = usePagePosition({
    pageUrl: '/',
    pageName: 'Main',
    identifierHash,
  })

  return (
    <MainTemplate
      advertises={advertises}
      mainAdvertises={mainAdvertises}
      circles={circles}
      uuYellArticles={uuYellArticles}
      uuYellForMain={uuYellForMain}
      announcements={announcements}
      pagePositions={pageData}
      onChangeId={onChangeId}
    />
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
