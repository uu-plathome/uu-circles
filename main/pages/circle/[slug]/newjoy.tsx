import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { IndexCircleNewJoyListPC } from '@/components/organisms/List/IndexCircleNewJoyListPC'
import { IndexCircleNewJoyListSP } from '@/components/organisms/List/IndexCircleNewJoyListSP'
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
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため
  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            {isMd ? (
              //PC
              <div style={{ width: 750 }}>
                <h1 className="text-3xl text-center py-8">
                  {circle.name}の新歓
                </h1>
                <div className="grid grid-cols-7">
                  <div className="col-span-5">
                    {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                      <div className="pb-16">
                        <h2 className="text-left text-lg  pl-6 mb-3">開催中</h2>

                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={nowCircleNewJoys}
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">
                        今日の新歓
                      </h2>
                      {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={todayCircleNewJoys}
                        />
                      ) : (
                        <p>今日の新歓はありません</p>
                      )}
                    </div>

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">開催予定</h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={futureCircleNewJoys}
                      />
                    </div>

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">開催済み</h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={pastCircleNewJoys}
                      />
                    </div>
                  </div>

                  <div className="col-span-2  mx-1">
                    <h2 className="text-2xl">主要サークル</h2>
                    <div
                      className="bg-white mt-3 rounded-xl px-2"
                      style={{ width: 222, height: 324 }}
                    >
                      <div className="mx-auto text-center pb-3 pt-6">
                        <Image
                          src={
                            circle.mainImageUrl
                              ? circle.mainImageUrl
                              : '/images/no-image.png'
                          }
                          alt={`${circle.name}のロゴ`}
                          width={70}
                          height={70}
                          className="rounded-full border border-gray-300"
                        />
                      </div>
                      <h4 className="text-base text-center">
                        {circle.prefixName}
                      </h4>
                      <h3 className="text-xl text-center mt-3 mb-4">
                        {circle.name}
                      </h3>
                      <p className="text-xs text-left mx-auto">
                        {circle.description}
                      </p>
                      <nav className="text-right">
                        <Link
                          href="/circle/[slug]"
                          as={`/circle/${circle.slug}`}
                        >
                          <a className="text-xs text-blue-500 underline">
                            もっと詳しく
                          </a>
                        </Link>
                      </nav>
                      <nav className="text-center mt-8">
                        <Link href="" as={''}>
                          <a className="rounded-full text-white bg-green-500 text-center  px-3 py-2 text-base">
                            新歓日程
                          </a>
                        </Link>
                      </nav>
                    </div>
                    <Link href="/circle/newjoy" as={'/circle/newjoy'}>
                      <div
                        className="rounded-md text-white bg-yellow-500 text-center px-2 py-2 mt-6"
                        style={{ width: 222 }}
                      >
                        <h4 className="text-sm">他のサークルの新歓も見る</h4>
                        <h3 className="text-base font-bold">
                          今日の新歓をチェック！
                        </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl py-8">新歓イベント日程詳細</h1>
                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <div className="pb-16">
                    <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                      開催中
                    </h2>

                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={nowCircleNewJoys}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={todayCircleNewJoys}
                    />
                  ) : (
                    <p>今日の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催予定
                  </h2>
                  <IndexCircleNewJoyListSP
                    slug={circle.slug}
                    circleNewJoys={futureCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催済み
                  </h2>
                  <IndexCircleNewJoyListSP
                    slug={circle.slug}
                    circleNewJoys={pastCircleNewJoys}
                  />
                </div>
                <div className="pb-16">
                  <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                    <a>
                      <h2 className="font-bold text-lg pl-4 mb-3">
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
