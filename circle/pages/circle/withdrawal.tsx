import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { CircleWithdrawalList } from '@/components/organisms/List/CircleWithdrawalList'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleList, withdrawalCircle } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circles, setCircles] = useState<Circle[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const f = async () => {
      setCircles(await getCircleList())
    }

    f()
  }, [])

  const onWithdrawal = async (circleId: number) => {
    setIsOpen(true)

    await withdrawalCircle(circleId)

    setIsOpen(false)
  }

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faBuilding} className="mr-4" size="lg" />
          <span className="text-red-600">サークルを脱退する</span>
        </h1>

        <SubmitLoading isOpen={isOpen} />

        <div className="pt-8 pb-32 md:pb-72">
          <div className="flex justify-center pb-8">
            <GreenButton href={`/`}>
              サークル一覧へ戻る
            </GreenButton>
          </div>

          <h2 className="text-center font-bold mb-8 text-lg">どのサークルを脱退しますか？</h2>

          <div>
            {circles && circles.length > 0 ? (
              <CircleWithdrawalList
                circles={circles}
                onWithdrawal={onWithdrawal}
              />
            ) : ''}
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
