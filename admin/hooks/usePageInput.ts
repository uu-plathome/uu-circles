import { Dispatch, SetStateAction, useMemo, useState } from 'react'

/**
 * フロントのページネーション実装
 */
export const usePageInput = ({
  initialMaxPage,
  pageSize,
}: {
  initialMaxPage: number
  pageSize: number
}): {
  page: number
  pageSize: number
  maxPage: number
  hasPrevious: boolean
  hasNext: boolean
  setMaxPage: Dispatch<SetStateAction<number>>
  previousPage: (callback: () => void) => void
  nextPage: (callback: () => void) => void
  updatePage: (newPage: number) => void
} => {
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(initialMaxPage)

  /**
   * 前のページへ戻る
   */
  const previousPage = (callback: () => void) => {
    updatePage(page - 1)
    if (callback) {
      callback()
    }
  }
  /**
   * 次のページへ進む
   */
  const nextPage = (callback: () => void) => {
    updatePage(page + 1)
    if (callback) {
      callback()
    }
  }

  /**
   * ページの更新
   */
  const updatePage = (newPage: number) => {
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
    hasPrevious: useMemo(() => maxPage > 1 && page !== 1, [maxPage, page]),
    hasNext: useMemo(() => maxPage > 1 && page !== maxPage, [maxPage, page]),
    setMaxPage,
    previousPage,
    nextPage,
    updatePage,
  }
}
