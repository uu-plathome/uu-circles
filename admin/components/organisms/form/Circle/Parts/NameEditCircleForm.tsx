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
                maxLength={50}
                {...form.name}
            />

            <BaseTextField
                label="サークル名(全角カナ)"
                name="nameKana"
                id="nameKana"
                expand
                maxLength={100}
                pattern="(?=.*?[\u30A1-\u30FC])[\u30A1-\u30FC\s]*"
                {...form.nameKana}
            />

            <BaseTextField
                label="サークル名(省略名)"
                name="shortName"
                id="shortName"
                expand
                maxLength={20}
                {...form.shortName}
            />

            <BaseTextField
                label="サークル名(肩書)"
                name="prefixName"
                id="prefixName"
                expand
                maxLength={50}
                {...form.prefixName}
            />

            <BaseTextField
                label="URLのパス"
                name="slug"
                id="slug"
                prefix="uu-circle.com/circle/"
                placeholder="u-lab"
                maxLength={50}
                required
                expand
                {...form.slug}
            />
        </div>
    )
}

export { NameEditCircleForm }
