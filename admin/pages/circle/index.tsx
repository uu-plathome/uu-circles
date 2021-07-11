import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { Index } from '@/components/pages/circle/Index'
import { useStringInput } from '@/hooks/useInput'
import { getCircleList } from '@/infra/api/circle'
import { CircleType } from '@/lib/enum/api/CircleType'
import { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

const usePageInput = ({
  initialMaxPage,
  pageSize,
}: {
  initialMaxPage: number
  pageSize: number
}) => {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(initialMaxPage)

  const previousPage = () => {
    updatePage(page - 1)
  }
  const nextPage = () => {
    updatePage(page + 1)
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
    setMaxPage,
    previousPage,
    nextPage,
    updatePage,
  }
}

const IndexPage: NextPage = () => {
  const { data: originalCircles } = useSWR('/circles', getCircleList)

  const searchName = useStringInput('')
  const searchRelease = useStringInput('')
  const searchCircleType = useStringInput('')

  const page = usePageInput({
    initialMaxPage: Math.ceil(
      originalCircles ? originalCircles.length / 10 : 1
    ),
    pageSize: 10,
  })

  const searchedCircles = useMemo(() => {
    if (!originalCircles) {
      return {
        circles: [],
      }
    }

    const newCircles = (() => {
      const filteredName = originalCircles.filter((c) => {
        if (c.name && ~c.name.indexOf(searchName.value)) {
          return true
        }

        if (c.shortName && ~c.shortName.indexOf(searchName.value)) {
          return true
        }

        if (c.nameKana && ~c.nameKana.indexOf(searchName.value)) {
          return true
        }

        if (c.prefixName && ~c.prefixName.indexOf(searchName.value)) {
          return true
        }

        if (c.slug && ~c.slug.indexOf(searchName.value)) {
          return true
        }

        if (c.description && ~c.description.indexOf(searchName.value)) {
          return true
        }

        return false
      })

      const filteredRelease =
        searchRelease.value === ''
          ? filteredName
          : filteredName.filter((c) => {
              if (searchRelease.value === 'true' && c.release === true) {
                return true
              }

              if (searchRelease.value === 'false' && c.release === false) {
                return true
              }

              return false
            })

      const filteredCircleType =
        searchCircleType.value === ''
          ? filteredRelease
          : filteredRelease.filter((c) => {
              if (
                searchCircleType.value === CircleType.OFFICIAL_ORGANIZATION &&
                c.circleType === CircleType.OFFICIAL_ORGANIZATION
              ) {
                return true
              }

              if (
                searchCircleType.value === CircleType.SENDING_ORGANIZATION &&
                c.circleType === CircleType.SENDING_ORGANIZATION
              ) {
                return true
              }

              if (
                searchCircleType.value === CircleType.STUDENT_GROUP &&
                c.circleType === CircleType.STUDENT_GROUP
              ) {
                return true
              }

              if (
                searchCircleType.value === CircleType.UNOFFICIAL_ORGANIZATION &&
                c.circleType === CircleType.UNOFFICIAL_ORGANIZATION
              ) {
                return true
              }

              if (
                searchCircleType.value === '不明' &&
                ['', null].includes(c.circleType)
              ) {
                return true
              }

              return false
            })

      page.setMaxPage(
        Math.ceil(filteredCircleType ? filteredCircleType.length / 10 : 1)
      )

      return filteredCircleType
    })()

    return {
      circles: newCircles.slice(
        (page.page - 1) * page.pageSize,
        page.page * page.pageSize
      ),
    }
  }, [
    originalCircles,
    page.page,
    page.pageSize,
    searchName.value,
    searchRelease.value,
    searchCircleType.value,
  ])

  useMemo(() => {
    page.updatePage(1)
  }, [searchName.value, searchRelease.value, searchCircleType.value])

  if (!originalCircles) {
    return <SubmitLoading isOpen={true} />
  }

  return (
    <div id="top">
      <Head>
        <title>サークル一覧へようこそ</title>
      </Head>

      <Index
        circles={searchedCircles.circles}
        searchValue={{
          name: searchName,
          release: searchRelease,
          circleType: searchCircleType,
        }}
        hasPrevious={page.page !== 1}
        hasNext={page.page !== page.maxPage}
        onPrevious={page.previousPage}
        onNext={page.nextPage}
      />
    </div>
  )
}

export default IndexPage
