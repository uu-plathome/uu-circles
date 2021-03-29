import { FC, FormEvent, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import {
  isUpdateCircleUserRequestValidationError,
  UpdateCircleUserRequest,
} from '@/lib/types/api/UpdateCircleUserRequest'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { showCircle, withdrawalOtherCircle } from '@/infra/api/circle'
import { getCircleUser, updateCircleUser } from '@/infra/api/circleUser'
import { EditCircleUserForm } from '@/components/organisms/Form/CircleUser/EditCircleUserForm'
import Link from 'next/link'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { User } from '@/lib/types/model/User'
import Modal from 'react-modal'
import { Role } from '@/lib/enum/api/Role'
import useSWR from 'swr'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'

const customStyles = {
  content: {
    padding: '20px 12px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '200px',
  },
}

type DeleteButtonProps = {
  user: User
  onWithdrawal(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ user, onWithdrawal }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onWithdrawal()
  }

  return (
    <div>
      <div className="text-center pt-12 border-t border-gray-300 mt-12">
        <a
          className="text-red-500 hover:underline"
          onClick={() => setIsOpen(true)}
        >
          サークルから脱退させる
        </a>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="サークルを脱退"
      >
        <h2 className="text-center text-lg mb-4 font-bold">
          本当にサークルを脱退しますか？
        </h2>

        <p className="mb-8 text-center">{user.displayName}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>脱退</RedButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

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
  const [user, setUser] = useState<User | undefined>(undefined)

  const { data: circle } = useSWR(
    [`/circle/api/circle/${circleId}`, circleId],
    () => showCircle(circleId)
  )

  const username = useStringInput('')
  const displayName = useStringInput('')
  const email = useStringInput('')
  const role = useStringInput(Role.COMMON)

  useEffect(() => {
    const f = async () => {
      const { user: data } = await getCircleUser(circleId, userId)
      setUser(data)
      username.set(data.username)
      displayName.set(data.displayName)
      email.set(data.email)
      role.set(data.role)
    }

    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateCircleUser(circleId, userId, {
      type: 'UpdateCircleUserRequest',
      displayName: displayName.value,
      role: role.value,
    } as UpdateCircleUserRequest)

    if (isUpdateCircleUserRequestValidationError(data)) {
      displayName.setErrors(data.errors.displayName)
      role.setErrors(data.errors.role)
      setIsOpen(false)

      return
    }

    console.log('onSubmit Done')

    await router.push(`/circle/${circleId}/user`)
  }

  const onWithdrawal = async () => {
    setIsOpen(true)

    await withdrawalOtherCircle(circleId, userId)

    setIsOpen(false)

    await router.push(`/circle/${circleId}/user`)
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] =
    circle && circle.circle
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
              text: `部員アカウント編集`,
              href: `/circle/[circleId]/user/edit`,
              as: `/circle/${circle.circle.id}/user/edit`,
              active: true,
            },
          ],
        ]
      : []

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          部員アカウント情報編集
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

            <EditCircleUserForm
              onSubmit={onSubmit}
              isOtherUser={user && authContext.user.id !== user.id}
              form={{
                username,
                displayName,
                email,
                role,
              }}
            />

            {user && user.id !== authContext.user.id ? (
              <DeleteButton user={user} onWithdrawal={onWithdrawal} />
            ) : (
              ''
            )}
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
