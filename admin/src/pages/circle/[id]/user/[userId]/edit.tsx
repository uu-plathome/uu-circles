import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditCircleUserForm } from '@/components/organisms/form/CircleUser/EditCircleUserForm'
import { useBooleanInput, useStringInput } from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { Role } from '@/src/lib/enum/api/Role'
import { showCircle } from '@/src/lib/infra/api/circle'
import { getCircleUser, updateCircleUser } from '@/src/lib/infra/api/circle_user'
import {
  isUpdateCircleUserRequestValidationError,
  UpdateCircleUserRequest,
} from '@/src/lib/types/api/UpdateCircleUserRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(true)

  const email = useStringInput('')
  const username = useStringInput('')
  const displayName = useStringInput('')
  const role = useStringInput(Role.COMMON)
  const active = useBooleanInput(true)

  useEffect(() => {
    const f = async () => {
      const foundUser = await getCircleUser({
        circleId: Number(id),
        userId: Number(userId),
      })
      email.set(foundUser.email)
      username.set(foundUser.username)
      displayName.set(foundUser.displayName)
      active.set(foundUser.active)
      role.set(foundUser.role)

      setIsOpen(false)
    }

    f()
  }, [id, userId])

  const { data } = useSWR(
    `/circle/${id}/show`,
    async () => await showCircle(Number(id))
  )
  const circle = data

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

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
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push(`/circle/${id}/user`)
  }

  return (
    <div>
      <Head>
        <title>部員アカウント編集</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="部員アカウント編集">
          <div className="py-4 px-2 border-2 border-gray-800">
            {circle ? (
              <div className="mb-8">
                <p className="text-lg text-white">{circle.name}の情報編集</p>
              </div>
            ) : (
              ''
            )}

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
