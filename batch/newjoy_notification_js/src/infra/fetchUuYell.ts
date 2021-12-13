import axios from 'axios'
import { Dayjs } from 'dayjs'
import { WP_REST_API_Posts } from 'wp-types'

// uu-yell の記事一覧を取得する
const API_POSTS_URL = 'https://media.uu-circles.com/wp-json/wp/v2/posts'

interface Props {
    /** 1日前の時刻 */ dtBefore: Dayjs,
    /** 現在の時刻 */ dtNow: Dayjs
}
/**
 * 最新の uu-yell の記事を取得する
 *
 * @returns
 */
export const fetchLatestUuYellPosts = async ({
    dtBefore,
    dtNow,
}: Props): Promise<WP_REST_API_Posts> => {
    // dayjs のフォーマット
    const dayjsFormat = 'YYYY-MM-DDTHH:mm:ss'

    // クエリパラメータの生成
    // @see https://nodejs.org/dist/latest-v16.x/docs/api/url.html#class-urlsearchparams
    const params = new URLSearchParams([
        ['context', 'embed'],
        ['after', dtBefore.format(dayjsFormat)],
        ['before', dtNow.format(dayjsFormat)],
    ])
    // リクエストするURL
    const requestUrl = `${API_POSTS_URL}?${params.toString()}`

    // API へリクエスト
    const { data: posts } = await axios.get<WP_REST_API_Posts>(requestUrl)

    return posts
}
