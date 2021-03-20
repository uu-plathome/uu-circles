import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { showCircle } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CircleNameHeader } from '@/components/organisms/Circle/CircleNameHeader'

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
        {/* <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-4" size="lg" />
          { circle ? circle.name : '' }
        </h1> */}

        <BaseContainer>

          <div className="pb-32 md:pb-72">
            {circle ? (
              <div>
                <CircleNameHeader
                  name={circle.name}
                  circleId={circleId}
                />

                <div className="pt-8 mb-4 text-center">
                  <div className="mb-8">
                    <Link href="/circle/[circleId]/edit" as={`/circle/${circle.id}/edit`}>
                      <a>
                        <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6 mx-auto" style={{ width: 280 }}>
                          <div className="flex justify-between items-center px-4" style={{ width: 280 }}>
                            <FontAwesomeIcon icon={faFileAlt} size="lg" />
                            <div className="text-center">
                              <p className="font-lg font-bold">サークル情報の編集</p>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>

                  <div className="mb-8">
                    <Link href="/circle/[circleId]/newjoy" as={`/circle/${circle.id}/newjoy`}>
                      <a>
                        <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6 mx-auto" style={{ width: 280 }}>
                          <div className="flex justify-between items-center px-4" style={{ width: 280 }}>
                            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                            <div className="text-center">
                              <p className="font-lg font-bold">新歓イベントの追加・編集</p>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ) : ''}
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
