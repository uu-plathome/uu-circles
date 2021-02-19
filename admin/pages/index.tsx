
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NextPage } from 'next'
import { BaseHeader } from '../components/layouts/BaseHeader'
import Head from 'next/head';

const IndexPage: NextPage = () => {
  const { isMd } = useMediaQuery()

  return (
    <div>
      <Head>
        <title>ダッシュボード</title>
      </Head>

      {isMd ? (
        <BaseHeader />
      ) : ''}

      <BaseContainer>
        <BaseWrapper
          title="ダッシュボード"
        >
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage