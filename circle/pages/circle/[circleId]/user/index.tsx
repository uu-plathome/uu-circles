import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { CircleNameHeader } from '@/components/organisms/Circle/CircleNameHeader'
import { IndexCircleUserList } from '@/components/organisms/CircleUser/IndexCircleUserList'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleUserList } from '@/infra/api/circleUser'
import { Circle } from '@/lib/types/model/Circle'
import { User } from '@/lib/types/model/User'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
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
  const [users, setUsers] = useState<User[]>()
  const [circle, setCircle] = useState<Circle>()
  const { circleId } = useCircleId()

  useEffect(() => {
    const f = async () => {
      const data = await getCircleUserList(circleId)
      setUsers(data.users)
      setCircle(data.circle)
    }

    f()
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          部員アカウント一覧
        </h1>

        <BaseContainer>
          <div className="pt-8 pb-32">
            {circle ? (
              <p className="px-4 pt-8 pb-4">
                <Link
                  href="/circle/[circleId]"
                  as={`/circle/${Number(circleId)}`}
                >
                  <a className="underline text-blue-500">← サークルに戻る</a>
                </Link>
              </p>
            ) : (
              ''
            )}

            {users ? (
              <div>
                <div className="flex justify-center mb-8">
                  <GreenButton
                    href={`/circle/[circleId]/user/create`}
                    as={`/circle/${Number(circleId)}/user/create`}
                  >
                    新規部員アカウント作成
                  </GreenButton>
                </div>

                <div className="flex justify-center">
                  <GreenButton
                    href={`/circle/[circleId]/user/import`}
                    as={`/circle/${Number(circleId)}/user/import`}
                  >
                    既存部員アカウント招待
                  </GreenButton>
                </div>

                {users && users.length > 0 ? (
                  <div className="pt-8">
                    <IndexCircleUserList circleId={circleId} users={users} />
                  </div>
                ) : (
                  ''
                )}

                {circle ? (
                  <div className="mt-32 border-t border-gray-300">
                    <CircleNameHeader circle={circle} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
