import { Advertise } from '@/lib/types/model/Advertise'
import { Circle } from '@/lib/types/model/Circle'
import { WP_REST_API_Post } from 'wp-types'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'
import { Announcement } from '@/lib/types/model/Announcement'

export const getMain = async (): Promise<{
  /** サークル */ circles: Circle[]
  /** 広告 */ advertises: Advertise[]
  /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  /** お知らせ */ announcements: Announcement[]
}> => {
  type Response = {
    /** サークル */ data: Circle[]
    /** 広告 */ advertises: Advertise[]
    /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
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
