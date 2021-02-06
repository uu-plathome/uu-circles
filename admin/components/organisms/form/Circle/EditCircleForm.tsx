import { GreenButton } from "@/components/atoms/buttons/GreenButton"
import { BaseImageInput } from "@/components/atoms/form/BaseImageInput"
import { BaseSelect } from "@/components/atoms/form/BaseSelect"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"
import { UseBooleanInput, UseNumberInput, UseStringInput } from "@/hooks/useInput"
import { __ } from "@/lang/ja"
import { getAllCircleType } from "@/lib/enum/api/CircleType"
import { getAllDateOfActivity } from "@/lib/enum/api/DateOfActivity"
import { getAllPlaceOfActivity } from "@/lib/enum/api/PlaceOfActivity"
import { FC, FormEvent } from "react"


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
        circleType: UseStringInput
        placeOfActivity: UseStringInput
        placeOfActivityDetail: UseStringInput
        doOnlineActivity: UseBooleanInput
        dateOfActivityMonday: UseStringInput
        dateOfActivityTuesday: UseStringInput
        dateOfActivityWednesday: UseStringInput
        dateOfActivityThursday: UseStringInput
        dateOfActivityFriday: UseStringInput
        dateOfActivitySaturday: UseStringInput
        dateOfActivitySunday: UseStringInput
        dateOfActivityDetail: UseStringInput
        admissionFee: UseStringInput
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
                { ...form.release }
            />

            <BaseTextField
                label="サークル名"
                name="name"
                id="name"
                required
                expand
                { ...form.name }
            />

            <BaseTextField
                label="URLのパス"
                name="slug"
                id="slug"
                placeholder="u-lab"
                required
                expand
                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                { ...form.slug }
            />

            <BaseTextField
                label="サークル名(かな)"
                name="nameKana"
                id="nameKana"
                expand
                { ...form.nameKana }
            />

            <BaseTextField
                label="サークル名(省略名)"
                name="shortName"
                id="shortName"
                expand
                { ...form.shortName }
            />

            <BaseTextField
                label="サークル名(肩書)"
                name="prefixName"
                id="prefixName"
                expand
                { ...form.prefixName }
            />

            <BaseTextField
                label="サークル短文紹介"
                name="description"
                id="description"
                expand
                { ...form.description }
            />

            <BaseTextField
                label="サークル長文紹介"
                name="intro"
                id="intro"
                expand
                { ...form.intro }
            />

            <BaseSelect
                label="サークル種別"
                id="circleType"
                name="circleType"
                items={[
                    ...getAllCircleType().map((_circleType) => ({
                        value: _circleType,
                        label: __(_circleType)
                    })),
                    { value: '', label: '不明' },
                ]}
                { ...form.circleType }
            />

            <BaseSelect
                label="活動場所"
                id="placeOfActivity"
                name="placeOfActivity"
                items={[
                    ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
                        value: _placeOfActivity,
                        label: __(_placeOfActivity)
                    }))
                ]}
                { ...form.placeOfActivity }
            />

            <BaseTextField
                label="活動場所詳細"
                name="placeOfActivityDetail"
                id="placeOfActivityDetail"
                { ...form.placeOfActivityDetail }
            />

            <BaseSelect
                label="オンライン活動しているかどうか"
                id="doOnlineActivity"
                name="doOnlineActivity"
                items={[
                    { value: 'true', label: 'オンラインしている' },
                    { value: 'false', label: 'オフラインのみ' },
                ]}
                { ...form.doOnlineActivity }
            />

            <BaseSelect
                label="活動(月曜日)"
                id="dateOfActivityMonday"
                name="dateOfActivityMonday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivityMonday }
            />

            <BaseSelect
                label="活動(火曜日)"
                id="dateOfActivityTuesday"
                name="dateOfActivityTuesday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivityTuesday }
            />

            <BaseSelect
                label="活動(水曜日)"
                id="dateOfActivityWednesday"
                name="dateOfActivityWednesday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivityWednesday }
            />

            <BaseSelect
                label="活動(木曜日)"
                id="dateOfActivityThursday"
                name="dateOfActivityThursday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivityThursday }
            />

            <BaseSelect
                label="活動(金曜日)"
                id="dateOfActivityFriday"
                name="dateOfActivityFriday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivityFriday }
            />

            <BaseSelect
                label="活動(土曜日)"
                id="dateOfActivitySaturday"
                name="dateOfActivitySaturday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivitySaturday }
            />

            <BaseSelect
                label="活動(日曜日)"
                id="dateOfActivitySunday"
                name="dateOfActivitySunday"
                items={[
                    { value: null, label: '非活動日' },
                    ...getAllDateOfActivity().map((_dateOfActivity) => ({
                        value: _dateOfActivity,
                        label: __(_dateOfActivity)
                    }))
                ]}
                { ...form.dateOfActivitySunday }
            />

            <BaseTextField
                label="活動日時詳細"
                name="dateOfActivityDetail"
                id="dateOfActivityDetail"
                expand
                { ...form.dateOfActivityDetail }
            />

            <BaseTextField
                label="入会費"
                name="admissionFee"
                id="admissionFee"
                placeholder="年間1,000円"
                expand
                { ...form.admissionFee }
            />

            <BaseTextField
                label="活動人数"
                name="numberOfMembers"
                id="numberOfMembers"
                suffix="人"
                { ...form.numberOfMembers }
            />

            <BaseTextField
                label="公開用メールアドレス"
                name="publicEmail"
                id="publicEmail"
                placeholder="example@example.com"
                expand
                { ...form.publicEmail }
            />

            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <BaseTextField
                        label="Twitter URL"
                        name="twitterUrl"
                        id="twitterUrl"
                        expand
                        placeholder="https://twitter.com/"
                        { ...form.twitterUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Facebook URL"
                        name="facebookUrl"
                        id="facebookUrl"
                        expand
                        { ...form.facebookUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Instagram URL"
                        name="instagramUrl"
                        id="instagramUrl"
                        expand
                        placeholder="https://instagram.com"
                        { ...form.instagramUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Line URL"
                        name="lineUrl"
                        id="lineUrl"
                        expand
                        { ...form.lineUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Youtube URL"
                        name="youtubeUrl"
                        id="youtubeUrl"
                        expand
                        placeholder="https://youtube.com"
                        { ...form.youtubeUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Homepage URL"
                        name="homepageUrl"
                        id="homepageUrl"
                        expand
                        { ...form.homepageUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Peing URL"
                        name="peingUrl"
                        id="peingUrl"
                        expand
                        { ...form.peingUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="GitHub URL"
                        name="githubUrl"
                        id="githubUrl"
                        expand
                        placeholder="https://github.com"
                        { ...form.githubUrl }
                    />
                </div>

                <div>
                    <BaseTextField
                        label="Tiktok URL"
                        name="tiktokUrl"
                        id="tiktokUrl"
                        expand
                        { ...form.tiktokUrl }
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
                    { ...form.participationUrl }
                />
            </div>

            <BaseImageInput
                label="サークルビラ"
                id="mainImageUrl"
                preview={form.mainImageUrl.value ? form.mainImageUrl.value : `/images/no-image.png`}
                onDrop={onDropMainImage}
                error={form.mainImageUrl.error}
            />

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">
                    更新
                </GreenButton>
            </div>
        </form>
    )
}

export { EditCircleForm }
