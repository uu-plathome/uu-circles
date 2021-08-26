import { FC, FormEvent } from 'react'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { FormHeader } from '@/components/atoms/header/FormHeader'
import { UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { Role } from '@/lib/enum/api/Role'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  /**
   * 自分のアカウントではないかどうか
   */
  isOtherUser: boolean
  form: {
    username: UseStringInput
    displayName: UseStringInput
    email: UseStringInput
    role: UseStringInput
  }
}
const EditCircleUserForm: FC<Props> = ({ onSubmit, isOtherUser, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormHeader>部員情報</FormHeader>

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

      <BaseSelect
        label="権限"
        name="role"
        id="role"
        required
        disabled={!isOtherUser}
        note={
          !isOtherUser
            ? '自分のアカウントの権限は変更できません。他のアカウントから変更してください。'
            : 'サークル管理者は部員アカウントの管理ができます。'
        }
        items={[
          { label: __(Role.MANAGER, 'CircleUserRole'), value: Role.MANAGER },
          { label: __(Role.COMMON, 'CircleUserRole'), value: Role.COMMON },
        ]}
        {...form.role}
      />

      <BaseTextField
        label="ユーザー名"
        name="username"
        id="username"
        required
        prefix="@"
        disabled
        note="他のユーザーのユーザー名は変更できません。"
        expand
        {...form.username}
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
        <GreenButton type="submit" rounded>
          進む
        </GreenButton>
      </div>
    </form>
  )
}

export { EditCircleUserForm }
