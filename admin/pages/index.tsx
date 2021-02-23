
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NextPage } from 'next'
import { BaseHeader } from '../components/layouts/BaseHeader'
import Head from 'next/head';
import Link from 'next/link'

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
          <div className="pl-4">
            <ul>
              <li className="text-white pb-4">
                メニュー
              </li>
              <li className="text-white pb-4 list-disc ml-4">
                <Link href="/circle">
                  <a className="text-white underline">サークル一覧へ</a>
                </Link>
              </li>
              <li className="text-white pb-4 list-disc ml-4">
                <Link href="/circle/create">
                  <a className="text-white underline">サークル新規追加</a>
                </Link>
              </li>
            </ul>
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage