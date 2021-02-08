import { FC } from "react"
import { UseBooleanInput, UseNumberInput, UseStringInput } from "@/hooks/useInput"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"
import { BaseSelect } from "@/components/atoms/form/BaseSelect"
import { getAllCircleType } from "@/lib/enum/api/CircleType"
import { __ } from "@/lang/ja"
import { BaseImageInput } from "@/components/atoms/form/BaseImageInput"

export type Props = {
    onDropMainImage(acceptedFiles: any): void
    onDropHandbillImage(acceptedFiles: any): void
    form: {
        description: UseStringInput
        intro: UseStringInput
        circleType: UseStringInput
        appealingPoint1: UseStringInput
        appealingPoint2: UseStringInput
        appealingPoint3: UseStringInput
        admissionFeePerYear: UseNumberInput
        numberOfMembers: UseNumberInput
        publicEmail: UseStringInput
        mainImageUrl: UseStringInput
        handbillImageUrl: UseStringInput
        isClubActivities: UseBooleanInput
    }
}
const CommonInfoEditCircleForm: FC<Props> = ({ form, onDropMainImage, onDropHandbillImage }) => {
    return (
        <div>
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

            <BaseImageInput
                label="サークルロゴ画像"
                id="mainImageUrl"
                preview={
                form.mainImageUrl.value
                    ? form.mainImageUrl.value
                    : `/images/no-image.png`
                }
                onDrop={onDropMainImage}
                error={form.mainImageUrl.error}
            />

            <BaseImageInput
                label="サークル新歓画像"
                id="handbillImageUrl"
                preview={
                form.handbillImageUrl.value
                    ? form.handbillImageUrl.value
                    : `/images/no-image.png`
                }
                onDrop={onDropHandbillImage}
                error={form.handbillImageUrl.error}
            />
        </div>
    )
}

export { CommonInfoEditCircleForm }