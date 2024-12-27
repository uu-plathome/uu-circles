import { FC, FormEvent } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseDatetime } from '@/src/components/atoms/form/BaseDatetime'
import { BaseSelect } from '@/src/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { BaseTextarea } from '@/src/components/atoms/form/BaseTextarea'
import { FormHeader } from '@/src/components/atoms/header/FormHeader'
import {
  UseBooleanInput,
  UseDateInput,
  UseStringInput,
} from '@/src/hooks/useInput'
import { __ } from '@/src/lang/ja'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { Importance } from '@/src/lib/enum/api/Importance'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    title: UseStringInput
    description: UseStringInput
    link: UseStringInput
    announcementType: UseStringInput
    importance: UseStringInput
    // slug は api が生成する値で、ユーザーは入力できない
    forMainView: UseBooleanInput
    active: UseBooleanInput
    isMainViewFixed: UseBooleanInput
    publishFrom: UseDateInput
    publishTo: UseDateInput
  }
}
const CreateAnnouncementForm: FC<Props> = ({ onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormHeader>基本設定</FormHeader>

      <BaseTextField
        label="お知らせタイトル"
        name="title"
        id="title"
        required
        expand
        maxLength={50}
        {...form.title}
      />

      <BaseTextField
        label="お知らせリンク"
        name="link"
        id="link"
        expand
        maxLength={255}
        placeholder="https://example.com"
        {...form.link}
      />

      <BaseSelect
        label="お知らせ種類"
        id="announcement_type"
        name="announcement_type"
        required
        items={[
          {
            value: AnnouncementType.MAINTENANCE,
            label: __(AnnouncementType.MAINTENANCE, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.UPDATE_FEATURE,
            label: __(AnnouncementType.UPDATE_FEATURE, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.BUG,
            label: __(AnnouncementType.BUG, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.NEW_CIRCLE,
            label: __(AnnouncementType.NEW_CIRCLE, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.EVENT,
            label: __(AnnouncementType.EVENT, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.QUESTIONNAIRE,
            label: __(AnnouncementType.QUESTIONNAIRE, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.ADVERTISE,
            label: __(AnnouncementType.ADVERTISE, 'AnnouncementType'),
          },
          {
            value: AnnouncementType.UU_YELL,
            label: __(AnnouncementType.UU_YELL, 'AnnouncementType'),
          },
        ]}
        {...form.announcementType}
      />

      <BaseSelect
        label="重要度"
        id="importance"
        name="importance"
        required
        items={[
          {
            value: Importance.HIGH,
            label: __(Importance.HIGH, 'Importance'),
          },
          {
            value: Importance.MIDDLE,
            label: __(Importance.MIDDLE, 'Importance'),
          },
          {
            value: Importance.LOW,
            label: __(Importance.LOW, 'Importance'),
          },
        ]}
        {...form.importance}
      />

      <BaseTextarea
        label="お知らせ内容"
        name="description"
        id="description"
        expand
        maxLength={500}
        {...form.description}
      />

      <div className="grid md:grid-cols-2 md:gap-4">
        <div>
          <FormHeader>メイン画面</FormHeader>

          <BaseSelect
            label="メイン画面に表示するかどうか"
            id="forMainView"
            name="forMainView"
            required
            items={[
              { value: 'true', label: '表示する' },
              { value: 'false', label: '表示しない' },
            ]}
            {...form.forMainView}
          />

          <BaseSelect
            label="メイン画面に固定表示するかどうか"
            id="isMainViewFixed"
            name="isMainViewFixed"
            required
            items={[
              { value: 'true', label: '固定表示する' },
              { value: 'false', label: '表示しない' },
            ]}
            {...form.isMainViewFixed}
          />
        </div>
      </div>

      <FormHeader>公開設定</FormHeader>

      <BaseSelect
        label="公開設定"
        id="active"
        name="active"
        required
        items={[
          { value: 'true', label: '公開' },
          { value: 'false', label: '非公開' },
        ]}
        {...form.active}
      />

      <BaseDatetime
        label="公開開始日時"
        name="publishFrom"
        id="publishFrom"
        {...form.publishFrom}
      />

      <BaseDatetime
        label="公開終了日時"
        name="publishTo"
        id="publishTo"
        {...form.publishTo}
      />

      <div className="mt-8 flex justify-center">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { CreateAnnouncementForm }
