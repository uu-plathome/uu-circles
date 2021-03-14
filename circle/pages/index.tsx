import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { CircleList } from '@/components/organisms/List/CircleList'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const f = async () => {
      setCircles(await getCircleList())
    }

    f()
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <div className="pb-32 md:pb-72">
          <h1 className="text-lg font-bold text-center pt-10 pb-6">編集可能サークル</h1>

          <div>
            {circles && circles.length > 0 ? (
              <CircleList circles={circles} />
            ) : ''}
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
