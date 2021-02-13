import { GreenButton } from "@/components/atoms/buttons/GreenButton";
import { BaseDate } from "@/components/atoms/form/BaseDate";
import { BaseDatetime } from "@/components/atoms/form/BaseDatetime";
import { BaseSelect } from "@/components/atoms/form/BaseSelect";
import { BaseTextField } from "@/components/atoms/form/BaseTextField";
import { FormHeader } from "@/components/atoms/header/FormHeader";
import { UseBooleanInput, UseDateInput, UseStringInput } from "@/hooks/useInput";
import { __ } from "@/lang/ja";
import { getAllPlaceOfActivity } from "@/lib/enum/api/PlaceOfActivity";
import { FC, FormEvent } from "react";

type Props = {
    onSubmit(e: FormEvent<HTMLFormElement>): void
    form: {
        release: UseBooleanInput
        title: UseStringInput
        url: UseStringInput
        description: UseStringInput
        placeOfActivity: UseStringInput
        placeOfActivityDetail: UseStringInput
        publishFrom: UseDateInput
        startDate: UseDateInput
        endDate: UseDateInput
    }
}
const EditCircleNewJoyForm: FC<Props> = ({ onSubmit, form }) => {
    return (
        <form onSubmit={onSubmit}>
            <FormHeader>新歓基本情報</FormHeader>

            <div className="mb-8">

                <BaseTextField
                    label="新歓名"
                    name="title"
                    id="title"
                    required
                    { ...form.title }
                />

                <BaseTextField
                    label="新歓説明"
                    name="description"
                    id="description"
                    expand
                    { ...form.description }
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
                    label="サークル新歓活動場所"
                    name="placeOfActivityDetail"
                    id="placeOfActivityDetail"
                    expand
                    { ...form.placeOfActivityDetail }
                />

                <BaseDatetime
                    label="新歓開始日時"
                    name="startDate"
                    id="startDate"
                    { ...form.startDate }
                />

                <BaseDatetime
                    label="新歓終了日時"
                    name="endDate"
                    id="endDate"
                    { ...form.endDate }
                />

                <BaseTextField
                    label="新歓URL"
                    name="url"
                    id="url"
                    placeholder="https://ulab-uu.com/"
                    expand
                    note="新歓の告知で使うURLをはってください。(Twitterなど)。zoomは安全上、控えてください"
                    { ...form.url }
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
                    { ...form.release }
                />

                <BaseDate 
                    label="予約投稿日時"
                    name="publishFrom"
                    id="publishFrom"
                    note="予約投稿をしない場合は、空にしてください。"
                    { ...form.publishFrom }
                />
            </div>

            <div className="flex justify-center">
                <GreenButton type="submit">
                    進む
                </GreenButton>
            </div>
        </form>
    )
}

export { EditCircleNewJoyForm }