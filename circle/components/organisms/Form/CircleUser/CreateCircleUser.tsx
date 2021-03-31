import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { FormHeader } from '@/components/atoms/header/FormHeader'
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
const CreateCircleUserForm: FC<Props> = ({ onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormHeader>部員情報</FormHeader>

      <BaseTextField
        label="メールアドレス"
        name="email"
        id="email"
        expand
        required
        placeholder="example@example.com"
        {...form.email}
      />

      <BaseTextField
        label="ユーザー名"
        name="username"
        id="username"
        expand
        required
        prefix="@"
        {...form.username}
      />

      <BaseTextField
        label="表示名"
        name="display_name"
        id="display_name"
        placeholder="u-lab"
        expand
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

      <div className="flex justify-center mt-8">
        <GreenButton type="submit" rounded>
          進む
        </GreenButton>
      </div>
    </form>
  )
}

export { CreateCircleUserForm }
