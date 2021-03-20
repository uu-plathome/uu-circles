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
const EditUserForm: FC<Props> = ({ onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseTextField
        label="ユーザー名"
        name="username"
        id="username"
        required
        prefix="@"
        note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
        expand
        {...form.username}
      />

      <BaseTextField
        label="表示名"
        name="display_name"
        id="display_name"
        placeholder="u-lab"
        required
        note="入力がない場合は、自動で決まります"
        expand
        {...form.displayName}
      />

      <BaseTextField
        label="メールアドレス"
        name="email"
        id="email"
        {...form.email}
        expand
        disabled={true}
      />

      <div className="flex justify-center mt-8">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { EditUserForm }
