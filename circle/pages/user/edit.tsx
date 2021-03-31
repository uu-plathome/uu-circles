import Colors from '@/colors'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { EditUserForm } from '@/components/organisms/Form/User/EditUserForm'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { updateUser } from '@/infra/api/auth'
import {
  isUpdateOwnUserRequestValidationError,
  UpdateOwnUserRequest,
} from '@/lib/types/api/UpdateOwnUserRequest'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react'

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')

  useEffect(() => {
    if (!isOpen) {
      username.set(authContext.user.username)
      displayName.set(authContext.user.displayName)
      email.set(authContext.user.email)
    }
  }, [authContext])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateUser({
      type: 'UpdateOwnUserRequest',
      username: username.value,
      displayName: displayName.value,
    } as UpdateOwnUserRequest)

    if (isUpdateOwnUserRequestValidationError(data)) {
      username.setErrors(data.errors.username)
      displayName.setErrors(data.errors.displayName)
      setIsOpen(false)

      return
    }

    console.log('onSubmit', {
      data,
      authContextUser: authContext.user,
    })
    authContext.setUser(data)

    await router.push(`/`)
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return [
      ...[
        {
          text: '自分のアカウント編集',
          href: `/user/edit`,
          active: true,
        },
      ],
    ]
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          自分のアカウント編集
        </h1>

        <BaseContainer>
          <div className="px-2 pt-8 pb-32">
            <SubmitLoading isOpen={isOpen} />

            <EditUserForm
              onSubmit={onSubmit}
              form={{
                username,
                displayName,
                email,
              }}
            />

            <div className="text-center pt-12 border-t border-gray-300 mt-12">
              <Link href="/logout">
                <a className="text-red-500 hover:underline">
                  <FontAwesomeIcon
                    icon={faUser}
                    color={Colors.red[500]}
                    size="lg"
                  />
                  ログアウト
                </a>
              </Link>
            </div>
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
