
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { NextPage } from 'next'
import { useContext } from 'react'
import { BaseHeader } from '../components/layouts/BaseHeader'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <BaseHeader />

      <BaseContainer>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/5">
            <BaseSidebar />
          </div>

          <div className="w-full lg:w-4/5">
            <div className="py-10">
              <h1 className="text-2xl text-gray-700 dark:text-gray-100">
                管理画面へようこそ
              </h1>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  )
}

export default IndexPage