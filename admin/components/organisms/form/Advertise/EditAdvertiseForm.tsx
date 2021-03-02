import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { AdvertiseMainImageInput } from '@/components/atoms/form/AdvertiseMainImageInput'
import { BaseDate } from '@/components/atoms/form/BaseDate'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseBooleanInput, UseDateInput, UseStringInput } from '@/hooks/useInput'
import { FC, FormEvent } from 'react'

type Props = {
    onDropMainImage(acceptedFiles: any): void
    onSubmit(e: FormEvent<HTMLFormElement>): void
    form: {
        title: UseStringInput
        link: UseStringInput
        mainImageUrl: UseStringInput
        active: UseBooleanInput
        publishTo: UseDateInput
        publishFrom: UseDateInput
    }
}
const EditAdvertiseForm: FC<Props> = ({ onSubmit, onDropMainImage, form }) => {
    return (
        <form onSubmit={onSubmit}>
            <BaseTextField
                label="広告タイトル"
                name="title"
                id="title"
                required
                expand
                maxLength={50}
                {...form.title}
            />

            <BaseTextField
                label="広告リンク"
                name="link"
                id="link"
                expand
                maxLength={255}
                placeholder="https://example.com"
                {...form.link}
            />

            <BaseSelect
                label="公開設定"
                id="active"
                name="active"
                items={[
                    { value: 'true', label: '公開' },
                    { value: 'false', label: '非公開' },
                ]}
                {...form.active}
            />

            <BaseDate
                label="公開開始日時"
                name="publishFrom"
                id="publishFrom"
                required
                {...form.publishFrom}
            />

            <BaseDate
                label="公開終了日時"
                name="publishTo"
                id="publishTo"
                {...form.publishTo}
            />

            <AdvertiseMainImageInput
                label="広告画像"
                id="mainImageUrl"
                preview={
                    form.mainImageUrl.value
                        ? form.mainImageUrl.value
                        : `/images/no-image.png`
                }
                onDrop={onDropMainImage}
                error={form.mainImageUrl.error}
            />

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">進む</GreenButton>
            </div>
        </form>
    )
}

export { EditAdvertiseForm }
