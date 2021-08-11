import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AllUserListItem } from '@/components/molecules/list_items/AllUserListItem'
import { useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  allCircleUserList,
  resendEmailCircleUser,
} from '@/infra/api/circle_user'
import { User, UserByAllCircle } from '@/lib/types/model/User'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { scroller } from 'react-scroll'

const usePageInput = ({
  initialMaxPage,
  pageSize,
}: {
  initialMaxPage: number
  pageSize: number
}) => {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(initialMaxPage)

  const previousPage = (callback: () => void) => {
    updatePage(page - 1)
    if (callback) { callback() }
  }
  const nextPage = (callback: () => void) => {
    updatePage(page + 1)
    if (callback) { callback() }
  }

  const updatePage = (newPage: number) => {
    console.log(page)
    if (maxPage < newPage) {
      setPage(maxPage)
      return
    }

    if (1 > newPage) {
      setPage(1)
      return
    }

    setPage(newPage)
  }

  return {
    page,
    pageSize,
    maxPage,
    hasPrevious: page !== 1,
    hasNext: page !== maxPage,
    setMaxPage,
    previousPage,
    nextPage,
    updatePage,
  }
}
const IndexPage: NextPage = () => {
  const [originalUsers, setOriginalUsers] = useState<UserByAllCircle[]>(undefined)
  const { isMd } = useMediaQuery()
  const searchName = useStringInput('')
  const [isOpen, setIsOpen] = useState(false)
  const scrollTop = () => {
    scroller.scrollTo('top', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  const page = usePageInput({
    initialMaxPage: Math.ceil(
      originalUsers ? originalUsers.length / 10 : 1
    ),
    pageSize: 10,
  })

  useEffect(() => {
    const f = async () => {
      setOriginalUsers((await allCircleUserList()).data.users)
    }
    f()
  }, [])

  const searchedUsers = useMemo((): {
    users: UserByAllCircle[]
  } => {
    if (!originalUsers) {
      return {
        users: [],
      }
    }

    const newUsers = (() => {
      const filteredName = originalUsers.filter((u) => {
        if (u.username && ~u.username.indexOf(searchName.value)) {
          return true
        }

        if (u.displayName && ~u.displayName.indexOf(searchName.value)) {
          return true
        }

        if (u.email && ~u.email.indexOf(searchName.value)) {
          return true
        }

        return false
      })

      page.setMaxPage(
        Math.ceil(filteredName ? filteredName.length / 10 : 1)
      )

      return filteredName
    })()

    return {
      users: newUsers.slice(
        (page.page - 1) * page.pageSize,
        page.page * page.pageSize
      ),
    }
  }, [
    originalUsers,
    page.page,
    page.pageSize,
    searchName.value,
  ])

  useMemo(() => {
    page.updatePage(1)
  }, [searchName.value])

  const onResendEmail = async (email: string) => {
    setIsOpen(true)
    await resendEmailCircleUser(email)
    setIsOpen(false)
  }

  if (!originalUsers) {
    return <SubmitLoading isOpen={true} />
  }

  return (
    <div id="top">
      <Head>
        <title>部員アカウント一覧</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="部員アカウント一覧"
          actionText="サークル新規作成"
          actionHref="/circle/create"
        >
          <div className="border-2 border-gray-800 p-2">
            {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

            {searchedUsers ? (
              <div className="py-4 mb-8">
                <p className="text-white">ユーザー検索</p>

                <form>
                  <SearchTextField
                    id="nameSearch"
                    name="nameSearch"
                    expand
                    {...searchName}
                  />
                </form>
              </div>
            ) : (
              ''
            )}

            {searchedUsers && searchedUsers.users.length > 0
              ? searchedUsers.users.map((user: User) => {
                return (
                  <AllUserListItem
                    key={`user-${user.id}`}
                    user={user}
                    onResendEmail={onResendEmail}
                  />
                )
              })
              : ''}

            {searchedUsers && searchedUsers.users.length === 0 ? (
              <div className="py-4">
                <p className="text-white">
                  まだ部員アカウントが登録されていません
                </p>
              </div>
            ) : (
              ''
            )}

            {searchedUsers ? (
              <div className="text-center">
                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!page.hasPrevious}
                  onClick={() => page.previousPage(scrollTop)}
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleLeft}
                    size="2x"
                  />
                </button>

                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!page.hasNext}
                  onClick={() => page.nextPage(scrollTop)}
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
