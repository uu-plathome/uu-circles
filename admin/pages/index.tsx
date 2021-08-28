import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { BaseHeader } from '../components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const IndexPage: NextPage = () => {
  const { isMd } = useMediaQuery()

  return (
    <div>
      <Head>
        <title>ダッシュボード</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="ダッシュボード">
          <div className="pl-4">
            <ul>
              <li className="pb-4 text-white">メニュー</li>
              <li className="pb-4 ml-4 list-disc text-white">
                <Link href="/circle">
                  <a className="text-white underline">サークル一覧へ</a>
                </Link>
              </li>
              <li className="pb-4 ml-4 list-disc text-white">
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
