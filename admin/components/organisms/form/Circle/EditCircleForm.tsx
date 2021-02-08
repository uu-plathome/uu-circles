import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseImageInput } from '@/components/atoms/form/BaseImageInput'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import {
  UseBooleanInput,
  UseNumberInput,
  UseStringInput,
} from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { getAllCircleType } from '@/lib/enum/api/CircleType'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { FC, FormEvent } from 'react'

type Props = {
  onDropMainImage(acceptedFiles: any): void
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    release: UseBooleanInput
    name: UseStringInput
    slug: UseStringInput
    nameKana: UseStringInput
    shortName: UseStringInput
    prefixName: UseStringInput
    description: UseStringInput
    intro: UseStringInput
    isClubActivities: UseBooleanInput
    appealingPoint1: UseStringInput
    appealingPoint2: UseStringInput
    appealingPoint3: UseStringInput
    circleType: UseStringInput
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
    admissionFeePerYear: UseNumberInput
    numberOfMembers: UseNumberInput
    publicEmail: UseStringInput
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
    mainImageUrl: UseStringInput
  }
}
const EditCircleForm: FC<Props> = ({ onDropMainImage, onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
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

      <BaseTextField
        label="サークル名"
        name="name"
        id="name"
        required
        expand
        {...form.name}
      />

      <BaseTextField
        label="URLのパス"
        name="slug"
        id="slug"
        placeholder="u-lab"
        required
        expand
        note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
        {...form.slug}
      />

      <BaseTextField
        label="サークル名(かな)"
        name="nameKana"
        id="nameKana"
        expand
        {...form.nameKana}
      />

      <BaseTextField
        label="サークル名(省略名)"
        name="shortName"
        id="shortName"
        expand
        {...form.shortName}
      />

      <BaseTextField
        label="サークル名(肩書)"
        name="prefixName"
        id="prefixName"
        expand
        {...form.prefixName}
      />

      <BaseTextField
        label="サークル短文紹介"
        name="description"
        id="description"
        expand
        {...form.description}
      />

      <BaseTextField
        label="サークル長文紹介"
        name="intro"
        id="intro"
        expand
        {...form.intro}
      />

      <BaseTextField
        label="アピールポイント1"
        name="appealingPoint1"
        id="appealingPoint1"
        expand
        {...form.appealingPoint1}
      />

      <BaseTextField
        label="アピールポイント2"
        name="appealingPoint2"
        id="appealingPoint2"
        expand
        {...form.appealingPoint2}
      />

      <BaseTextField
        label="アピールポイント3"
        name="appealingPoint3"
        id="appealingPoint3"
        expand
        {...form.appealingPoint3}
      />

      <BaseSelect
        label="サークル種別"
        id="circleType"
        name="circleType"
        items={[
          ...getAllCircleType().map((_circleType) => ({
            value: _circleType,
            label: __(_circleType),
          })),
          { value: '', label: '不明' },
        ]}
        {...form.circleType}
      />

      <BaseSelect
        label="部活かどうか"
        id="isClubActivities"
        name="isClubActivities"
        items={[
          { value: 'true', label: '部活' },
          { value: 'false', label: '部活でない' },
        ]}
        {...form.isClubActivities}
      />

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

      <BaseTextField
        label="年間費用"
        name="admissionFee"
        id="admissionFee"
        placeholder="1000"
        expand
        {...form.admissionFeePerYear}
      />

      <BaseTextField
        label="活動人数"
        name="numberOfMembers"
        id="numberOfMembers"
        suffix="人"
        {...form.numberOfMembers}
      />

      <BaseTextField
        label="公開用メールアドレス"
        name="publicEmail"
        id="publicEmail"
        placeholder="example@example.com"
        expand
        {...form.publicEmail}
      />

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

      <BaseImageInput
        label="サークルビラ"
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
        <GreenButton type="submit">更新</GreenButton>
      </div>
    </form>
  )
}

export { EditCircleForm }
