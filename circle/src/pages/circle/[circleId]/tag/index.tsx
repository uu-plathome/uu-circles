import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import {
  BaseCheckBox,
  CheckBoxItem,
} from '@/src/components/atoms/form/BaseCheckBox'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { AuthContext } from '@/src/contexts/AuthContext'
import { __ } from '@/src/lang/ja'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { createOrUpdateCircleTag, getCircleTag } from '@/src/lib/infra/api/circleTag'
import { isCreateOrUpdateCircleTagRequestValidationError } from '@/src/lib/types/api/CreateOrUpdateCircleTagRequest'
import { Circle } from '@/src/lib/types/model/Circle'

const useParams = () => {
  const router = useRouter()
  const { circleId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
  }
}

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const { circleId } = useParams()
  const [isOpen, setIsOpen] = useState(true)

  const [circle, setCircle] = useState<Circle>()
  const [circleTag, setCircleTag] = useState<CircleTagModel[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [checkBoxItems, setCheckBoxItems] = useState<CheckBoxItem[]>([])

  useEffect(() => {
    const newCheckBoxItems = [
      {
        label: __(CircleTagModel.SPORT),
        value: CircleTagModel.SPORT,
        checked: false,
      },
      {
        label: __(CircleTagModel.MUSIC),
        value: CircleTagModel.MUSIC,
        checked: false,
      },
      {
        label: __(CircleTagModel.CULTURE),
        value: CircleTagModel.CULTURE,
        checked: false,
      },
      {
        label: __(CircleTagModel.NATURE),
        value: CircleTagModel.NATURE,
        checked: false,
      },
      {
        label: __(CircleTagModel.VOLUNTEER),
        value: CircleTagModel.VOLUNTEER,
        checked: false,
      },
      {
        label: __(CircleTagModel.INCARE),
        value: CircleTagModel.INCARE,
        checked: false,
      },
      {
        label: __(CircleTagModel.INTERNATIONAL),
        value: CircleTagModel.INTERNATIONAL,
        checked: false,
      },
      {
        label: __(CircleTagModel.LOOSE),
        value: CircleTagModel.LOOSE,
        checked: false,
      },
      {
        label: __(CircleTagModel.COMMUNITY),
        value: CircleTagModel.COMMUNITY,
        checked: false,
      },
      {
        label: __(CircleTagModel.PROGRAMMING),
        value: CircleTagModel.PROGRAMMING,
        checked: false,
      },
    ]

    const f = async () => {
      const { circle: fetchedCircle, circleTag: pastCircleTag } =
        await getCircleTag(circleId)
      const filterPastCircleTag = pastCircleTag.filter((_tag) => {
        return [
          CircleTagModel.SPORT,
          CircleTagModel.MUSIC,
          CircleTagModel.CULTURE,
          CircleTagModel.NATURE,
          CircleTagModel.VOLUNTEER,
          CircleTagModel.INCARE,
          CircleTagModel.INTERNATIONAL,
          CircleTagModel.LOOSE,
          CircleTagModel.COMMUNITY,
          CircleTagModel.PROGRAMMING,
        ].includes(_tag as any)
      })

      const newCheckBoxItemsAdjustPastItem = newCheckBoxItems.map(
        (_checkBoxItem) =>
        ({
          value: _checkBoxItem.value,
          label: _checkBoxItem.label,
          checked: filterPastCircleTag.includes(_checkBoxItem.value),
        } as CheckBoxItem)
      )
      setCircle(fetchedCircle)
      setCircleTag(filterPastCircleTag)
      setCheckBoxItems(newCheckBoxItemsAdjustPastItem)
      setIsOpen(false)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createOrUpdateCircleTag(Number(circleId), circleTag)

    if (isCreateOrUpdateCircleTagRequestValidationError(data)) {
      setErrors(data.errors.circleTag)
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    await router.push(`/circle/${circleId}`)
  }

  const onUpdate = (e: any) => {
    let newCircleTag = []
    if (circleTag.includes(e.target.value)) {
      newCircleTag = circleTag.filter(
        (_circleTag) => _circleTag !== e.target.value
      )
    } else {
      newCircleTag = [...circleTag, e.target.value]
    }
    setCircleTag(newCircleTag)

    const newCheckBoxItems = checkBoxItems.map(
      (_checkBoxItem) =>
      ({
        value: _checkBoxItem.value,
        label: _checkBoxItem.label,
        checked: newCircleTag.includes(_checkBoxItem.value),
      } as CheckBoxItem)
    )
    setCheckBoxItems(newCheckBoxItems)
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle && circle
      ? [
        ...[
          {
            text: circle.shortName || circle.name,
            href: `/circle/[circleId]`,
            as: `/circle/${circle.id}`,
          },
          {
            text: `サークルタグ管理`,
            href: `/circle/[circleId]/tag`,
            as: `/circle/${circle.id}/tag`,
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
          <FontAwesomeIcon icon={faTag} className="mr-4" size="lg" />
          サークルタグ管理
        </h1>

        <SubmitLoading isOpen={isOpen} />

        <BaseContainer>
          <div className="px-2 pt-8 pb-32">
            <p className="py-8 px-4">
              <Link
                href="/circle/[circleId]"
                as={`/circle/${Number(circleId)}`}
              >
                <a className="text-blue-500 underline">←サークルに戻る</a>
              </Link>
            </p>

            <div className="py-4 px-2">
              <form onSubmit={onSubmit}>
                <BaseCheckBox
                  id="circle_tag"
                  name="circle_tag"
                  label="サークルタグ"
                  error={errors && Array.isArray(errors) ? errors[0] : ''}
                  items={checkBoxItems}
                  onChange={(e) => onUpdate(e)}
                />

                <div className="flex justify-center">
                  <GreenButton type="submit">更新</GreenButton>
                </div>
              </form>
            </div>
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
