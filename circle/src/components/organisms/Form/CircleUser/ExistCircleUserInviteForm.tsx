import { FC, FormEvent } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/src/components/atoms/form/BaseSelect'
import { UseNumberInput, UseStringInput } from '@/src/hooks/useInput'
import { __ } from '@/src/lang/ja'
import { Role } from '@/src/lib/enum/api/Role'
import { User } from '@/src/lib/types/model/User'

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
        <GreenButton type="submit" rounded>
          進む
        </GreenButton>
      </div>
    </form>
  )
}

export { ExistCircleUserInviteForm }
