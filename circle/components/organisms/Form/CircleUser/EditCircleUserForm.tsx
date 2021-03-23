import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { Role } from '@/lib/enum/api/Role'
import { FC, FormEvent } from 'react'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    username: UseStringInput
    displayName: UseStringInput
    email: UseStringInput
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
