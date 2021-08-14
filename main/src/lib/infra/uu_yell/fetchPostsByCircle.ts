import axios from "axios"
import { WP_REST_API_Attachments, WP_REST_API_Posts } from "wp-types"
import { ApiUrl } from "../../enum/app/ApiUrl"
import { WpPostsList } from "./types/WpPostsList"

const UU_YELL_URL = ApiUrl.UU_YELL

export const fetchPostsByCircle = async ({
  circleSlug,
  circleName,
  circleShortName,
}: {
  circleSlug: string,
  circleName: string
  circleShortName?: string
}): Promise<WpPostsList> => {
  const promiseValues = [
    axios.get<WP_REST_API_Posts>(
      `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&search=${circleName}`
    ),
    axios.get<WP_REST_API_Posts>(
      `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&search=https://uu-circles.com/circle/${circleSlug}`
    ),
  ]
  if (circleShortName) {
    promiseValues.push(
      axios.get<WP_REST_API_Posts>(
        `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&search=${circleShortName}`
      ),
    )
  }
  const fetchedPosts = await Promise.all(promiseValues)

  const allPosts = [...fetchedPosts[0].data, ...fetchedPosts[1].data]

  // 重複している投稿の削除
  const postIds = [
    ...new Set([
      ...fetchedPosts[0].data.map((post) => post.id),
      ...fetchedPosts[1].data.map((post) => post.id),
    ]),
  ]
  const posts = postIds.map((postId) =>
    allPosts.find((post) => post.id === postId)
  )

  if (posts.length === 0) {
    return {
      posts: [],
      medias: [],
    }
  }

  const mediaIds = posts.map((post) => post.featured_media)
  const queryMediaIds = mediaIds.join(',')

  // 記事のアイキャッチ画像のURLを取得
  const fetchedMedias = await axios.get<WP_REST_API_Attachments>(
    `${UU_YELL_URL}/wp-json/wp/v2/media?perPage=100&context=embed&include=${queryMediaIds}`
  )

  return {
    posts,
    medias: fetchedMedias.data,
  }
}
