import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { CircleNameHeader } from '@/components/organisms/Circle/CircleNameHeader'
import { IndexCircleNewJoyList } from '@/components/organisms/CircleNewjoy/IndexCircleNewJoyList'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleNewJoyList } from '@/infra/api/circleNewjoy'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
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
  const [circle, setCircle] = useState<Circle>()
  const [circleNewjoys, setCircleNewjoys] = useState<CircleNewJoy[]>()
  const { circleId } = useCircleId()

  useEffect(() => {
    const f = async () => {
      const {
        circle: _circle,
        circleNewJoys: _circleNewJoys,
      } = await getCircleNewJoyList(circleId)
      setCircle(_circle)
      setCircleNewjoys(_circleNewJoys)
    }

    f()
  }, [])

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = circle
    ? [
        ...[
          {
            text: circle.shortName || circle.name,
            href: `/circle/[circleId]`,
            as: `/circle/${circle.id}`,
          },
          {
            text: `新歓イベント一覧`,
            href: `/circle/[circleId]/newjoy`,
            as: `/circle/${circle.id}/newjoy`,
            active: true,
          },
        ],
      ]
    : []

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" size="lg" />
          新歓イベント一覧
        </h1>

        <BaseContainer>
          <div className="pt-8 pb-32">
            {circle ? (
              <div>
                <p className="py-8 px-4">
                  <Link
                    href="/circle/[circleId]"
                    as={`/circle/${Number(circleId)}`}
                  >
                    <a className="underline text-blue-500">← サークルに戻る</a>
                  </Link>
                </p>

                <div className="flex justify-center">
                  <GreenButton
                    href={`/circle/[circleId]/newjoy/create`}
                    as={`/circle/${Number(circleId)}/newjoy/create`}
                  >
                    新規作成
                  </GreenButton>
                </div>

                {circleNewjoys && circleNewjoys.length > 0 ? (
                  <div>
                    <h2 className="text-lg font-bold text-center pt-10 pb-6">
                      予定している新歓一覧
                    </h2>

                    <IndexCircleNewJoyList
                      circleId={circleId}
                      circleNewJoys={circleNewjoys}
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className="mt-32 border-t border-gray-300">
                  <CircleNameHeader circle={circle} />
                </div>
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
