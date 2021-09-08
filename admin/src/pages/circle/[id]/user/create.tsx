import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { CreateCircleUserForm } from '@/src/components/organisms/form/CircleUser/CreateCircleUser'
import { useStringInput } from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { Role } from '@/src/lib/enum/api/Role'
import { createCircleUser } from '@/src/lib/infra/api/circle_user'
import {
  isRegisterCircleUserRequestValidationError,
  RegisterCircleUserRequest,
} from '@/src/lib/types/api/RegisterCircleUserRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')
  const role = useStringInput(Role.COMMON)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

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
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push(`/circle/${id}/user`)
  }

  return (
    <div>
      <Head>
        <title>部員アカウント新規作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="部員アカウント新規作成">
          <div className="py-4 px-2 border-2 border-gray-800">
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
