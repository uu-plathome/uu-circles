import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { createPagePosition } from "../lib/infra/api/pagePosition";

const PUSHER_KEY = 'a9b069e2da6cbb2a3766'

export const usePagePosition = ({
  pageUrl,
  identifierHash,
}: {
  pageUrl: string
  identifierHash: string
}) => {
  const [pagePositionId, setPagePositionId] = useState<string>('')
  const [pageData, setPageData] = useState<any>({})
  const [onProcess, setOnProcess] = useState<boolean>(false)
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

  useEffect(() => {
    if (identifierHash) {
      const channelName = 'my-channel-name'
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: 'ap3'
      });

      pusher.subscribe(channelName).bind('my-event', (data) => {
        console.info('Received event:', data)
        setPageData(data)
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
