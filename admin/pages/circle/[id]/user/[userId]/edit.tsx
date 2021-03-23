import { FormEvent, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { getCircleUser, updateCircleUser } from '@/infra/api/circle_user'
import {
  isUpdateCircleUserRequestValidationError,
  UpdateCircleUserRequest,
} from '@/lib/types/api/UpdateCircleUserRequest'
import { EditCircleUserForm } from '@/components/organisms/form/CircleUser/EditCircleUserForm'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'
import { Role } from '@/lib/enum/api/Role'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const { isMd } = useMediaQuery()

  const email = useStringInput('')
  const username = useStringInput('')
  const displayName = useStringInput('')
  const role = useStringInput(Role.COMMON)
  const active = useBooleanInput(true)

  useEffect(() => {
    const f = async () => {
      const foundUser = await getCircleUser(Number(id), Number(userId))
      email.set(foundUser.email)
      username.set(foundUser.username)
      displayName.set(foundUser.displayName)
      active.set(foundUser.active)
      role.set(foundUser.role)
    }

    f()
  }, [id, userId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = await updateCircleUser(Number(id), Number(userId), {
      type: 'UpdateCircleUserRequest',
      username: username.value,
      displayName: displayName.value,
      active: active.toBoolean,
      role: role.value,
    } as UpdateCircleUserRequest)

    if (isUpdateCircleUserRequestValidationError(data)) {
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      active.setErrors(data.errors.active)
      role.setErrors(data.errors.role)

      return
    }

    await router.push(`/circle/${id}/user`)
  }

  return (
    <div>
      <Head>
        <title>部員アカウント編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="部員アカウント編集">
          <div className="border-2 border-gray-800 px-2 py-4">
            <EditCircleUserForm
              onSubmit={onSubmit}
              form={{
                email,
                username,
                displayName,
                active,
                role,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
