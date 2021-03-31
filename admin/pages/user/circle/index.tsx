import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AllUserListItem } from '@/components/molecules/list_items/AllUserListItem'
import { useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Color from 'colors'
import { NextPage } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  paginateAllUserList,
  resendEmailCircleUser,
} from '@/infra/api/circle_user'
import { User } from '@/lib/types/model/User'

type PaginateUserCursor = {
  id?: number
  updatedAt?: string
  previous: boolean
  next: boolean
  name?: string
} | null
const IndexPage: NextPage = () => {
  const [users, setUsers] = useState<{
    hasNext: boolean | null
    hasPrevious: boolean | null
    nextCursor: PaginateUserCursor
    previousCursor: PaginateUserCursor
    records: User[]
  }>(undefined)
  const { isMd } = useMediaQuery()
  const name = useStringInput('')
  const [isOpen, setIsOpen] = useState(false)

  const foundAllUserList = async (cursor: PaginateUserCursor = null) => {
    setUsers(await paginateAllUserList(cursor))

    scroller.scrollTo('top', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  useEffect(() => {
    const f = async () => {
      setUsers(
        await paginateAllUserList({
          id: null,
          updatedAt: null,
          previous: false,
          next: true,
          name: name.value,
        })
      )
    }
    f()
  }, [])

  const onSearchSubmit = (event: FormEvent) => {
    event.preventDefault()

    foundAllUserList({
      id: null,
      updatedAt: null,
      previous: false,
      next: true,
      name: name.value,
    })
  }

  const onResendEmail = async (email: string) => {
    setIsOpen(true)
    await resendEmailCircleUser(email)
    setIsOpen(false)
  }

  return (
    <div id="top">
      <Head>
        <title>サークル一覧へようこそ</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="サークル一覧へようこそ"
          actionText="サークル新規作成"
          actionHref="/circle/create"
        >
          <div className="border-2 border-gray-800 p-2">
            {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

            {users ? (
              <div className="py-4 mb-8">
                <p className="text-white">ユーザー検索</p>

                <form onSubmit={onSearchSubmit}>
                  <SearchTextField
                    id="nameSearch"
                    name="nameSearch"
                    expand
                    {...name}
                  />
                </form>
              </div>
            ) : (
              ''
            )}

            {users && users.records.length > 0
              ? users.records.map((user: User) => {
                  return (
                    <AllUserListItem
                      key={`user-${user.id}`}
                      user={user}
                      onResendEmail={onResendEmail}
                    />
                  )
                })
              : ''}

            {users && users.records.length === 0 ? (
              <div className="py-4">
                <p className="text-white">
                  まだ部員アカウントが登録されていません
                </p>
              </div>
            ) : (
              ''
            )}

            {users ? (
              <div className="text-center">
                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!users.hasPrevious}
                  onClick={() =>
                    foundAllUserList({
                      ...users.previousCursor,
                      previous: true,
                      next: false,
                      name: name.value,
                    })
                  }
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleLeft}
                    size="2x"
                  />
                </button>

                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!users.hasNext}
                  onClick={() =>
                    foundAllUserList({
                      ...users.nextCursor,
                      previous: false,
                      next: true,
                      name: name.value,
                    })
                  }
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleRight}
                    size="2x"
                  />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
