import { GreenButton } from "@/components/atoms/buttons/GreenButton"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"
import { UseStringInput } from "@/hooks/useInput"
import { FC, FormEvent } from "react"

type Props = {
    onSubmit(e: FormEvent<HTMLFormElement>): void
    form: {
        name: UseStringInput
        slug: UseStringInput
    }
}
const CreateCircleForm: FC<Props> = ({ onSubmit, form }) => {
    return (
        <form onSubmit={onSubmit}>
            <BaseTextField
                label="サークル名"
                name="name"
                id="name"
                required
                { ...form.name }
            />

            <BaseTextField
                label="URLのパス"
                name="slug"
                id="slug"
                placeholder="u-lab"
                prefix="uu-circle.com/circle/"
                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                { ...form.slug }
            />

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">
                    進む
                </GreenButton>
            </div>
        </form>
    )
}

export { CreateCircleForm }
