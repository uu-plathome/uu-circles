import { FormEvent, useContext, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import {
  isRegisterCircleUserRequestValidationError,
  RegisterCircleUserRequest,
} from '@/lib/types/api/RegisterCircleUserRequest'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { createCircleUser } from '@/infra/api/circleUser'
import Link from 'next/link'
import { CreateCircleUserForm } from '@/components/organisms/Form/CircleUser/CreateCircleUser'
import { Role } from '@/lib/enum/api/Role'

const useParams = () => {
  const router = useRouter()
  const { circleId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
  }
}

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { circleId } = useParams()

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')
  const role = useStringInput(Role.COMMON)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createCircleUser(circleId, {
      type: 'RegisterCircleUserRequest',
      email: email.value,
      username: username.value,
      displayName: displayName.value,
      role: role.value,
    } as RegisterCircleUserRequest)

    if (isRegisterCircleUserRequestValidationError(data)) {
      email.setErrors(data.errors.email)
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      role.setErrors(data.errors.role)
      setIsOpen(false)

      return
    }

    console.log('onSubmit Done')

    await router.push(`/circle/${circleId}/user`)
  }

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          部員アカウント新規追加
        </h1>

        <BaseContainer>
          <div className="px-2 pt-8 pb-32">
            <p className="pb-8">
              <Link
                href="/circle/[circleId]/user"
                as={`/circle/${Number(circleId)}/user`}
              >
                <a className="underline text-blue-500">← 戻る</a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

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
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
