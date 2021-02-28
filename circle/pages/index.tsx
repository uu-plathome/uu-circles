import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { CircleList } from '@/components/organisms/List/CircleList'
import { AuthContext } from '@/contexts/AuthContext'
import { NextPage } from 'next'
import { useContext } from 'react'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <div className="pb-32 md:pb-72">
          <h1 className="text-lg font-bold text-center pt-10 pb-6">編集可能サークル</h1>

          <div>
            <CircleList />
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage