import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseDatetime } from '@/components/atoms/form/BaseDatetime'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseTextarea } from '@/components/atoms/form/BaseTextarea'
import { FormHeader } from '@/components/atoms/header/FormHeader'
import { UseBooleanInput, UseDateInput, UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { DemoCircleNewjoyType } from '@/lib/enum/api/DemoCircleNewjoyType'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { FC, FormEvent } from 'react'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  circle: {
    name: string
    shortName: string
  }
  form: {
    published: UseBooleanInput
    title: UseStringInput
    url: UseStringInput
    description: UseStringInput
    placeOfActivity: UseStringInput
    placeOfActivityDetail: UseStringInput
    demoCircleNewjoyType: UseStringInput
    startDate: UseDateInput
    endDate: UseDateInput
  }
}
const CreateDemoCircleNewJoyForm: FC<Props> = ({ onSubmit, circle, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormHeader>新歓基本情報</FormHeader>

      <div className="mb-8">
        <BaseTextField
          label="新歓名"
          name="title"
          id="title"
          maxLength={30}
          prefix={circle.shortName || circle.name}
          expand
          required
          {...form.title}
        />

        <BaseTextarea
          label="新歓説明"
          name="description"
          id="description"
          expand
          maxLength={150}
          {...form.description}
        />

        <BaseSelect
          required
          label="活動場所"
          id="placeOfActivity"
          name="placeOfActivity"
          items={[
            {
              value: PlaceOfActivity.NEWJOY_DISCORD,
              label: __(PlaceOfActivity.NEWJOY_DISCORD),
            },
            {
              value: PlaceOfActivity.MINE,
              label: __(PlaceOfActivity.MINE),
            },
            {
              value: PlaceOfActivity.YOTO,
              label: __(PlaceOfActivity.YOTO),
            },
            {
              value: PlaceOfActivity.ZOOM,
              label: __(PlaceOfActivity.ZOOM),
            },
            {
              value: PlaceOfActivity.DISCORD,
              label: __(PlaceOfActivity.DISCORD),
            },
            {
              value: PlaceOfActivity.OTHER,
              label: __(PlaceOfActivity.OTHER),
            },
          ]}
          {...form.placeOfActivity}
        />

        {form.placeOfActivity.value !== PlaceOfActivity.NEWJOY_DISCORD ? (
          <BaseTextField
            label="新歓活動場所詳細"
            name="placeOfActivityDetail"
            id="placeOfActivityDetail"
            expand
            maxLength={100}
            {...form.placeOfActivityDetail}
          />
        ) : (
          ''
        )}

        <BaseDatetime
          label="新歓開始日時"
          name="startDate"
          id="startDate"
          required
          {...form.startDate}
        />

        <BaseDatetime
          label="新歓終了日時"
          name="endDate"
          id="endDate"
          {...form.endDate}
        />

        <BaseTextField
          label="新歓URL (WEB公開用)"
          name="url"
          id="url"
          placeholder="https://ulab-uu.com/"
          expand
          maxLength={255}
          note="新歓の告知で使うURLをはってください。(Twitterなど)。zoomは安全上、控えてください"
          {...form.url}
        />
      </div>

      <FormHeader>公開設定</FormHeader>

      <div className="mb-8">
        <BaseSelect
          label="公開設定"
          id="release"
          name="release"
          items={[
            { value: 'true', label: '公開' },
            { value: 'false', label: '非公開' },
          ]}
          {...form.published}
        />

        <BaseSelect
          required
          label="デモ新歓タイプ"
          id="demoCircleNewjoyType"
          name="demoCircleNewjoyType"
          items={[
            {
              value: DemoCircleNewjoyType.FUTURE,
              label: __(DemoCircleNewjoyType.FUTURE),
            },
            {
              value: DemoCircleNewjoyType.NOW,
              label: __(DemoCircleNewjoyType.NOW),
            },
            {
              value: DemoCircleNewjoyType.TODAY,
              label: __(DemoCircleNewjoyType.TODAY),
            },
          ]}
          {...form.demoCircleNewjoyType}
        />
      </div>

      <div className="flex justify-center">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { CreateDemoCircleNewJoyForm }
