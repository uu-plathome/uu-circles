import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { IndexCircleNewJoyList } from '@/components/organisms/List/IndexCircleNewJoyList'
import { getCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useMediaQuery } from '@/hooks/useMediaQuery'
type Props = {
  /** サークル */ circle?: Circle
  errorCode?: number
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
}
const Page: NextPage<Props> = ({
  circle,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
}) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            {isMd ? (
              //PC
              <div style={{ width: 750 }}>
                <h1 className="text-2xl text-center py-8">
                  {circle.name}の新歓
                </h1>

                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <div className="pb-16">
                    <h2 className="text-center text-2xl  pl-1 mb-3">開催中</h2>
                    <div className="grid grid-cols-7">
                      <div className="col-span-5">
                        <IndexCircleNewJoyList
                          slug={circle.slug}
                          circleNewJoys={nowCircleNewJoys}
                        />
                      </div>
                      <div
                        className="col-span-2 bg-gray-300 text-white flex items-center mx-1"
                        style={{ width: 222, height: 324 }}
                      >
                        <h3 className="text-xl text-center mx-auto">
                          discodeのバナー広告
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className="pb-16">
                  <h2 className="text-center text-2xl pl-1 mb-3">今日の新歓</h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <div className="grid grid-cols-7">
                      <div className="col-span-5">
                        <IndexCircleNewJoyList
                          slug={circle.slug}
                          circleNewJoys={todayCircleNewJoys}
                        />
                      </div>
                      <div className="col-span-2"></div>
                    </div>
                  ) : (
                    <p>今日の新歓はありません</p>
                  )}
                </div>

                <div className="pb-16">
                  <h2 className="text-center text-2xl pl-1 mb-3">開催予定</h2>
                  <div className="grid grid-cols-7">
                    <div className="col-span-5">
                      <IndexCircleNewJoyList
                        slug={circle.slug}
                        circleNewJoys={futureCircleNewJoys}
                      />
                    </div>
                    <div className="col-span-2"></div>
                  </div>
                </div>

                <div className="pb-16">
                  <h2 className="text-center text-2xl pl-1 mb-3">開催済み</h2>
                  <div className="grid grid-cols-7">
                    <div className="col-span-5">
                      <IndexCircleNewJoyList
                        slug={circle.slug}
                        circleNewJoys={pastCircleNewJoys}
                      />
                    </div>
                    <div className="col-span-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl py-8">新歓イベント日程詳細</h1>
                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <div className="pb-16">
                    <h2 className="text-center text-lg md:text-center pl-1 mb-3">
                      開催中
                    </h2>
                    <IndexCircleNewJoyList
                      slug={circle.slug}
                      circleNewJoys={nowCircleNewJoys}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyList
                      slug={circle.slug}
                      circleNewJoys={todayCircleNewJoys}
                    />
                  ) : (
                    <p>今日の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    開催予定
                  </h2>
                  <IndexCircleNewJoyList
                    slug={circle.slug}
                    circleNewJoys={futureCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                    開催済み
                  </h2>
                  <IndexCircleNewJoyList
                    slug={circle.slug}
                    circleNewJoys={pastCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                    <a>
                      <h2 className="font-bold text-lg pl-1 mb-3">
                        主催サークル
                      </h2>
                      <div
                        className="border border-4 border-gray-300 bg-white rounded-lg flex justify-between items-center px-2 py-2 mx-auto mb-2"
                        style={{ width: 300 }}
                      >
                        <div className="mr-2" style={{ width: 64 }}>
                          <Image
                            src={
                              circle.mainImageUrl
                                ? circle.mainImageUrl
                                : '/images/no-image.png'
                            }
                            alt={`${circle.name}のロゴ`}
                            width={64}
                            height={64}
                            className="rounded-full border border-gray-300"
                          />
                        </div>
                        <div className="w-full pr-2" style={{ width: 200 }}>
                          <h3 className="text-black font-bold mb-1 text-sm font-bold">
                            {circle.name}
                          </h3>
                          <div>
                            <p className="text-xs text-gray-600">
                              {circle.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>{' '}
              </div>
            )}
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  res,
}) => {
  if (!params.slug || Array.isArray(params.slug)) {
    res.statusCode = 404
    return { props: { errorCode: 404 } }
  }

  const {
    circle,
    pastCircleNewJoys,
    futureCircleNewJoys,
    nowCircleNewJoys,
    todayCircleNewJoys,
    allTodayCircleNewJoys,
  } = await getCircleNewJoyBySlug(params.slug)

  return {
    props: {
      circle,
      pastCircleNewJoys,
      futureCircleNewJoys,
      nowCircleNewJoys,
      todayCircleNewJoys,
      allTodayCircleNewJoys,
    },
  }
}

export default Page
