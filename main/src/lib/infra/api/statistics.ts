import { WP_REST_API_Posts } from 'wp-types'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Statistics } from '@/src/lib/types/model/Statistics'

/**
 * 統計情報取得API
 */
export const getStatistics = async (): Promise<{
  /** 統計情報 */ statistics: Statistics
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}> => {
  type Response = {
    /** 統計情報 */ statistics: Statistics
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.STATISTICS.INDEX)

  return {
    /** 統計情報 */ statistics: data.statistics,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
  }
}
