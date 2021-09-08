import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AdminUserListItem } from '@/components/molecules/list_items/AdminUserListItem'
import { AuthContext } from '@/contexts/AuthContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getAdminUserList } from '@/infra/api/admin_user'
import { getAuthUser, resendEmail } from '@/infra/api/auth'
import { Role } from '@/src/lib/enum/api/Role'
import { User } from '@/src/lib/types/model/User'

const useSuccess = <T,>(initialState: T) => {
  const [success, setSuccess] = useState<T>(initialState)

  const newSetSuceess = (state: T, timeout?: number) => {
    setSuccess(state)

    setTimeout(() => {
      setSuccess(initialState)
    }, timeout)
  }

  return {
    success,
    setSuccess: newSetSuceess,
  }
}

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { data: users } = useSWR('/admin/api/admin-user', getAdminUserList)
  const { role: ownRole } = useContext(AuthContext)
  const [error, setError] = useState<string>('')
  const { success, setSuccess } = useSuccess<string>('')
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)
  const { data: authUser } = useSWR('/admin/api/user', getAuthUser)

  useEffect(() => {
    if (!ownRole || ownRole === Role.COMMON) {
      router.push('/')
    }
  }, [])

  const onResendEmail = async (email: string) => {
    setIsOpen(true)
    try {
      await resendEmail(email)
      setSuccess('認証用のメールを送信しました。確認してください。', 3000)
    } catch (e) {
      setError('エラーが発生しました。')
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Head>
        <title>管理者アカウント管理画面</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper
          title="管理者アカウント管理画面"
          actionHref="/user/admin/create"
          actionText="管理者アカウント作成"
        >
          {success ? <SuccessBunner text={success} /> : ''}

          {error ? <DangerBunner text={error} /> : ''}

          <div className="p-2 border-2 border-gray-800">
            {users
              ? users.map((user: User) => {
                return (
                  <AdminUserListItem
                    key={`user-${user.id}`}
                    authUser={authUser}
                    user={user}
                    onResendEmail={onResendEmail}
                  />
                )
              })
              : ''}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
