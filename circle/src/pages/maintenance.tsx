import { NextPage } from 'next'
import { DangerBunner } from '@/src/components/atoms/bunner/DangerBunner'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { MainHeader } from '@/src/components/layouts/MainHeader'

const Maintenance: NextPage = () => {
  return (
    <div>
      <MainHeader />

      <div className="xl:container pb-20">
        <div className="mx-auto mt-8 max-w-screen-md">
          <div className="p-4">
            <h1 className="mb-12 text-2xl font-bold text-center text-black">
              サークル管理者
            </h1>

            <div className="py-4 px-4">
              <DangerBunner text='2025/3/16（日）以降はサーバー移管のため、本画面から登録作業ができません' />
            </div>
          </div>
        </div>
      </div>

      <BaseFooter />
    </div>
  )
}

export default Maintenance
