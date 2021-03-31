import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { CreateCircleUserForm } from '@/components/organisms/Form/CircleUser/CreateCircleUser'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { showCircle } from '@/infra/api/circle'
import { createCircleUser } from '@/infra/api/circleUser'
import { Role } from '@/lib/enum/api/Role'
import {
  isRegisterCircleUserRequestValidationError,
  RegisterCircleUserRequest,
} from '@/lib/types/api/RegisterCircleUserRequest'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'

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

  const { data: circle } = useSWR(
    [`/circle/api/circle/${circleId}`, Number(circleId)],
    () => showCircle(Number(circleId))
  )

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

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle && circle.circle
      ? [
          ...[
            {
              text: circle.circle.shortName || circle.circle.name,
              href: `/circle/[circleId]`,
              as: `/circle/${circle.circle.id}`,
            },
            {
              text: `部員アカウント一覧`,
              href: `/circle/[circleId]/user`,
              as: `/circle/${circle.circle.id}/user`,
            },
            {
              text: `新規追加`,
              href: `/circle/[circleId]/user/create`,
              as: `/circle/${circle.circle.id}/user/create`,
              active: true,
            },
          ],
        ]
      : []
  }, [circle])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

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
                <a className="underline text-blue-500">
                  ←部員アカウント一覧に戻る
                </a>
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
