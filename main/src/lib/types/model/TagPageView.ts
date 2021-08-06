import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'

// タグページ閲覧数
export type TagPageView = {
  tagName: TagSlugProperty
  pageView: string
}
