import { GreenLgButton } from '@/components/atoms/button/GreenLgButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { MainUucircleBottomButtons } from '@/components/organisms/Main/MainUucircleBottomButtons'
import axios from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import { FC } from 'react'
import useSWR from 'swr'
import { WP_REST_API_Media, WP_REST_API_Post } from 'wp-types'

const UU_YELL_URL = 'https://media.uu-circles.com'

const SubHeader: FC = ({ children }) => {
  return (
    <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
      <h2 className="text-2xl px-4 font-bold">{children}</h2>
    </div>
  )
}

type Props = Record<string, never>
const Page: NextPage<Props> = () => {
  // uu-yellの記事の取得
  const { data: uuYellForMain } = useSWR<{
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Media[]
  }>(['main'], async () => {
    const TAG_NUMBER = 60
    const fetchedPosts = await axios.get<WP_REST_API_Post[]>(
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

    const fetchedMedias = await axios.get<WP_REST_API_Media[]>(
      `${UU_YELL_URL}/wp-json/wp/v2/media?perPage=100&context=embed&include=${queryMediaIds}`
    )

    return {
      posts: fetchedPosts.data,
      medias: fetchedMedias.data,
    }
  })

  return (
    <div>
      <BaseHead title={`新入生へ`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <a href="https://discord.com/download">
                <Image
                  src="/images/topButtons/Rectangle15.png"
                  width="328"
                  height="76"
                />
              </a>
            </div>
            <h1 className="text-2xl pt-6 pb-8 px-4">新入生へ</h1>
            <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
              <h1 className="text-2xl pt-1">目次</h1>
              <p className="pt-2">0. 新入生へ</p>
              <p className="pt-2">1. 気になったサークルを見てみよう</p>
              {/* <p className="pt-2">2. オンライン新歓会場に参加してみよう</p> */}
              <p className="pt-2">2. いつ・どんな新歓があるか確認してみよう</p>
              <p className="pt-2">3. uu-yellをみよう</p>
            </div>

            <SubHeader>0. 新入生へ</SubHeader>
            <p className="px-4 pb-6">新入生の方々合格おめでとうございます。</p>
            <p className="px-4 pb-6">
              新型コロナという残念な状況ではありますが、
              その中でも新入生が楽しく学生生活を送れるようにこのサイトを制作運営しています。
              在校生一同皆様のご入学を心からお祝い申し上げます
            </p>

            <SubHeader>1. 気になったサークルを見てみよう</SubHeader>

            <p className="pb-6 px-4">
              ホームのサークル一覧から、「なんだか楽しそう！」と思ったビラをタップして
              実際にサークル情報を見てみましょう。
            </p>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/">UU-Circleのトップ画面へ</GreenLgButton>
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

            <SubHeader>2. いつ・どんな新歓があるか確認してみよう</SubHeader>

            <div className="px-4 pb-6">
              <p>
                今日の新歓というバナーからその日にある新歓や、これからどんな新歓が行われるかがオンラインでわかります。
                毎日チェックして気になった新歓に遊びに行こう！
              </p>
            </div>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/circle/newjoy">
                今日の新歓ページへ
              </GreenLgButton>
            </div>

            <SubHeader>3. uu-yellをみよう</SubHeader>

            <div className="px-4 pb-6">
              <p className="pb-6 px-4">
                {' '}
                キャッチコピーは「uu-mailのとなりにuu-yell。」
              </p>
              <p className="pb-6 px-4">
                UU-Circlesの姉妹サイトの「メディアサイトuu-yell」は宇都宮大学の学生活動の発信＆受信における”プラットフォーム”です。
              </p>
              <p className="pb-6 px-4">
                以下の2本軸でプラットフォームを体現していきます。
              </p>
              <div className="pb-6 px-4">
                <blockquote cite="https://media.uu-circles.com/about/">
                  <ol className="list-inside list-decimal border border-gray-400 round p-4">
                    <li>
                      uu-yell編集部からの直接的な情報発信（学生活動の取材記事や読者要望に応えた記事、編集部企画の記事など）
                    </li>
                    <li>
                      学生活動の発信媒体としてのサイト活用の促進（栃木イチオシ発信局Ufori’aやキャンパる編集室などの団体、個人コラムの連載など）
                    </li>
                  </ol>
                </blockquote>
              </div>
              <p className="pb-6 px-4">
                是非チェックしてホーム画面に追加してね！
              </p>
            </div>

            <div className="pb-6">
              <GreenLgButton href="https://media.uu-circles.com">
                メディアサイトuu-yellへ
              </GreenLgButton>
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
    </div>
  )
}

export default Page
