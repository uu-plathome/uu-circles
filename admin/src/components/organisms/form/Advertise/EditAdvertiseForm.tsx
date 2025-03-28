import { FC, FormEvent } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { AdvertiseMainImageInput } from '@/src/components/atoms/form/AdvertiseMainImageInput'
import { BaseDate } from '@/src/components/atoms/form/BaseDate'
import { BaseSelect } from '@/src/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import {
  UseBooleanInput,
  UseDateInput,
  UseStringInput,
} from '@/src/hooks/useInput'
import { __ } from '@/src/lang/ja'
import { AdvertiseType } from '@/src/lib/enum/api/AdvertiseType'

type Props = {
  onDropMainImage(acceptedFiles: any): void
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    title: UseStringInput
    link: UseStringInput
    mainImageUrl: UseStringInput
    active: UseBooleanInput
    advertiseType: UseStringInput
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

      <BaseSelect
        label="広告種類"
        id="advertise_type"
        name="advertise_type"
        items={[
          {
            value: AdvertiseType.COMMON,
            label: __(AdvertiseType.COMMON, 'advertiseType'),
          },
          {
            value: AdvertiseType.MAIN_TOP,
            label: __(AdvertiseType.MAIN_TOP, 'advertiseType'),
          },
        ]}
        {...form.advertiseType}
      />

      <BaseDate
        label="公開開始日時"
        name="publishFrom"
        id="publishFrom"
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

      <div className="mt-8 flex justify-center">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { EditAdvertiseForm }
