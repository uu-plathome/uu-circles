import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseBooleanInput, UseStringInput } from '@/hooks/useInput'
import { FC, FormEvent } from 'react'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    email: UseStringInput
    username: UseStringInput
    displayName: UseStringInput
    active: UseBooleanInput
  }
}
const EditCircleUserForm: FC<Props> = ({ onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseTextField
        label="ユーザー名"
        name="username"
        id="username"
        required
        note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
        {...form.username}
      />

      <BaseTextField
        label="表示名"
        name="display_name"
        id="display_name"
        placeholder="u-lab"
        required
        note="入力がない場合は、自動で決まります"
        {...form.displayName}
      />

      <BaseSelect
        label="アカウントが有効かどうか"
        name="active"
        id="active"
        required
        items={[
          { value: 'true', label: '有効' },
          { value: 'false', label: '無効' },
        ]}
        {...form.active}
      />

      <BaseTextField
        label="メールアドレス"
        name="email"
        id="email"
        required
        expand
        disabled
        {...form.email}
      />

      <div className="flex justify-center mt-8">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { EditCircleUserForm }
