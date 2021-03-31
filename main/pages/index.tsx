import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { MainCircleList } from '@/components/organisms/Main/MainCircleList'
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
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEffect, useState } from 'react'

import { MainUucircleTopButtons } from '@/components/organisms/Main/MainUucircleTopButtons'
import { MainUucircleBottomButtons } from '@/components/organisms/Main/MainUucircleBottomButtons'
import { MainUucircleTopCarousel } from '@/components/organisms/Main/MainUucircleTopCarousel'

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
}
const Index: NextPage<Props> = ({ advertises, mainAdvertises, circles }) => {
  const { width } = useWindowResize()
  const { isMd } = useMediaQuery()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

  return (
    <div>
      <Head>
        <title>UU-Circles</title>
        <meta property="og:title" content={`UU-Circles`} />
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

      <BaseLayout>
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

          <MainUucircleBottomButtons />

          <MainSponsorshipFooter advertises={advertises} />

          <BaseFooter />
        </div>
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, advertises, mainAdvertises } = await getMain()

  return {
    props: {
      advertises,
      circles,
      mainAdvertises,
    },
    revalidate: 120,
  }
}

export default Index
