import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { WP_REST_API_Posts } from 'wp-types'
import { MainTemplate } from '@/src/components/pages/Main/MainTemplate'
import { MainHead } from '@/src/components/pages/Main/Parts/MainHead'
import { useFetchUuYell } from '@/src/hooks/useFetchUuYell'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getMain } from '@/src/lib/infra/api/main'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'

/**
 * メインページのコンテンツを再取得
 */
const useRefetchMainData = (ssrProps: Props): Props => {
  const { data } = useSWR('main.refresh', getMain, {
    fallbackData: {
      advertises: ssrProps.advertises,
      mainAdvertises: ssrProps.mainAdvertises,
      circles: ssrProps.circles,
      uuYellArticles: ssrProps.uuYellArticles,
      announcements: ssrProps.announcements,
    },
    refreshInterval: 1000 * 60 * 5 /** 5minに1回再検証 */,
  })

  if (!data) {
    return {
      advertises: ssrProps.advertises,
      mainAdvertises: ssrProps.mainAdvertises,
      circles: ssrProps.circles,
      uuYellArticles: ssrProps.uuYellArticles,
      announcements: ssrProps.announcements,
    }
  }

  const {
    advertises,
    mainAdvertises,
    circles,
    uuYellArticles,
    announcements,
  } = data

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
  const [identifierHash, setIdentifierHash] = useState<string | undefined>(undefined)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash) || undefined)
  }, [])

  const { advertises, mainAdvertises, circles, uuYellArticles, announcements } =
    useRefetchMainData(ssrProps)

  // 「編集長イチオシ」の取得
  const { uuYellForMain } = useFetchUuYell()

  // ページ位置
  const { pageData, onChangeId, recordPagePosition } = usePagePosition({
    pageUrl: '/',
    pageName: 'Main',
    identifierHash,
  })

  return (
    <>
      <MainHead />

      <MainTemplate
        advertises={advertises}
        mainAdvertises={mainAdvertises}
        circles={circles}
        uuYellArticles={uuYellArticles}
        uuYellForMain={uuYellForMain || {
          posts: undefined,
          medias: undefined
        }}
        announcements={announcements}
        pagePositions={pageData}
        recordPagePosition={recordPagePosition}
        onChangeId={onChangeId}
      />
    </>
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
