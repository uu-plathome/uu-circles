import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { createCircleUser } from '@/infra/api/circle_user'
import {
  isRegisterCircleUserRequestValidationError,
  RegisterCircleUserRequest,
} from '@/lib/types/api/RegisterCircleUserRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleUserForm } from '@/components/organisms/form/CircleUser/CreateCircleUser'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'
import { Role } from '@/lib/enum/api/Role'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isMd } = useMediaQuery()

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')
  const role = useStringInput(Role.COMMON)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = await createCircleUser(Number(id), {
      type: 'RegisterCircleUserRequest',
      username: username.value,
      displayName: displayName.value,
      email: email.value,
      role: role.value,
    } as RegisterCircleUserRequest)

    if (isRegisterCircleUserRequestValidationError(data)) {
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      email.setErrors(data.errors.email)
      role.setErrors(data.errors.role)

      return
    }

    await router.push(`/circle/${id}/user`)
  }

  return (
    <div>
      <Head>
        <title>部員アカウント新規作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="部員アカウント新規作成">
          <div className="border-2 border-gray-800 px-2 py-4">
            <CreateCircleUserForm
              onSubmit={onSubmit}
              form={{
                username,
                displayName,
                email,
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
