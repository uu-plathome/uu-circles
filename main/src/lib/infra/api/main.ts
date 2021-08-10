import { WP_REST_API_Posts } from 'wp-types'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'

export const getMain = async (): Promise<{
  /** サークル */ circles: Circle[]
  /** 広告 */ advertises: Advertise[]
  /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}> => {
  type Response = {
    /** サークル */ data: Circle[]
    /** 広告 */ advertises: Advertise[]
    /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.MAIN.INDEX)

  return {
    /** サークル */ circles: data.data,
    /** 広告 */ advertises: data.advertises,
    /** トップのカルーセル用の広告 */ mainAdvertises: data.mainAdvertises,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
  }
}

export const getMainDemo = async (): Promise<{
  /** サークル */ circles: Circle[]
  /** 広告 */ advertises: Advertise[]
  /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}> => {
  type Response = {
    /** サークル */ data: Circle[]
    /** 広告 */ advertises: Advertise[]
    /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.MAIN.DEMO)

  return {
    /** サークル */ circles: data.data,
    /** 広告 */ advertises: data.advertises,
    /** トップのカルーセル用の広告 */ mainAdvertises: data.mainAdvertises,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
  }
}
