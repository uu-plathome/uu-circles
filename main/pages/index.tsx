import { GetServerSideProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { MainPageCircleList } from '@/components/organisms/List/MainPageCircleList'
import { getMain } from '@/infra/api/main'
import { Circle } from '@/lib/types/model/Circle'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { MainSponsorshipFooter } from '@/components/organisms/Main/MainSponsorshipFooter'
import { MainUucircleAd } from '@/components/organisms/Main/MainUucircleAd'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { MainTagList } from '@/components/organisms/Main/MainTagList'
import { GreenButton } from '@/components/atoms/button/GreenButton'
import { Advertise } from '@/lib/types/model/Advertise'
import Head from 'next/head'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEffect, useState } from 'react'

import { MainUucircleTopButtons } from '@/components/organisms/Main/MainUucircleTopButtons'
import { MainUucircleBottomButtons } from '@/components/organisms/Main/MainUucircleBottomButtons'
import { MainUucircleTopCarousel } from '@/components/organisms/Main/MainUucircleTopCarousel'

type Props = {
  advertises: Advertise[]
  circles: Circle[]
}
const Index: NextPage<Props> = ({ advertises, circles }) => {
  const { width } = useWindowResize()
  const { isMd } = useMediaQuery()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

  return (
    <div>
      <Head>
          <title>UU-circles</title>
          <meta property="og:title" content={`UU-circles`} />
          <meta property="og:site_name" content="UU-circles" />
          <meta property="og:type" content={'website'} />
          <meta property="og:url" content={`https://uu-circles.com/`} />
          <meta name="twitter:site" content="@Ulab_uu" />
      </Head>

      <BaseLayout>
        <MainUucircleTopCarousel />

        <div style={{ marginTop: '-6px' }} className="bg-white">
          <p className="text-center py-8">新歓をハックする！</p>
        </div>

        <MainUucircleTopButtons />
        <BaseContainer>
          <div className="px-6">
            <MainTagList />

            {/*  サークル一覧 */}
            <MainPageCircleList circles={circles} />

            <div className="pt-4 pb-10 bg-gray-100 flex justify-center">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <MainUucircleAd />

          <MainUucircleBottomButtons />

          <MainSponsorshipFooter advertises={advertises} />

          <BaseFooter />
        </div>
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { circles, advertises } = await getMain()

  return {
    props: {
      advertises,
      circles,
    },
  }
}

export default Index
