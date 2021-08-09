/**
 * ページ位置
 */
export interface PagePositions {
  pageUrl: string
  pagePositions: PagePositionItem[]
}

export interface PagePositionItem {
  pageUrl: string
  pagePositionId: string
  createdAt: string
}
