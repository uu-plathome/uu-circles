import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/infra/api";

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
  const onChangeId = async (id: string) => {
    setPagePositionId(id)

    if (identifierHash) {
      await axiosInstance.get('/api/page-position')
    }
  }

  useEffect(() => {
    if (identifierHash) {
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: 'ap3'
      });

      pusher.subscribe('my-channel-name').bind('my-event', (data) => {
        console.info('Received event:', data)
        setPageData(data)
      })
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
