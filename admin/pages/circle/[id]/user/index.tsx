import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleUserListItem } from '@/components/molecules/list_items/CircleUserListItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  deleteCircleUser,
  getCircleUserList,
  resendEmailCircleUser,
} from '@/infra/api/circle_user'
import { User } from '@/lib/types/model/User'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [success, setSuccess] = useState<boolean>(false)
  const { id } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const f = async () => {
      const foundUsers = await getCircleUserList(Number(id))
      setUsers(foundUsers.users)
    }

    f()
  }, [])

  const onDeleteUser = async (circleUserId: number) => {
    setIsOpen(true)
    await deleteCircleUser(Number(id), circleUserId)

    const foundUsers = await getCircleUserList(Number(id))
    setUsers(foundUsers.users)
    setIsOpen(false)
  }

  const onResendEmail = async (email: string) => {
    setIsOpen(true)
    await resendEmailCircleUser(email)
    setSuccess(true)
    setIsOpen(false)

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  return (
    <div>
      <Head>
        <title>サークルユーザー管理</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="サークルユーザー管理"
          actionHref="/circle/[id]/user/create"
          actionAs={`/circle/${id}/user/create`}
          actionText="アカウント新規作成"
        >
          {success ? <SuccessBunner text="Success" /> : ''}

          <SubmitLoading isOpen={isOpen} />

          <div className="border-2 border-gray-800 p-2">
            {users.map((user: User) => {
              return (
                <CircleUserListItem
                  circleId={Number(id)}
                  key={`user-${user.id}`}
                  user={user}
                  onResendEmail={onResendEmail}
                  onDelete={onDeleteUser}
                />
              )
            })}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
