import { FormEvent, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput';
import { isUpdateCircleUserRequestValidationError, UpdateCircleUserRequest } from '@/lib/types/api/UpdateCircleUserRequest';
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading';
import { BaseFooter } from '@/components/layouts/BaseFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getCircleUser, updateCircleUser } from '@/infra/api/circleUser';
import { EditCircleUserForm } from '@/components/organisms/Form/CircleUser/EditCircleUserForm';
import Link from 'next/link';

const useParams = () => {
  const router = useRouter()
  const { circleId, userId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
    userId: Number(userId),
  }
}

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { circleId, userId } = useParams()

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')

  useEffect(() => {
    const f = async () => {
      const { user: data } = await getCircleUser(circleId, userId)
      username.set(data.username)
      displayName.set(data.displayName)
      email.set(data.email)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateCircleUser(
      circleId,
      userId,
      {
        type: 'UpdateCircleUserRequest',
        username: username.value,
        displayName: displayName.value,
      } as UpdateCircleUserRequest
    )

    if (isUpdateCircleUserRequestValidationError(data)) {
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      setIsOpen(false)

      return
    }

    console.log('onSubmit Done')

    await router.push(`/`)
  }

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          部員アカウント情報編集
        </h1>

        <BaseContainer>
          <div className="px-2 pt-8 pb-32">
            <p className="pb-8">
              <Link href="/circle/[circleId]/user" as={`/circle/${Number(circleId)}/user`}>
                <a className="underline text-blue-500">
                  ← 戻る
                </a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

            <EditCircleUserForm
              onSubmit={onSubmit}
              form={{
                username,
                displayName,
                email,
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
