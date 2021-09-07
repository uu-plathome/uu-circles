import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useContext } from 'react'
import useSWR from 'swr'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseBreadcrumbs } from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { CircleList } from '@/src/components/organisms/List/CircleList'
import { AuthContext } from '@/src/contexts/AuthContext'
import { getCircleList } from '@/src/lib/infra/api/circle'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)

  const { data } = useSWR(`/main`, getCircleList)

  const circles = data

  return (
    <>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={[]} />

        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faBuilding} className="mr-4" size="lg" />
          サークル一覧
        </h1>

        <div className="pt-8 pb-32">
          <div>
            {circles && Array.isArray(circles) && circles.length > 0 ? (
              <CircleList circles={circles} />
            ) : (
              <div className="text-center">Loading...</div>
            )}
          </div>

          <div className="pt-32 text-center">
            <Link href="/circle/withdrawal">
              <a className="text-red-600 hover:underline">サークルを脱退する</a>
            </Link>
          </div>
        </div>

        <BaseFooter />
      </BaseLayout>
    </>
  )
}

export default IndexPage
