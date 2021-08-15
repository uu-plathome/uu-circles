import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'

export type WpPostsList = {
  posts: WP_REST_API_Posts
  medias: WP_REST_API_Attachments
}
