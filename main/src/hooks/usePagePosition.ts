import { useEffect, useState } from 'react'
import { createPagePosition } from '../lib/infra/api/pagePosition'
import { isCreatePagePositionRequestValidationError } from '../lib/types/api/CreatePagePositionRequest'
import { PagePositions } from '../lib/types/model/PagePosition'
import { pagePositionChannel } from '../plugins/Pusher'
import { useWindowResize } from './useWindowResize'

export type PagePositionRecord = {
  pagePositionHistoryId: number
  createdAt: string
}
export const usePagePosition = ({
  pageUrl,
  pageName,
  identifierHash,
}: {
  pageUrl: string
  pageName: string
  identifierHash: string
}): {
  pagePositionId: string
  pageData: PagePositions
  pageUrl: string
  identifierHash: string
  recordPagePosition: PagePositionRecord[]
  onChangeId: (_pagePositionId: string) => Promise<void>
} => {
  const [pagePositionId, setPagePositionId] = useState<string>('')
  const [pageData, setPageData] = useState<PagePositions>({
    pageUrl,
    pagePositions: [],
  })
  const [onProcess, setOnProcess] = useState<boolean>(false)
  const [recordPagePosition, setRecordPagePosition] = useState<
    PagePositionRecord[]
  >([])
  // 画面サイズ
  const { width, height } = useWindowResize()

  /**
   * 位置の記録を行う
   */
  const onChangeId = async (_pagePositionId: string) => {
    setPagePositionId(_pagePositionId)

    if (!identifierHash) {
      return
    }

    if (onProcess) {
      return
    }

    console.info('onChangeId', _pagePositionId)

    try {
      setOnProcess(true)

      const apiResponse = await createPagePosition({
        identifierHash,
        request: {
          type: 'CreatePagePositionRequest',
          pageUrl,
          pageName,
          pagePositionId: _pagePositionId,
          screenWidth: width,
          screenHeight: height,
        },
      })

      if (isCreatePagePositionRequestValidationError(apiResponse)) {
        console.error(apiResponse)
        return
      }

      setRecordPagePosition([
        ...recordPagePosition,
        {
          pagePositionHistoryId: apiResponse.pagePositionHistoryId,
          createdAt: apiResponse.createdAt,
        },
      ])
    } finally {
      setTimeout(() => {
        setOnProcess(false)
      }, 500)
    }
  }

  /**
   * リアルタイム同期
   */
  useEffect(() => {
    const eventName = `my-event_${pageName}`

    pagePositionChannel
      .bind(eventName, (data: { arg: PagePositions }) => {
        // console.info('Received event:', data)
        setPageData(data.arg)
      })

    return () => { pagePositionChannel.unbind(eventName) }
  }, [identifierHash, pageName])

  return {
    pagePositionId,
    pageData,
    pageUrl,
    identifierHash,
    recordPagePosition,
    onChangeId,
  }
}
