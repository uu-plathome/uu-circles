import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import {
  BaseCheckBox,
  CheckBoxItem,
} from '@/components/atoms/form/BaseCheckBox'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { __ } from '@/src/lang/ja'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { createOrUpdateCircleTag, getCircleTag } from '@/src/lib/infra/api/circle_tag'
import { isCreateOrUpdateCircleTagRequestValidationError } from '@/src/lib/types/api/CreateOrUpdateCircleTagRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

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
      {
        label: __(CircleTagModel.URGENT_RECRUITMENT),
        value: CircleTagModel.URGENT_RECRUITMENT,
        checked: false,
      },
      {
        label: __(CircleTagModel.MYSTERY),
        value: CircleTagModel.MYSTERY,
        checked: false,
      },
    ]

    const f = async () => {
      const { circleTag: pastCircleTag } = await getCircleTag(Number(id))
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
          CircleTagModel.URGENT_RECRUITMENT,
          CircleTagModel.MYSTERY,
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
      setCircleTag(filterPastCircleTag)
      setCheckBoxItems(newCheckBoxItemsAdjustPastItem)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createOrUpdateCircleTag(Number(id), circleTag)

    if (isCreateOrUpdateCircleTagRequestValidationError(data)) {
      setErrors(data.errors.circleTag)
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    await router.push(`/circle`)
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

  return (
    <div>
      <Head>
        <title>サークルタグ管理</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper title="サークルタグ管理">
          <div className="py-4 px-2 border-2 border-gray-800">
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
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
