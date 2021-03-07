import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import { getCircleBySlug } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { NewJoyList } from '@/components/organisms/ShowCircle/NewJoyList'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { GreenButton } from '@/components/atoms/button/GreenButton'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { AppealingPoint } from '@/components/organisms/ShowCircle/AppealingPoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faWallet,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons'
import Color from 'colors'
import { CircleTypeBadge } from '@/components/molecules/Badge/CircleTypeBadge'
import { CircleType } from '@/lib/enum/api/CircleType'
import { TopImage } from '@/components/organisms/ShowCircle/TopImage'
import { InformationField } from '@/components/organisms/ShowCircle/InformationField'
import Image from 'next/image'
import { BaseHead } from '@/components/layouts/BaseHead'
import { PageNotFoundError } from '@/infra/api/error'
import Error from 'next/error'

type Props = {
  circle?: Circle
  circleNewJoys?: CircleNewJoy[]
  errorCode?: number
}
const Page: NextPage<Props> = ({ circle, circleNewJoys, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  // w : h = 210 : 297
  const width = 300
  const height = (300 * 297) / 210
  return (
    <div>
      <BaseHead title={`${circle.name} サークル詳細`} />

      <BaseLayout>
        <div>
          <BaseContainer>
            <div>
              <div className="bg-white">
                <TopImage circle={circle} />
              </div>

              <div className="flex justify-between bg-white px-4 md:px-10 py-6 border-b border-gray-50">
                <div>
                  <p className="text-sm">{circle.prefixName}</p>
                  <h1 className="text-lg md:text-2xl font-bold">
                    {circle.name}
                  </h1>
                </div>

                <div>
                  <CircleTypeBadge
                    circleType={circle.circleType as CircleType}
                  />
                </div>
              </div>

              <div className="flex justify-between md:justify-start bg-white px-4 md:px-10 py-2">
                {/* 活動人数 */}
                <div className="md:mr-4">
                  <p>
                    <FontAwesomeIcon
                      color={Color.gray[600]}
                      icon={faUserFriends}
                    />
                    <span className="pl-2">{circle.numberOfMembers}人</span>
                  </p>
                </div>
                {/* 週の活動日数 */}
                <div className="md:mr-4">
                  <p>
                    <FontAwesomeIcon
                      color={Color.red[500]}
                      icon={faWaveSquare}
                    />
                    <span className="pl-2">週{circle.weeklyActivityDays}</span>
                  </p>
                </div>
                {/* 年間費用 */}
                <div className="md:mr-4">
                  <p>
                    <FontAwesomeIcon color={Color.gray[600]} icon={faWallet} />
                    <span className="pl-2">
                      {circle.admissionFeePerYear
                        ? Number(circle.admissionFeePerYear).toLocaleString()
                        : 0}
                      円/年
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-20">
              <div className="order-1">
                <AppealingPoint circle={circle} />
              </div>

              {circle.handbillImageUrl ? (
                <div className="order-2 pt-10">
                  <h2 className="text-lg text-center mb-6 md:text-left">
                    新歓ビラ
                  </h2>

                  <div className="flex justify-center md:justify-start">
                    <a href={circle.handbillImageUrl} target="_blank">
                      <Image
                        src={circle.handbillImageUrl}
                        alt={`${circle.name}新歓ビラ`}
                        width={width}
                        height={height}
                        className="rounded"
                        objectFit="cover"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="order-3 md:order-4 pt-10">
                <div>
                  {circleNewJoys && circleNewJoys.length > 0 ? (
                    <div>
                      <NewJoyList
                        slug={circle.slug}
                        circleNewJoys={circleNewJoys}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-center md:text-left mb-8 text-lg">
                        新歓イベント日程
                      </h2>
                      <p className="text-center">
                        現在開催予定の新歓はありません
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                  <GreenButton
                    href="/circle/[slug]/newjoy"
                    as={`/circle/${circle.slug}/newjoy`}
                  >
                    もっと詳しく
                  </GreenButton>
                </div>
              </div>

              <div className="order-4 md:order-3 pt-10">
                <InformationField circle={circle} />
              </div>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
  }

  try {
    const { circle, circleNewJoys } = await getCircleBySlug(params.slug)

    return {
      props: {
        circle,
        circleNewJoys,
      },
      revalidate: 60,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export default Page
