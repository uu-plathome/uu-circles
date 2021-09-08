import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect, SelectItem } from '@/components/atoms/form/BaseSelect'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useNumberInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getCircleList, getCircleListByUserId } from '@/src/lib/infra/api/circle'
import { createRelationBetweenUserAndCircle } from '@/src/lib/infra/api/circle_user'
import { Circle } from '@/src/lib/types/model/Circle'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const [selectItems, setSelectItems] = useState<SelectItem[]>([])
  const { userId } = router.query
  const [error, setError] = useState<string>('')
  const circleId = useNumberInput(0)
  const { isMd } = useMediaQuery()

  useEffect(() => {
    const f = async () => {
      const relationedCircles = await getCircleListByUserId(Number(userId))
      const allCircles = await getCircleList()

      const relationedCirclesIds = relationedCircles.circles.map(
        (circle: Circle) => circle.id
      )
      const newSelectItems = [
        { value: 0, label: '選択してください' },
        ...allCircles
          .filter((circle: Circle) => !relationedCirclesIds.includes(circle.id))
          .map(
            (circle: Circle) =>
            ({
              value: circle.id,
              label: circle.name,
            } as SelectItem)
          ),
      ]
      setSelectItems(newSelectItems)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (circleId.toNumber === 0) {
      setError('サークルを選択してください')
      return
    }

    const data = await createRelationBetweenUserAndCircle(
      Number(userId),
      circleId.toNumber
    )

    if (data && data.type === 'ValidationError') {
      setError(data.errors.data)
      return
    }

    await router.push(`/user/circle/${userId}`)
  }

  return (
    <div>
      <Head>
        <title>サークルと連携する</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="サークルと連携する">
          <div className="py-4 px-2 border-2 border-gray-800">
            {error ? <DangerBunner text={error} /> : ''}

            {selectItems.length > 0 ? (
              <form onSubmit={onSubmit}>
                <BaseSelect
                  id="circleId"
                  name="circleId"
                  label="サークルと連携する"
                  required
                  items={selectItems}
                  {...circleId}
                />

                <div className="flex justify-center mt-8">
                  <GreenButton type="submit">追加</GreenButton>
                </div>
              </form>
            ) : (
              'loading...'
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
