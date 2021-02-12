import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseCheckBox, CheckBoxItem } from '@/components/atoms/form/BaseCheckBox'
import { createOrUpdateCircleTag } from '@/infra/api/circle_tag'
import { isCreateOrUpdateCircleTagRequestValidationError } from '@/lib/types/api/CreateOrUpdateCircleTagRequest'
import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { __ } from '@/lang/ja'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [ circleTag, setCircleTag ] = useState<CircleTagModel[]>([])
    const [ errors, setErrors ] = useState<string[]>([])
    const [ checkBoxItems, setCheckBoxItems ] = useState<CheckBoxItem[]>([])

    useEffect(() => {
        const newCheckBoxItems = [
            { label: __(CircleTagModel.NATURE), value: CircleTagModel.NATURE, checked: false },
            { label: __(CircleTagModel.VOLUNTEER), value: CircleTagModel.VOLUNTEER, checked: false },
            { label: __(CircleTagModel.INCARE), value: CircleTagModel.INCARE, checked: false },
            { label: __(CircleTagModel.INTERNATIONAL), value: CircleTagModel.INTERNATIONAL, checked: false },
            { label: __(CircleTagModel.LOOSE), value: CircleTagModel.LOOSE, checked: false },
            { label: __(CircleTagModel.COMMUNITY), value: CircleTagModel.COMMUNITY, checked: false },
            { label: __(CircleTagModel.PROGRAMMING), value: CircleTagModel.PROGRAMMING, checked: false },
            { label: __(CircleTagModel.URGENT_RECRUITMENT), value: CircleTagModel.URGENT_RECRUITMENT, checked: false },
            { label: __(CircleTagModel.MYSTERY), value: CircleTagModel.MYSTERY, checked: false },
        ];

        setCheckBoxItems(newCheckBoxItems)
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createOrUpdateCircleTag(
            Number(id),
            circleTag
        )

        if (isCreateOrUpdateCircleTagRequestValidationError(data)) {
            setErrors(data.errors.circleTag)

            return
        }

        await router.push(`/circle`)
    }

    const onUpdate = (e: any) => {
        let newCircleTag = []
        if (circleTag.includes(e.target.value)) {
            newCircleTag = circleTag.filter((_circleTag) => _circleTag !== e.target.value)
        } else {
            newCircleTag = [
                ...circleTag,
                e.target.value
            ]
        }
        setCircleTag(newCircleTag)

        const newCheckBoxItems = checkBoxItems.map((_checkBoxItem) => ({
            value: _checkBoxItem.value,
            label: _checkBoxItem.label,
            checked: newCircleTag.includes(_checkBoxItem.value),
        } as CheckBoxItem))
        setCheckBoxItems(newCheckBoxItems)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークルタグ管理"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">

                        <form onSubmit={onSubmit}>
                            <BaseCheckBox
                                id="circle_tag"
                                name="circle_tag"
                                label="サークルタグ"
                                error={errors && Array.isArray(errors) ? errors[0] : ''}
                                required
                                items={checkBoxItems}
                                onChange={(e) => onUpdate(e)}
                            />

                            <div className="flex justify-center">
                                <GreenButton type="submit">
                                    更新
                                </GreenButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage