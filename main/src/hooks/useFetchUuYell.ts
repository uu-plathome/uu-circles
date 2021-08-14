import useSWR from 'swr'
import { fetchPostsOfUuYellRecommend } from '../lib/infra/uu_yell/fetchPostsOfUuYellRecommend'
import { WpPostsList } from '../lib/infra/uu_yell/types/WpPostsList'

/**
 * uu-yellの記事の取得
 */
export const useFetchUuYell = (): {
  uuYellForMain: WpPostsList
} => {
  // uu-yellの記事の取得
  const { data: uuYellForMain } = useSWR<WpPostsList>(
    ['useFetchUuYell'],
    fetchPostsOfUuYellRecommend
  )

  return {
    uuYellForMain,
  }
}
