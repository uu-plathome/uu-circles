import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { FormHeader } from '@/components/atoms/header/FormHeader'
import {
  UseBooleanInput,
  UseStringInput,
} from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { FC, FormEvent } from 'react'
import { CommonInfoEditCircleForm, Props as CommonInfoEditCircleFormProps } from './Parts/CommonInfoEditCircleForm'
import { NameEditCircleForm, Props as NameEditCircleFormProps } from './Parts/NameEditCircleForm'

type Props = {
  onDropMainImage(acceptedFiles: any): void
  onDropHandbillImage(acceptedFiles: any): void
  onDropActivityImage(acceptedFiles: any, idx: 1|2|3|4|5|6): void
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    release: UseBooleanInput
    commonPlaceOfActivity: UseStringInput
    commonPlaceOfActivityDetail: UseStringInput
    commonDateOfActivityMonday: UseBooleanInput
    commonDateOfActivityTuesday: UseBooleanInput
    commonDateOfActivityWednesday: UseBooleanInput
    commonDateOfActivityThursday: UseBooleanInput
    commonDateOfActivityFriday: UseBooleanInput
    commonDateOfActivitySaturday: UseBooleanInput
    commonDateOfActivitySunday: UseBooleanInput
    commonDateOfActivityDetail: UseStringInput
    isOnlineActivity: UseBooleanInput
    onlinePlaceOfActivityDetail: UseStringInput
    onlineDateOfActivityMonday: UseBooleanInput
    onlineDateOfActivityTuesday: UseBooleanInput
    onlineDateOfActivityWednesday: UseBooleanInput
    onlineDateOfActivityThursday: UseBooleanInput
    onlineDateOfActivityFriday: UseBooleanInput
    onlineDateOfActivitySaturday: UseBooleanInput
    onlineDateOfActivitySunday: UseBooleanInput
    onlineDateOfActivityDetail: UseStringInput
    twitterUrl: UseStringInput
    facebookUrl: UseStringInput
    instagramUrl: UseStringInput
    lineUrl: UseStringInput
    youtubeUrl: UseStringInput
    homepageUrl: UseStringInput
    peingUrl: UseStringInput
    githubUrl: UseStringInput
    tiktokUrl: UseStringInput
    participationUrl: UseStringInput
  } & NameEditCircleFormProps['form'] & CommonInfoEditCircleFormProps['form']
}
const EditCircleForm: FC<Props> = ({ onDropMainImage, onDropHandbillImage, onDropActivityImage, onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>

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
          {...form.release}
        />
      </div>

      <FormHeader>サークル名情報</FormHeader>

      <div className="mb-8">
        <NameEditCircleForm
          form={{
            name: form.name,
            slug: form.slug,
            nameKana: form.nameKana,
            shortName: form.shortName,
            prefixName: form.prefixName,
          }}
        />
      </div>

      <FormHeader>基本情報</FormHeader>

      <div className="mb-8">
        <CommonInfoEditCircleForm
          onDropMainImage={onDropMainImage}
          onDropHandbillImage={onDropHandbillImage}
          onDropActivityImage={onDropActivityImage}
          form={{
            description: form.description,
            intro: form.intro,
            circleType: form.circleType,
            appealingPoint1: form.appealingPoint1,
            appealingPoint2: form.appealingPoint2,
            appealingPoint3: form.appealingPoint3,
            admissionFeePerYear: form.admissionFeePerYear,
            numberOfMembers: form.numberOfMembers,
            publicEmail: form.publicEmail,
            mainImageUrl: form.mainImageUrl,
            handbillImageUrl: form.handbillImageUrl,
            isClubActivities: form.isClubActivities,
            activityImageUrl1: form.activityImageUrl1,
            activityImageUrl2: form.activityImageUrl2,
            activityImageUrl3: form.activityImageUrl3,
            activityImageUrl4: form.activityImageUrl4,
            activityImageUrl5: form.activityImageUrl5,
            activityImageUrl6: form.activityImageUrl6,
          }}
        />
      </div>

      <FormHeader>活動情報</FormHeader>

      <BaseSelect
        label="通常活動場所"
        id="commonPlaceOfActivity"
        name="commonPlaceOfActivity"
        items={[
          ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
            value: _placeOfActivity,
            label: __(_placeOfActivity),
          })),
        ]}
        {...form.commonPlaceOfActivity}
      />

      <BaseTextField
        label="通常活動場所詳細"
        name="placeOfActivityDetail"
        id="placeOfActivityDetail"
        {...form.commonPlaceOfActivityDetail}
      />

      <BaseSelect
        label="月曜日に通常活動しているか"
        id="commonDateOfActivityMonday"
        name="commonDateOfActivityMonday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivityMonday}
      />

      <BaseSelect
        label="火曜日に通常活動しているか"
        id="commonDateOfActivityTuesday"
        name="commonDateOfActivityTuesday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivityTuesday}
      />

      <BaseSelect
        label="水曜日に通常活動しているか"
        id="commonDateOfActivityWednesday"
        name="commonDateOfActivityWednesday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivityWednesday}
      />

      <BaseSelect
        label="木曜日に通常活動しているか"
        id="commonDateOfActivityThursday"
        name="commonDateOfActivityThursday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivityThursday}
      />

      <BaseSelect
        label="金曜日に通常活動しているか"
        id="commonDateOfActivityFriday"
        name="commonDateOfActivityFriday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivityFriday}
      />

      <BaseSelect
        label="土曜日に通常活動しているか"
        id="commonDateOfActivitySaturday"
        name="commonDateOfActivitySaturday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivitySaturday}
      />

      <BaseSelect
        label="日曜日に通常活動しているか"
        id="commonDateOfActivitySunday"
        name="commonDateOfActivitySunday"
        items={[
          { value: 'true', label: '活動している' },
          { value: 'false', label: '活動していない' },
        ]}
        {...form.commonDateOfActivitySunday}
      />

      <BaseTextField
        label="通常活動日時詳細"
        name="commonDateOfActivityDetail"
        id="commonDateOfActivityDetail"
        expand
        {...form.commonDateOfActivityDetail}
      />

      <BaseSelect
        label="オンライン活動しているかどうか"
        id="doOnlineActivity"
        name="doOnlineActivity"
        items={[
          { value: 'true', label: 'オンラインしている' },
          { value: 'false', label: 'オフラインのみ' },
        ]}
        {...form.isOnlineActivity}
      />

      {form.isOnlineActivity.toBoolean ? (
        <div>
          <BaseSelect
            label="月曜日にオンライン活動しているか"
            id="onlineDateOfActivityMonday"
            name="onlineDateOfActivityMonday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivityMonday}
          />

          <BaseSelect
            label="火曜日にオンライン活動しているか"
            id="onlineDateOfActivityTuesday"
            name="onlineDateOfActivityTuesday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivityTuesday}
          />

          <BaseSelect
            label="水曜日にオンライン活動しているか"
            id="onlineDateOfActivityWednesday"
            name="onlineDateOfActivityWednesday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivityWednesday}
          />

          <BaseSelect
            label="木曜日にオンライン活動しているか"
            id="onlineDateOfActivityThursday"
            name="onlineDateOfActivityThursday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivityThursday}
          />

          <BaseSelect
            label="金曜日にオンライン活動しているか"
            id="onlineDateOfActivityFriday"
            name="onlineDateOfActivityFriday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivityFriday}
          />

          <BaseSelect
            label="土曜日にオンライン活動しているか"
            id="onlineDateOfActivitySaturday"
            name="onlineDateOfActivitySaturday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivitySaturday}
          />

          <BaseSelect
            label="日曜日にオンライン活動しているか"
            id="onlineDateOfActivitySunday"
            name="onlineDateOfActivitySunday"
            items={[
              { value: 'true', label: 'オンライン活動している' },
              { value: 'false', label: 'オンライン活動していない' },
            ]}
            {...form.onlineDateOfActivitySunday}
          />

          <BaseTextField
            label="活動日時詳細"
            name="onlineDateOfActivityDetail"
            id="onlineDateOfActivityDetail"
            expand
            {...form.onlineDateOfActivityDetail}
          />
        </div>
      ) : (
        ''
      )}

    <FormHeader>SNS情報</FormHeader>

      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <BaseTextField
            label="Twitter URL"
            name="twitterUrl"
            id="twitterUrl"
            expand
            placeholder="https://twitter.com/"
            {...form.twitterUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Facebook URL"
            name="facebookUrl"
            id="facebookUrl"
            expand
            {...form.facebookUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Instagram URL"
            name="instagramUrl"
            id="instagramUrl"
            expand
            placeholder="https://instagram.com"
            {...form.instagramUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Line URL"
            name="lineUrl"
            id="lineUrl"
            expand
            {...form.lineUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Youtube URL"
            name="youtubeUrl"
            id="youtubeUrl"
            expand
            placeholder="https://youtube.com"
            {...form.youtubeUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Homepage URL"
            name="homepageUrl"
            id="homepageUrl"
            expand
            {...form.homepageUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Peing URL"
            name="peingUrl"
            id="peingUrl"
            expand
            {...form.peingUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="GitHub URL"
            name="githubUrl"
            id="githubUrl"
            expand
            placeholder="https://github.com"
            {...form.githubUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Tiktok URL"
            name="tiktokUrl"
            id="tiktokUrl"
            expand
            {...form.tiktokUrl}
          />
        </div>
      </div>

      <div>
        <BaseTextField
          label="新歓・活動参加用URL"
          name="participationUrl"
          id="participationUrl"
          expand
          note="Google formなどのURL。Zoomを張るのは控えてください。"
          {...form.participationUrl}
        />
      </div>

      <div className="flex justify-center mt-8">
        <GreenButton type="submit">更新</GreenButton>
      </div>
    </form>
  )
}

export { EditCircleForm }
