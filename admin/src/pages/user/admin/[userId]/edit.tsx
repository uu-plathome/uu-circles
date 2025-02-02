import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/src/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useBooleanInput, useStringInput } from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { __ } from '@/src/lang/ja'
import { Role } from '@/src/lib/enum/api/Role'
import { getAdminUser, updateAdminUser } from '@/src/lib/infra/api/admin_user'
import {
  isUpdateAdminUserRequestValidationError,
  UpdateAdminUserRequest,
} from '@/src/lib/types/api/UpdateAdminUserRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { role: ownRole } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const { userId } = router.query
  const { isMd } = useMediaQuery()

  const username = useStringInput('')
  const displayName = useStringInput('')
  const active = useBooleanInput(true)
  const role = useStringInput(Role.COMMON)
  const email = useStringInput('')

  useEffect(() => {
    if (!ownRole || ownRole === Role.COMMON) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    const f = async () => {
      const foundUser = await getAdminUser(Number(userId))
      username.set(foundUser.username)
      displayName.set(foundUser.displayName)
      active.set(foundUser.active), role.set(foundUser.role)
      email.set(foundUser.email)
    }

    f()
  }, [userId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateAdminUser(Number(userId), {
      type: 'UpdateAdminUserRequest',
      username: username.value,
      displayName: displayName.value,
      active: active.toBoolean,
      role: role.value,
    } as UpdateAdminUserRequest)

    if (isUpdateAdminUserRequestValidationError(data)) {
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      active.setErrors(data.errors.active)
      role.setErrors(data.errors.role)
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    await router.push(`/user/admin`)
  }

  const roleList = () => {
    if (ownRole === Role.SYSTEM) {
      return [
        { label: __(Role.SYSTEM, 'Role'), value: Role.SYSTEM },
        { label: __(Role.MANAGER, 'Role'), value: Role.MANAGER },
        { label: __(Role.COMMON, 'Role'), value: Role.COMMON },
      ]
    }

    return [
      { label: __(Role.MANAGER, 'Role'), value: Role.MANAGER },
      { label: __(Role.COMMON, 'Role'), value: Role.COMMON },
    ]
  }

  return (
    <div>
      <Head>
        <title>管理者アカウント編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper title="管理者アカウント編集">
          <div className="border-2 border-gray-800 py-4 px-2">
            <form onSubmit={onSubmit}>
              <BaseTextField
                label="ユーザー名"
                name="username"
                id="username"
                required
                prefix="@"
                placeholder="u-ta"
                maxLength={30}
                note="アルファベット、ハイフンのみ。"
                {...username}
              />

              <BaseTextField
                label="表示名"
                name="display_name"
                id="display_name"
                placeholder="宇都宮太郎"
                required
                maxLength={50}
                {...displayName}
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
                {...active}
              />

              <BaseSelect
                label="権限"
                name="role"
                id="role"
                required
                items={roleList()}
                {...role}
              />

              <BaseTextField
                label="メールアドレス"
                name="email"
                id="email"
                required
                expand
                disabled
                {...email}
              />

              <div className="mt-8 flex justify-center">
                <GreenButton type="submit">進む</GreenButton>
              </div>
            </form>
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
