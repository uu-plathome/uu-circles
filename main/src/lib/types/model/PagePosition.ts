/**
 * ページ位置
 */
export interface PagePositions {
  pageUrl: string
  pagePositions: PagePositionItem[]
}

export interface PagePositionItem {
  pagePositionHistoryId: number
  pageUrl: string
  pagePositionId: string
  circleSlug?: string
  createdAt: string
}
