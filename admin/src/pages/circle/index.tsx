import { NextPage } from 'next'
import Head from 'next/head'
import { scroller } from 'react-scroll'
import useSWR from 'swr'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { Index } from '@/src/components/pages/circle/Index'
import { useCircles } from '@/src/components/pages/circle/useCircles'
import { getCircleList } from '@/src/lib/infra/api/circle'

const IndexPage: NextPage = () => {
  const { data: originalCircles } = useSWR('/circles', getCircleList)
  const scrollTop = () => {
    scroller.scrollTo('top', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  const {
    searchName,
    searchCircleType,
    searchRelease,
    searchIsHandbill,
    nowPageCircles,
    page,
  } = useCircles(originalCircles)

  if (!originalCircles) {
    return <SubmitLoading isOpen={true} />
  }

  return (
    <div id="top">
      <Head>
        <title>サークル一覧へようこそ</title>
      </Head>

      <Index
        circles={nowPageCircles}
        searchValue={{
          name: searchName,
          release: searchRelease,
          circleType: searchCircleType,
          isHandbill: searchIsHandbill,
        }}
        hasPrevious={page.hasPrevious}
        hasNext={page.hasNext}
        onPrevious={() => page.previousPage(scrollTop)}
        onNext={() => page.nextPage(scrollTop)}
      />
    </div>
  )
}

export default IndexPage
