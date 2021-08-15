import axios from 'axios'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { WpPostsList } from './types/WpPostsList'
import { ApiUrl } from '@/src/lib/enum/app/ApiUrl'
import { UuYellTagNumber } from '@/src/lib/enum/app/UuYellTagNumber'

const UU_YELL_URL = ApiUrl.UU_YELL

/**
 * uu-yellの記事の取得
 */
export const fetchPostsOfUuYellRecommend = async (): Promise<WpPostsList> => {
  // 「編集長イチオシ」タグの記事を取得
  const TAG_NUMBER = UuYellTagNumber.UuCirclesRecommend

  // 記事取得
  const fetchedPosts = await axios.get<WP_REST_API_Posts>(
    `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&tags=${TAG_NUMBER}`
  )

  // 記事が 0件のとき
  if (fetchedPosts.data.length === 0) {
    return {
      posts: [],
      medias: [],
    }
  }

  // 画像取得
  const mediaIds = fetchedPosts.data.map((post) => post.featured_media)
  const queryMediaIds = mediaIds.join(',')

  const fetchedMedias = await axios.get<WP_REST_API_Attachments>(
    `${UU_YELL_URL}/wp-json/wp/v2/media?perPage=100&context=embed&include=${queryMediaIds}`
  )

  return {
    posts: fetchedPosts.data,
    medias: fetchedMedias.data,
  }
}
