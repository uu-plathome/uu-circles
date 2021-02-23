import { FC } from "react"
import { UseStringInput } from "@/hooks/useInput"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"

export type Props = {
    form: {
        name: UseStringInput
        slug: UseStringInput
        nameKana: UseStringInput
        shortName: UseStringInput
        prefixName: UseStringInput
    }
}
const NameEditCircleForm: FC<Props> = ({ form }) => {
    return (
        <div>
            <BaseTextField
                label="サークル名"
                name="name"
                id="name"
                required
                expand
                {...form.name}
            />

            <BaseTextField
                label="サークル名(カナ)"
                name="nameKana"
                id="nameKana"
                expand
                pattern="(?=.*?[\u30A1-\u30FC])[\u30A1-\u30FC\s]*"
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
                label="URLのパス"
                name="slug"
                id="slug"
                prefix="uu-circle.com/circle/"
                placeholder="u-lab"
                required
                expand
                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                {...form.slug}
            />
        </div>
    )
}

export { NameEditCircleForm }