import { GreenButton } from "@/components/atoms/buttons/GreenButton";
import { BaseSelect } from "@/components/atoms/form/BaseSelect";
import { BaseTextField } from "@/components/atoms/form/BaseTextField";
import { UseBooleanInput, UseStringInput } from "@/hooks/useInput";
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
        publishFrom: UseStringInput
        publishTo: UseStringInput
        startDate: UseStringInput
        endDate: UseStringInput
    }
}
const EditCircleNewJoyForm: FC<Props> = ({ onSubmit, form }) => {
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
                label="サークル新歓"
                name="title"
                id="title"
                required
                { ...form.title }
            />

            <BaseTextField
                label="新歓URLのパス"
                name="url"
                id="url"
                placeholder="u-lab"
                note="新歓の告知で使うURLをはってください。(Twitterなど)。zoomは安全上、控えてください"
                { ...form.url }
            />

            <BaseTextField
                label="サークル新歓説明"
                name="description"
                id="description"
                required
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
                { ...form.placeOfActivityDetail }
            />

            <BaseTextField
                label="公開開始日時"
                name="publishFrom"
                id="publishFrom"
                type="date"
                { ...form.publishFrom }
            />

            <BaseTextField
                label="公開終了日時"
                name="publishTo"
                id="publishTo"
                type="date"
                { ...form.publishTo }
            />

            <BaseTextField
                label="新歓開始日時"
                name="startDate"
                id="startDate"
                type="datetime-local"
                { ...form.startDate }
            />

            <BaseTextField
                label="新歓終了日時"
                name="endDate"
                id="endDate"
                type="datetime-local"
                { ...form.endDate }
            />

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">
                    進む
                </GreenButton>
            </div>
        </form>
    )
}

export { EditCircleNewJoyForm }