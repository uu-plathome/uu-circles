import { FC, FormEvent } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/src/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/src/hooks/useInput'
import { __ } from '@/src/lang/ja'
import { Role } from '@/src/lib/enum/api/Role'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    username: UseStringInput
    displayName: UseStringInput
    email: UseStringInput
    role: UseStringInput
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

      <div className="mt-8 flex justify-center">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { CreateCircleUserForm }
