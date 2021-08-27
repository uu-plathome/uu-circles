import axios from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import useSWR from 'swr'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { GreenLgButton } from '@/src/components/atoms/button/GreenLgButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainUucircleBottomButtons } from '@/src/components/pages/Main/Parts/MainUucircleBottomButtons'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { ApiUrl } from '@/src/lib/enum/app/ApiUrl'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { UuYellTagNumber } from '@/src/lib/enum/app/UuYellTagNumber'

const UU_YELL_URL = ApiUrl.UU_YELL

const ID_LIST = {
  header_to_new_students: 'header_to_new_students',
  toc: 'toc',
  first: 'first',
  second: 'second',
  third: 'third',
  fourth: 'fourth',
} as const

const SubHeader: FC<{
  id: string
}> = ({ children, id }) => {
  return (
    <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
      <h2 id={`${id}_heading`} className="px-4 text-2xl font-bold">
        {children}
      </h2>
    </div>
  )
}

type Props = Record<string, never>
const Page: NextPage<Props> = () => {
  // 識別子の取得
  const [identifierHash, setIdentifierHash] = useState(null)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  const { onChangeId } = usePagePosition({
    pageUrl: `/guide/to-new-students`,
    pageName: `guide_to-new-students`,
    identifierHash,
  })

  // uu-yellの記事の取得
  const { data: uuYellForMain } = useSWR<{
    posts: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }>(['main'], async () => {
    const TAG_NUMBER = UuYellTagNumber.UuCirclesRecommend
    const fetchedPosts = await axios.get<WP_REST_API_Posts>(
      `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&tags=${TAG_NUMBER}`
    )

    if (fetchedPosts.data.length === 0) {
      return {
        posts: [],
        medias: [],
      }
    }

    const mediaIds = fetchedPosts.data.map((post) => post.featured_media)
    const queryMediaIds = mediaIds.join(',')

    const fetchedMedias = await axios.get<WP_REST_API_Attachments>(
      `${UU_YELL_URL}/wp-json/wp/v2/media?perPage=100&context=embed&include=${queryMediaIds}`
    )

    return {
      posts: fetchedPosts.data,
      medias: fetchedMedias.data,
    }
  })

  return (
    <>
      <BaseHead title={`新入生へ`} />

      <BaseLayout>
        <div className="px-2 bg-gray-100">
          <BaseContainer>
            <div id={ID_LIST.header_to_new_students} onMouseOver={() => onChangeId(ID_LIST.header_to_new_students)}>
              <div className="flex justify-center items-center pt-6">
                <a href="https://discord.com/download">
                  <Image
                    src="/images/topButtons/Rectangle15.png"
                    width="328"
                    height="76"
                    alt="ディスコードをダウンロードしよう！"
                  />
                </a>
              </div>
              <h1 className="px-4 pt-6 pb-8 text-2xl">新入生へ</h1>
            </div>

            <div id={ID_LIST.toc} onMouseOver={() => onChangeId(ID_LIST.toc)} className="py-6 px-8 mx-4 bg-white rounded-md text-gray-500">
              <h1 className="pt-1 text-2xl">目次</h1>
              <p className="pt-2">
                <ScrollLink
                  to={ID_LIST.first}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:underline cursor-pointer"
                >
                  0. 新入生へ
                </ScrollLink>
              </p>
              <p className="pt-2">
                <ScrollLink
                  to={ID_LIST.second}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:underline cursor-pointer"
                >
                  1. 気になったサークルを見てみよう
                </ScrollLink>
              </p>
              {/* <p className="pt-2">
                <ScrollLink
                    to={ID_LIST.first}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                  2. オンライン新歓会場に参加してみよう
                  </ScrollLink>
                </p> */}
              <p className="pt-2">
                <ScrollLink
                  to={ID_LIST.third}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:underline cursor-pointer"
                >
                  2. いつ・どんな新歓があるか確認してみよう
                </ScrollLink>
              </p>
              <p className="pt-2">
                <ScrollLink
                  to={ID_LIST.fourth}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:underline cursor-pointer"
                >
                  3. uu-yellをみよう
                </ScrollLink>
              </p>
            </div>

            <div id={ID_LIST.first} onMouseOver={() => onChangeId(ID_LIST.first)}>
              <SubHeader id={ID_LIST.first}>0. 新入生へ</SubHeader>
              <p className="px-4 pb-6">新入生の方々合格おめでとうございます。</p>
              <p className="px-4 pb-6">
                新型コロナという残念な状況ではありますが、
                その中でも新入生が楽しく学生生活を送れるようにこのサイトを制作運営しています。
                在校生一同皆様のご入学を心からお祝い申し上げます
              </p>
            </div>

            <div id={ID_LIST.second} onMouseOver={() => onChangeId(ID_LIST.second)}>
              <SubHeader id={ID_LIST.second}>
                1. 気になったサークルを見てみよう
              </SubHeader>

              <p className="px-4 pb-6">
                ホームのサークル一覧から、「なんだか楽しそう！」と思ったビラをタップして
                実際にサークル情報を見てみましょう。
              </p>

              <div className="pt-4 pb-8">
                <GreenLgButton href="/">UU-Circleのトップ画面へ</GreenLgButton>
              </div>
            </div>

            {/* <SubHeader>2.オンライン新歓会場に参加してみよう</SubHeader>

            <div className="px-4 pb-6">
              <p>
                現在はオフラインでの新歓開催を予定していますが、
                オンラインになった場合のためにdiscordと呼ばれるプラットフォームを用いて
                、サークルが新歓の告知から説明会まで行ってくれます。まだ入っていない人は下のボタンをタップ！
              </p>
            </div>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/guide/discord">
                オンライン新歓会場への参加方法へ
              </GreenLgButton>
            </div> */}

            <div id={ID_LIST.third} onMouseOver={() => onChangeId(ID_LIST.third)}>
              <SubHeader id={ID_LIST.third}>
                2. いつ・どんな新歓があるか確認してみよう
              </SubHeader>

              <div className="px-4 pb-6">
                <p>
                  今日の新歓というバナーからその日にある新歓や、これからどんな新歓が行われるかがオンラインでわかります。
                  毎日チェックして気になった新歓に遊びに行こう！
                </p>
              </div>

              <div className="pt-4 pb-8">
                <GreenLgButton href="/circle/newjoy">
                  今日の新歓ページへ
                </GreenLgButton>
              </div>
            </div>

            <div id={ID_LIST.fourth} onMouseOver={() => onChangeId(ID_LIST.fourth)}>
              <SubHeader id={ID_LIST.fourth}>3. uu-yellをみよう</SubHeader>

              <div className="px-4 pb-6">
                <p className="px-4 pb-6">
                  {' '}
                  キャッチコピーは「uu-mailのとなりにuu-yell。」
                </p>
                <p className="px-4 pb-6">
                  UU-Circlesの姉妹サイトの「メディアサイトuu-yell」は宇都宮大学の学生活動の発信＆受信における”プラットフォーム”です。
                </p>
                <p className="px-4 pb-6">
                  以下の2本軸でプラットフォームを体現していきます。
                </p>
                <div className="px-4 pb-6">
                  <blockquote cite="https://media.uu-circles.com/about/">
                    <ol className="p-4 list-decimal list-inside border border-gray-400 round">
                      <li>
                        uu-yell編集部からの直接的な情報発信（学生活動の取材記事や読者要望に応えた記事、編集部企画の記事など）
                      </li>
                      <li>
                        学生活動の発信媒体としてのサイト活用の促進（栃木イチオシ発信局Ufori’aやキャンパる編集室などの団体、個人コラムの連載など）
                      </li>
                    </ol>
                  </blockquote>
                </div>
                <p className="px-4 pb-6">
                  是非チェックしてホーム画面に追加してね！
                </p>
              </div>

              <div className="pb-6">
                <GreenLgButton href="https://media.uu-circles.com">
                  メディアサイトuu-yellへ
                </GreenLgButton>
              </div>
            </div>
          </BaseContainer>

          <MainUucircleBottomButtons
            medias={uuYellForMain ? uuYellForMain.medias : []}
            posts={uuYellForMain ? uuYellForMain.posts : []}
          />
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </>
  )
}

export default Page
