import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { DangerBunner } from '@/src/components/atoms/bunner/DangerBunner'
import { RedButton } from '@/src/components/atoms/buttons/RedButton'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseHeader } from '@/src/components/layouts/BaseHeader'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { Role } from '@/src/lib/enum/api/Role'
import { deleteAdminUser, getAdminUser } from '@/src/lib/infra/api/admin_user'
import { getAuthUser } from '@/src/lib/infra/api/auth'

const DeletePage: NextPage = () => {
  const router = useRouter()
  const { role: ownRole } = useContext(AuthContext)
  const { userId } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(
    '本当に削除しますか。削除したら元に戻せません。'
  )
  const { data: user } = useSWR(
    ['/admin/api/admin-user/[userId]', Number(userId)],
    () => getAdminUser(Number(userId))
  )
  const { data: authUser } = useSWR('/admin/api/user', getAuthUser)

  useEffect(() => {
    if (!ownRole || ownRole === Role.COMMON) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (authUser && Number(userId) === authUser.id) {
      router.push('/user/admin')
      return
    }
  }, [authUser, userId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)
    setError('')
    const data = await deleteAdminUser(Number(userId))

    if (data && data.type === 'DeleteAdminUserValidationError') {
      setError(data.errors.data)
      setIsOpen(false)
      return
    }

    if (data && data.type === 'success') {
      router.push('/user/admin')
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    console.error('onSubmitで不適切な処理があります。')
  }

  return (
    <div>
      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper
          title={user ? `${user.displayName}の削除をしますか` : ''}
          actionHref="/user/admin"
          actionText="管理者アカウント一覧に戻る"
        >
          <div className="p-2 border-2 border-gray-800">
            {error ? <DangerBunner text={error} /> : ''}

            <form onSubmit={onSubmit}>
              <div className="text-center">
                <RedButton type="submit">削除する</RedButton>
              </div>
            </form>
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default DeletePage
