import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleUserRelationListItem } from '@/components/molecules/list_items/CircleUserRelationListItem'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useSuccess } from '@/src/hooks/useSuccess'
import { getCircleListByUserId } from '@/src/lib/infra/api/circle'
import { deleteRelationBetweenUserAndCircle } from '@/src/lib/infra/api/circle_user'
import { Circle } from '@/src/lib/types/model/Circle'

const IndexPage: NextPage = () => {
  const { success, setSuccess } = useSuccess('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { userId } = router.query
  const { isMd } = useMediaQuery()

  const { data } = useSWR(
    `/circle/${userId}/index`,
    async () => await getCircleListByUserId(Number(userId))
  )

  const onDeleteRelation = async ({ circleId }: { circleId: number }) => {
    const data = await deleteRelationBetweenUserAndCircle(
      Number(userId),
      circleId
    )

    if (data && data.type === 'ValidationError') {
      setError(data.errors.data)
      return
    }

    mutate(`/circle/${userId}/index`)
    setSuccess('連携解除に成功しました', 3000)
  }

  const circles = data ? data.circles : []
  const user = data ? data.user : null

  return (
    <div>
      <Head>
        <title>所属サークル追加</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title={
            user ? `${user.displayName}さんの所属サークル` : '所属サークル'
          }
          actionText="所属サークル追加"
          actionHref="/user/circle/[userId]/relation"
          actionAs={`/user/circle/${userId}/relation`}
        >
          {success ? <SuccessBunner text={success} /> : ''}
          {error ? <DangerBunner text={error} /> : ''}

          <div className="p-2 border-2 border-gray-800">
            {circles.length > 0
              ? circles.map((circle: Circle) => {
                return (
                  <CircleUserRelationListItem
                    key={`circle-${circle.id}`}
                    circle={circle}
                    userId={Number(userId)}
                    onDeleteRelation={onDeleteRelation}
                  />
                )
              })
              : ''}

            {circles.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだサークルが登録されていません</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
