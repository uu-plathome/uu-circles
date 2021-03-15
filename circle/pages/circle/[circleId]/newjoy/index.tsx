import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleNewJoyList } from '@/infra/api/circleNewjoy'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const useCircleId = () => {
  const router = useRouter()
  const { circleId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
  }
}

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circle, setCircle] = useState<Circle>()
  const [circleNewjoys, setCircleNewjoys] = useState<CircleNewJoy[]>()
  const { circleId } = useCircleId()

  useEffect(() => {
    const f = async () => {
      const {
        circle: _circle,
        circleNewJoys: _circleNewJoys
      } = await getCircleNewJoyList(circleId)
      setCircle(_circle)
      setCircleNewjoys(_circleNewJoys)
    }

    f()
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseContainer>
          <div className="pb-32 md:pb-72">
            {circle ? (
              <div>
                <h1 className="text-lg font-bold text-center pt-10 pb-6">新歓イベントの追加・編集</h1>

              </div>
            ) : ''}
          </div>
        </BaseContainer>
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
