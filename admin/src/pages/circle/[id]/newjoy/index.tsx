import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { DangerBunner } from '@/src/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/src/components/atoms/bunner/SuccessBunner'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { CircleNewJoyListItem } from '@/src/components/molecules/list_items/CircleNewJoyListItem'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useSuccess } from '@/src/hooks/useSuccess'
import {
  getCircleNewJoyList,
  deleteCircleNewJoy,
  copyCircleNewJoy,
} from '@/src/lib/infra/api/cirecle_new_joy'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [circle, setCircle] = useState<Circle | null>(null)
  const [circleNewJoys, setCircleNewJoys] = useState<CircleNewJoy[]>([])
  const { success, setSuccess } = useSuccess('')
  const [error, setError] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const { isMd } = useMediaQuery()

  // 新歓一覧の取得
  const fetchCircle = async () => {
    const { circle, circleNewJoys: _circleNewJoys } = await getCircleNewJoyList(
      Number(id)
    )
    setCircle(circle)
    setCircleNewJoys(_circleNewJoys.map((c) => c.circleNewJoy))
  }

  useSWR([`/admin/api/circle/${id}/newjoy`, Number(id)], fetchCircle)

  // 新歓のコピー
  const onCopy = async (circleNewJoyId: number) => {
    setSuccess('')
    setError('')
    setIsOpen(true)

    const data = await copyCircleNewJoy(Number(id), circleNewJoyId)

    if (data && data.type === 'Success') {
      setSuccess('新歓のコピーに成功しました', 3000)
      await fetchCircle()
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    setError('エラーが発生しました')
  }

  // 新歓の削除
  const onDelete = async (circleNewJoyId: number) => {
    setSuccess('')
    setError('')
    setIsOpen(true)
    const data = await deleteCircleNewJoy(Number(id), circleNewJoyId)

    if (data && data.type === 'Success') {
      setSuccess('新歓の削除に成功しました', 3000)
      await fetchCircle()
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    setError('エラーが発生しました')
  }

  return (
    <div>
      <Head>
        <title>新歓新規作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper
          title={circle && circle.name ? `${circle.name}の新歓` : 'loading...'}
          actionText="新歓新規作成"
          actionHref="/circle/[id]/newjoy/create"
          actionAs={`/circle/${id}/newjoy/create`}
        >
          <div className="border-2 border-gray-800 p-2">
            {success ? <SuccessBunner text={success} /> : ''}

            {error ? <DangerBunner text={error} /> : ''}

            {circle && circleNewJoys.length > 0
              ? circleNewJoys.map((circleNewJoy: CircleNewJoy) => {
                  return (
                    <CircleNewJoyListItem
                      key={`circle-${circleNewJoy.circleNewJoyId}`}
                      circle={circle}
                      circleNewJoy={circleNewJoy}
                      onCopy={onCopy}
                      onDelete={onDelete}
                    />
                  )
                })
              : ''}
            {circleNewJoys.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだ新歓が登録されていません</p>
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
