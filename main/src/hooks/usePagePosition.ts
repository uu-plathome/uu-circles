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
  circleSlug,
  identifierHash,
}: {
  pageUrl: string
  pageName: string
  circleSlug?: string
  identifierHash: string
}): {
  pagePositionId: string
  pageData: PagePositions
  pageUrl: string
  circleSlug?: string
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
  const [onProcessTimeoutId, setOnProcessTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined)
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

    if (process.env.NODE_ENV === 'development') {
      console.info('onChangeId', _pagePositionId)
    }

    try {
      setOnProcess(true)

      const apiResponse = await createPagePosition({
        identifierHash,
        request: {
          type: 'CreatePagePositionRequest',
          pageUrl,
          pageName,
          circleSlug,
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
      const timeoutId = setTimeout(() => {
        setOnProcess(false)
        setOnProcessTimeoutId(undefined)
      }, 1000)
      setOnProcessTimeoutId(timeoutId)
    }
  }

  /**
   * リアルタイム同期
   */
  useEffect(() => {
    const eventName = `my-event_${pageName}`

    pagePositionChannel.bind(eventName, (data: { arg: PagePositions }) => {
      // console.info('Received event:', data)
      setPageData(data.arg)
    })

    return () => {
      pagePositionChannel.unbind(eventName)
    }
  }, [identifierHash, pageName])

  /**
   * Timeoutの初期化
   */
  useEffect(() => {
    return () => {
      if (onProcessTimeoutId) {
        clearTimeout(onProcessTimeoutId)
        setOnProcessTimeoutId(undefined)
      }
    }
  })

  return {
    pagePositionId,
    pageData,
    pageUrl,
    circleSlug,
    identifierHash,
    recordPagePosition,
    onChangeId,
  }
}
export type UsePagePosition = ReturnType<typeof usePagePosition>
export type UsePagePositionArg = Parameters<typeof usePagePosition>[0]
