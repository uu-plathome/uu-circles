import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/hooks/useInput'
import { FC, FormEvent } from 'react'

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
            <div>
                <BaseTextField
                    label="サークル名"
                    name="name"
                    id="name"
                    maxLength={50}
                    required
                    {...form.name}
                />

                <BaseTextField
                    label="URLのパス"
                    name="slug"
                    id="slug"
                    placeholder="u-lab"
                    maxLength={50}
                    prefix="uu-circle.com/circle/"
                    note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                    expand
                    {...form.slug}
                />
            </div>

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">進む</GreenButton>
            </div>
        </form>
    )
}

export { CreateCircleForm }
