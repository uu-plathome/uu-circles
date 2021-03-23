import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { UseNumberInput, UseStringInput } from '@/hooks/useInput'
import { __ } from '@/lang/ja'
import { Role } from '@/lib/enum/api/Role'
import { User } from '@/lib/types/model/User'
import { FC, FormEvent } from 'react'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  canSelectUsers: User[]
  form: {
    id: UseNumberInput
    role: UseStringInput
  }
}
const ExistCircleUserInviteForm: FC<Props> = ({
  onSubmit,
  canSelectUsers,
  form,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseSelect
        label="ユーザー一覧"
        name="id"
        id="id"
        required
        note={
          canSelectUsers
            ? 'サークル管理者は部員アカウントの管理ができます。'
            : '所属させたい部員を検索してください。'
        }
        items={
          canSelectUsers
            ? [
                { label: '', value: '' },
                ...canSelectUsers.map((user) => ({
                  label: `${user.displayName} (${user.email})`,
                  value: user.id,
                })),
              ]
            : [{ label: '', value: '' }]
        }
        {...form.id}
      />

      <BaseSelect
        label="権限"
        name="role"
        id="role"
        required
        note={'サークル管理者は部員アカウントの管理ができます。'}
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

export { ExistCircleUserInviteForm }
