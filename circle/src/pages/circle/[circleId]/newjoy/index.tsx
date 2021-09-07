import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'
import useSWR from 'swr'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { CircleNameHeader } from '@/src/components/organisms/Circle/CircleNameHeader'
import { IndexCircleNewJoyList } from '@/src/components/organisms/CircleNewjoy/IndexCircleNewJoyList'
import { AuthContext } from '@/src/contexts/AuthContext'
import { getCircleNewJoyList } from '@/src/lib/infra/api/circleNewjoy'

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
  const { circleId } = useCircleId()

  const { data } = useSWR(
    `/circle/${circleId}/newjoy`,
    async () => await getCircleNewJoyList(circleId)
  )

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    if (!data) return []

    const circle = data.circle
    return circle
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
  }, [data])

  const circle = data ? data.circle : null
  const onReleaseFuture = data ? data.onReleaseFuture : []
  const onReleasePast = data ? data.onReleasePast : []
  const onPrivateFuture = data ? data.onPrivateFuture : []
  const onPrivatePast = data ? data.onPrivatePast : []

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" size="lg" />
          新歓イベント一覧
        </h1>

        <BaseContainer>
          <div className="pb-32">
            {circle ? (
              <div>
                <p className="py-8 px-4">
                  <Link
                    href="/circle/[circleId]"
                    as={`/circle/${Number(circleId)}`}
                  >
                    <a className="text-blue-500 underline">← サークルに戻る</a>
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

                {onReleaseFuture && onReleaseFuture.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      予定している公開中の新歓一覧
                    </h2>

                    <IndexCircleNewJoyList
                      circleId={circleId}
                      circleNewJoys={onReleaseFuture}
                    />
                  </div>
                ) : (
                  ''
                )}

                {onPrivateFuture && onPrivateFuture.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      予定している非公開の新歓一覧
                    </h2>

                    <IndexCircleNewJoyList
                      circleId={circleId}
                      circleNewJoys={onPrivateFuture}
                    />
                  </div>
                ) : (
                  ''
                )}

                {onReleasePast && onReleasePast.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      実施済みの公開中の新歓一覧
                    </h2>

                    <IndexCircleNewJoyList
                      circleId={circleId}
                      circleNewJoys={onReleasePast}
                    />
                  </div>
                ) : (
                  ''
                )}

                {onPrivatePast && onPrivatePast.length > 0 ? (
                  <div>
                    <h2 className="pt-10 pb-6 text-lg font-bold text-center">
                      実施済みの非公開の新歓一覧
                    </h2>

                    <IndexCircleNewJoyList
                      circleId={circleId}
                      circleNewJoys={onPrivatePast}
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
