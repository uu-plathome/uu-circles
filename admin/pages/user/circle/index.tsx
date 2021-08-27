import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { scroller } from 'react-scroll'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { AllCircleUsersTemplate } from '@/components/pages/CircleUser/Index/AllCircleUsersTemplate'
import { useNumberInput, useStringInput } from '@/hooks/useInput'
import { usePageInput } from '@/hooks/usePageInput'
import {
  allCircleUserList,
  resendEmailCircleUser,
} from '@/infra/api/circle_user'
import { UserByAllCircle } from '@/lib/types/model/User'

const IndexPage: NextPage = () => {
  const [originalUsers, setOriginalUsers] =
    useState<UserByAllCircle[]>(undefined)
  const searchName = useStringInput('')
  const searchCircleCount = useNumberInput(null)
  const [isOpen, setIsOpen] = useState(false)
  const scrollTop = () => {
    scroller.scrollTo('top', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  const page = usePageInput({
    initialMaxPage: Math.ceil(originalUsers ? originalUsers.length / 10 : 1),
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

      const filteredCircleCount = filteredName.filter((u) => {
        if (['', null, undefined].includes(searchCircleCount.value)) {
          return true
        }

        if (u.circleUserCount && u.circleUserCount >= searchCircleCount.toNumber) {
          return true
        }

        return false
      })

      const _filteredUsers = filteredCircleCount

      page.setMaxPage(Math.ceil(_filteredUsers ? _filteredUsers.length / 10 : 1))

      return _filteredUsers
    })()

    return {
      users: newUsers.slice(
        (page.page - 1) * page.pageSize,
        page.page * page.pageSize
      ),
    }
  }, [originalUsers, page.page, page.pageSize, searchName.value, searchCircleCount.value])

  useMemo(() => {
    page.updatePage(1)
  }, [searchName.value, searchCircleCount.value])

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

      <SubmitLoading isOpen={isOpen} />

      <AllCircleUsersTemplate
        users={searchedUsers.users}
        searchValue={{
          name: searchName,
          circleCount: searchCircleCount,
        }}
        hasPrevious={page.hasPrevious}
        hasNext={page.hasNext}
        onPrevious={() => page.previousPage(scrollTop)}
        onNext={() => page.nextPage(scrollTop)}
        onResendEmail={onResendEmail}
      />
    </div>
  )
}

export default IndexPage
