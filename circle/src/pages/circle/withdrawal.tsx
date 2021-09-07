import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { CircleWithdrawalList } from '@/src/components/organisms/List/CircleWithdrawalList'
import { AuthContext } from '@/src/contexts/AuthContext'
import { getCircleList, withdrawalOwnCircle } from '@/src/lib/infra/api/circle'
import { Circle } from '@/src/lib/types/model/Circle'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
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

    await withdrawalOwnCircle(circleId)

    setIsOpen(false)

    // 全てのサークルから脱退したとき、ログアウトする
    if (circles && circles.length > 1) {
      await router.push('/')
    } else {
      await router.push('/logout')
    }
  }

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faBuilding} className="mr-4" size="lg" />
          <span className="text-red-600">サークルを脱退する</span>
        </h1>

        <SubmitLoading isOpen={isOpen} />

        <div className="pt-8 pb-32 md:pb-72">
          <div className="flex justify-center pb-8">
            <GreenButton href={`/`} rounded>
              サークル一覧へ戻る
            </GreenButton>
          </div>

          <h2 className="mb-8 text-lg font-bold text-center">
            どのサークルを脱退しますか？
          </h2>

          <div>
            {circles && circles.length > 0 ? (
              <CircleWithdrawalList
                circles={circles}
                onWithdrawal={onWithdrawal}
              />
            ) : (
              ''
            )}
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
