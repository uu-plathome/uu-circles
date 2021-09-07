import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { CircleNameHeader } from '@/src/components/organisms/Circle/CircleNameHeader'
import { IndexCircleUserList } from '@/src/components/organisms/CircleUser/IndexCircleUserList'
import { AuthContext } from '@/src/contexts/AuthContext'
import { getCircleUserList } from '@/src/lib/infra/api/circleUser'
import { Circle } from '@/src/lib/types/model/Circle'
import { User } from '@/src/lib/types/model/User'

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
  const [circleUsersDoneEmailVerify, setCircleUsersDoneEmailVerify] =
    useState<User[]>()
  const [circleUsersNotDoneEmailVerify, setCircleUsersNotDoneEmailVerify] =
    useState<User[]>()
  const [circle, setCircle] = useState<Circle>()
  const { circleId } = useCircleId()

  useEffect(() => {
    const f = async () => {
      const data = await getCircleUserList(circleId)
      setCircleUsersDoneEmailVerify(data.circleUsersDoneEmailVerify)
      setCircleUsersNotDoneEmailVerify(data.circleUsersNotDoneEmailVerify)
      setCircle(data.circle)
    }

    f()
  }, [])

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle
      ? [
          ...[
            {
              text: circle.shortName || circle.name,
              href: `/circle/[circleId]`,
              as: `/circle/${circle.id}`,
            },
            {
              text: `部員アカウント一覧`,
              href: `/circle/[circleId]/user`,
              as: `/circle/${circle.id}/user`,
              active: true,
            },
          ],
        ]
      : []
  }, [circle])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          部員アカウント一覧
        </h1>

        <BaseContainer>
          <div className="pb-32">
            {circle ? (
              <p className="py-8 px-4">
                <Link
                  href="/circle/[circleId]"
                  as={`/circle/${Number(circleId)}`}
                >
                  <a className="text-blue-500 underline">←サークルに戻る</a>
                </Link>
              </p>
            ) : (
              ''
            )}

            {circleUsersDoneEmailVerify ? (
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

                {circleUsersDoneEmailVerify &&
                circleUsersDoneEmailVerify.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      認証済みの部員アカウント一覧
                    </h2>

                    <IndexCircleUserList
                      circleId={circleId}
                      users={circleUsersDoneEmailVerify}
                    />
                  </div>
                ) : (
                  ''
                )}

                {circleUsersNotDoneEmailVerify &&
                circleUsersNotDoneEmailVerify.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      未認証の部員アカウント一覧
                    </h2>

                    <IndexCircleUserList
                      circleId={circleId}
                      users={circleUsersNotDoneEmailVerify}
                    />
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
