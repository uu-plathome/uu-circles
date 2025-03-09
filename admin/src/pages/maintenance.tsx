import { NextPage } from 'next'
import { DangerBunner } from '@/src/components/atoms/bunner/DangerBunner'
import Head from 'next/head'
import { BaseContainer } from '../components/layouts/BaseContainer'

const Maintenance: NextPage = () => {
  return (
    <div>
      <Head>
        <title>メンテナンス</title>
      </Head>

      <div className="border-b-2 border-gray-100 shadow">
        <BaseContainer>
          <div className="flex h-14 items-center justify-between px-4 ">
            <div className="flex items-center">
              <h1 className="text-xl text-white">UU-Manager</h1>
            </div>
          </div>
        </BaseContainer>
      </div>

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <h1 className="mb-4 text-center text-2xl text-white">メンテナンスのお知らせ</h1>

          <div className="py-4 px-4">
            <DangerBunner text='2025/3/16（日）以降はサーバー移管のため、本画面から登録作業ができません' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maintenance
