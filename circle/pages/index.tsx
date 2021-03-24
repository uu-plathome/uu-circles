import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseBreadcrumbs } from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { CircleList } from '@/components/organisms/List/CircleList'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const f = async () => {
      setCircles(await getCircleList())
    }

    f()
  }, [])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={[]} />

        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faBuilding} className="mr-4" size="lg" />
          サークル一覧
        </h1>

        <div className="pt-8 pb-32">
          <div>
            {circles && circles.length > 0 ? (
              <CircleList circles={circles} />
            ) : (
              ''
            )}
          </div>

          <div className="text-center pt-32">
            <Link href="/circle/withdrawal">
              <a className="text-red-600 hover:underline">サークルを脱退する</a>
            </Link>
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default IndexPage
