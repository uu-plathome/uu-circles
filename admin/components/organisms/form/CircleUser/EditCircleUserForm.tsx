import { FC, FormEvent } from 'react'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseBooleanInput, UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { Role } from '@/src/lib/enum/api/Role'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    email: UseStringInput
    username: UseStringInput
    displayName: UseStringInput
    active: UseBooleanInput
    role: UseStringInput
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

      <BaseSelect
        label="権限"
        name="role"
        id="role"
        required
        items={[
          { label: __(Role.MANAGER, 'CircleUserRole'), value: Role.MANAGER },
          { label: __(Role.COMMON, 'CircleUserRole'), value: Role.COMMON },
        ]}
        {...form.role}
      />

      <div className="flex justify-center mt-8">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { EditCircleUserForm }
