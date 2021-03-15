import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { AuthContext } from '@/contexts/AuthContext'
import { showCircle } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const useCircleId = () => {
  const router = useRouter()
  const { circleId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
  }
}

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circle, setCircle] = useState<Circle>()
  const { circleId } = useCircleId()

  useEffect(() => {
    const f = async () => {
      setCircle(await showCircle(circleId))
    }

    f()
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <div className="pb-32 md:pb-72">
          {circle ? (
            <div>
              <h1 className="text-lg font-bold text-center pt-10 pb-6">{ circle.name }</h1>

              <Link href="/circle/[circleId]/edit" as={`/circle/${circle.id}/edit`}>
                <a>
                  <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6" style={{ width: 280 }}>
                    <div className="flex justify-between">
                      <FontAwesomeIcon icon={faFileAlt} />
                      <div className="text-center">
                        <p className="font-lg font-bold">サークル情報の編集</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/circle/[circleId]/edit" as={`/circle/${circle.id}/edit`}>
                <a>
                  <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6" style={{ width: 280 }}>
                    <div className="flex justify-between">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <div className="text-center">
                        <p className="font-lg font-bold">新歓イベントの追加・編集</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ) : ''}
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
