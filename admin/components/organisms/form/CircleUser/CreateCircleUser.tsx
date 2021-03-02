import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/hooks/useInput'
import { FC, FormEvent } from 'react'

type Props = {
    onSubmit(e: FormEvent<HTMLFormElement>): void
    form: {
        username: UseStringInput
        displayName: UseStringInput
        email: UseStringInput
    }
}
const CreateCircleUserForm: FC<Props> = ({ onSubmit, form }) => {
    return (
        <form onSubmit={onSubmit}>
            <BaseTextField
                label="メールアドレス"
                name="email"
                id="email"
                required
                {...form.email}
            />

            <BaseTextField
                label="ユーザー名"
                name="username"
                id="username"
                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                {...form.username}
            />

            <BaseTextField
                label="表示名"
                name="display_name"
                id="display_name"
                placeholder="u-lab"
                note="入力がない場合は、自動で決まります"
                {...form.displayName}
            />

            <div className="flex justify-center mt-8">
                <GreenButton type="submit">進む</GreenButton>
            </div>
        </form>
    )
}

export { CreateCircleUserForm }
