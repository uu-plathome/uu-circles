import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { createPagePosition } from "../lib/infra/api/pagePosition";
import { PagePositions } from "../lib/types/model/PagePosition";

const PUSHER_KEY = 'a9b069e2da6cbb2a3766'

export const usePagePosition = ({
  pageUrl,
  identifierHash,
}: {
  pageUrl: string
  identifierHash: string
}) => {
  const [pagePositionId, setPagePositionId] = useState<string>('')
  const [pageData, setPageData] = useState<PagePositions>({
    pageUrl,
    pagePositions: [],
  })
  const [onProcess, setOnProcess] = useState<boolean>(false)

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

      await createPagePosition({
        identifierHash,
        request: {
          type: 'CreatePagePositionRequest',
          pageUrl,
          pagePositionId: _pagePositionId,
        }
      })
    } finally {
      setOnProcess(false)
    }
  }

  /**
   * リアルタイム同期
   */
  useEffect(() => {
    if (identifierHash) {
      const channelName = 'page-position-channel'
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: 'ap3'
      });

      pusher.subscribe(channelName).bind('my-event', (data: { arg: PagePositions }) => {
        console.info('Received event:', data)
        setPageData(data.arg)
      })

      return () => pusher.unsubscribe(channelName);
    }
  }, [identifierHash])

  return {
    pagePositionId,
    pageData,
    pageUrl,
    identifierHash,
    onChangeId,
  };
}
