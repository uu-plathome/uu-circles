import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { FormHeader } from '@/components/atoms/header/FormHeader'
import {
  UseBooleanInput,
  UseNumberInput,
  UseStringInput,
} from '@/hooks/useInput'
import { isSystem, Role } from '@/lib/enum/api/Role'
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLine,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faHome, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, FormEvent } from 'react'
import { ActivityEditCircleForm } from './Parts/ActivityEditCircleForm'
import {
  CommonInfoEditCircleForm,
  Props as CommonInfoEditCircleFormProps,
} from './Parts/CommonInfoEditCircleForm'
import {
  NameEditCircleForm,
  Props as NameEditCircleFormProps,
} from './Parts/NameEditCircleForm'

type Props = {
  onDropMainImage(acceptedFiles: any): void
  onDropHandbillImage(acceptedFiles: any): void
  onDropActivityImage(acceptedFiles: any, idx: 1 | 2 | 3 | 4 | 5 | 6): void
  onSubmit(e: FormEvent<HTMLFormElement>): void
  role?: Role
  form: {
    isMainFixed: UseBooleanInput
    isOnlyDemo: UseBooleanInput
    isDemoFixed: UseBooleanInput
    demoPriority: UseNumberInput
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
    wpUrl: UseStringInput
    wpTagTaxonomy: UseStringInput
    isViewWpPost: UseBooleanInput
  } & NameEditCircleFormProps['form'] &
  CommonInfoEditCircleFormProps['form']
}
const EditCircleForm: FC<Props> = ({
  onDropMainImage,
  onDropHandbillImage,
  onDropActivityImage,
  onSubmit,
  form,
  role,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormHeader>公開設定</FormHeader>

      <div className="mb-8">
        <BaseSelect
          label="公開設定"
          id="release"
          name="release"
          required
          items={[
            { value: 'true', label: '公開' },
            { value: 'false', label: '非公開' },
          ]}
          {...form.release}
        />
      </div>

      {role && isSystem(role) ? (
        <div className="mb-8">
          <BaseSelect
            label="メイン画面に固定するか"
            id="isMainFixed"
            name="isMainFixed"
            required
            items={[
              { value: 'true', label: '固定' },
              { value: 'false', label: '固定しない' },
            ]}
            {...form.isMainFixed}
          />

          <BaseSelect
            label="デモ画面のみに表示するかどうか"
            id="isOnlyDemo"
            name="isOnlyDemo"
            required
            items={[
              { value: 'true', label: '表示する' },
              { value: 'false', label: '表示しない' },
            ]}
            {...form.isOnlyDemo}
          />

          <BaseSelect
            label="デモ画面に固定するか"
            id="isDemoFixed"
            name="isDemoFixed"
            required
            items={[
              { value: 'true', label: '固定' },
              { value: 'false', label: '固定しない' },
            ]}
            {...form.isDemoFixed}
          />

          <BaseTextField
            label="デモ画面の優先度"
            name="demoPriority"
            id="demoPriority"
            placeholder="0"
            {...form.demoPriority}
          />
        </div>
      ) : (
        ''
      )}

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

      <ActivityEditCircleForm
        form={{
          commonPlaceOfActivity: form.commonPlaceOfActivity,
          commonPlaceOfActivityDetail: form.commonPlaceOfActivityDetail,
          commonDateOfActivityMonday: form.commonDateOfActivityMonday,
          commonDateOfActivityTuesday: form.commonDateOfActivityTuesday,
          commonDateOfActivityWednesday: form.commonDateOfActivityWednesday,
          commonDateOfActivityThursday: form.commonDateOfActivityThursday,
          commonDateOfActivityFriday: form.commonDateOfActivityFriday,
          commonDateOfActivitySaturday: form.commonDateOfActivitySaturday,
          commonDateOfActivitySunday: form.commonDateOfActivitySunday,
          commonDateOfActivityDetail: form.commonDateOfActivityDetail,
          isOnlineActivity: form.isOnlineActivity,
          onlinePlaceOfActivityDetail: form.onlinePlaceOfActivityDetail,
          onlineDateOfActivityMonday: form.onlineDateOfActivityMonday,
          onlineDateOfActivityTuesday: form.onlineDateOfActivityTuesday,
          onlineDateOfActivityWednesday: form.onlineDateOfActivityWednesday,
          onlineDateOfActivityThursday: form.onlineDateOfActivityThursday,
          onlineDateOfActivityFriday: form.onlineDateOfActivityFriday,
          onlineDateOfActivitySaturday: form.onlineDateOfActivitySaturday,
          onlineDateOfActivitySunday: form.onlineDateOfActivitySunday,
          onlineDateOfActivityDetail: form.onlineDateOfActivityDetail,
        }}
      />

      <FormHeader>SNS情報</FormHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div>
          <BaseTextField
            label="Twitter URL"
            name="twitterUrl"
            id="twitterUrl"
            expand
            placeholder="https://twitter.com/"
            maxLength={255}
            prefix={
              <FontAwesomeIcon
                icon={faTwitter}
                color="rgb(29, 161, 242)"
                size="lg"
              />
            }
            {...form.twitterUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Facebook URL"
            name="facebookUrl"
            id="facebookUrl"
            expand
            placeholder="https://ja-jp.facebook.com/"
            maxLength={255}
            prefix={
              <FontAwesomeIcon icon={faFacebook} color="#3B5998" size="lg" />
            }
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
            maxLength={255}
            prefix={
              <FontAwesomeIcon
                icon={faInstagram}
                color="rgb（76, 76, 76）"
                size="lg"
              />
            }
            {...form.instagramUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="LINE URL"
            name="lineUrl"
            id="lineUrl"
            expand
            maxLength={255}
            prefix={<FontAwesomeIcon icon={faLine} color="#00b900" size="lg" />}
            {...form.lineUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Youtube URL"
            name="youtubeUrl"
            id="youtubeUrl"
            expand
            maxLength={255}
            placeholder="https://youtube.com"
            prefix={
              <FontAwesomeIcon icon={faYoutube} color="#dd4b39" size="lg" />
            }
            {...form.youtubeUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Homepage URL"
            name="homepageUrl"
            id="homepageUrl"
            expand
            maxLength={255}
            prefix={<FontAwesomeIcon icon={faHome} color="#010101" size="lg" />}
            {...form.homepageUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Tiktok URL"
            name="tiktokUrl"
            id="tiktokUrl"
            expand
            maxLength={255}
            placeholder="https://www.tiktok.com/ja-JP/"
            prefix={
              <FontAwesomeIcon icon={faTiktok} color="#010101" size="lg" />
            }
            {...form.tiktokUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="GitHub URL"
            name="githubUrl"
            id="githubUrl"
            expand
            placeholder="https://github.com"
            maxLength={255}
            prefix={
              <FontAwesomeIcon icon={faGithub} color="#171515" size="lg" />
            }
            {...form.githubUrl}
          />
        </div>

        <div>
          <BaseTextField
            label="Peing URL"
            name="peingUrl"
            id="peingUrl"
            expand
            maxLength={255}
            prefix={<FontAwesomeIcon icon={faLink} color="#010101" size="lg" />}
            {...form.peingUrl}
          />
        </div>
      </div>

      <div>
        <BaseTextField
          label="新歓・活動参加用URL"
          name="participationUrl"
          id="participationUrl"
          expand
          maxLength={255}
          note="Google formなどのURL。Zoomを張るのは控えてください。"
          {...form.participationUrl}
        />
      </div>

      {role && isSystem(role) ? (
        <div>
          <FormHeader>システム管理者専用</FormHeader>

          <div>
            <BaseTextField
              label="WordPress URL"
              name="wpUrl"
              id="wpUrl"
              expand
              maxLength={255}
              note="記事を拾ってくるWordPressのURL"
              placeholder="https://media.uu-circles.com/"
              {...form.wpUrl}
            />
          </div>

          {form.wpUrl.value ? (
            <div>
              <BaseTextField
                label="WordPress Tag Taxonomy"
                name="wpTagTaxonomy"
                id="wpTagTaxonomy"
                expand
                maxLength={100}
                note="WordPressのタグ"
                {...form.wpTagTaxonomy}
              />

              <BaseSelect
                label="WordPressの記事を表示するか"
                id="isViewWpPost"
                name="isViewWpPost"
                items={[
                  { value: 'true', label: '表示' },
                  { value: 'false', label: '非表示' },
                ]}
                {...form.isViewWpPost}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}

      <div className="flex justify-center mt-8">
        <GreenButton type="submit">更新</GreenButton>
      </div>
    </form>
  )
}

export { EditCircleForm }
