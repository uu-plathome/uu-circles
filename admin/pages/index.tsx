import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { BaseHeader } from '../components/layouts/BaseHeader'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AuthContext } from '@/contexts/AuthContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { downloadCircleXlsx } from '@/infra/api/circle'
import { isSystem } from '@/lib/enum/api/Role'

const IndexPage: NextPage = () => {
  const { isMd } = useMediaQuery()
  const authUser = useContext(AuthContext)
  const [onProcess, setOnProcess] = useState(false)

  const onDownloadCircleXlsx = async () => {
    setOnProcess(true)
    await downloadCircleXlsx()
    setOnProcess(false)
  }

  return (
    <div>
      <Head>
        <title>ダッシュボード</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {onProcess ? <SubmitLoading isOpen={onProcess} /> : null}

      <BaseContainer>
        <BaseWrapper title="ダッシュボード">
          <div className="pl-4">
            <h2 className="mb-4 text-lg text-white">メニュー</h2>

            <ul>
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

            {isSystem(authUser.role) ? (
              <div className="pt-8">
                <h2 className="mb-4 text-lg text-white">システム管理者専用</h2>

                <BlueButton type="button" onClick={onDownloadCircleXlsx}>
                  サークルのxlsxダウンロード
                </BlueButton>
              </div>
            ) : null}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
