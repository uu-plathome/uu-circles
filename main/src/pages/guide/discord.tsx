import { NextPage } from 'next'
import Image from 'next/image'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'

const Page: NextPage = () => {
  return (
    <div>
      <BaseHead title="Discordで行われるオンライン新歓に参加してみよう！" />

      <BaseLayout>
        <div className="px-2 bg-gray-100">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <a href="https://discord.com/download">
                <Image
                  src="/images/banner.png"
                  width="328"
                  height="76"
                  alt="ディスコードをダウンロードしよう！"
                />
              </a>
            </div>
            <h1 className="px-4 pt-6 pb-8 text-2xl">
              Discordで行われるオンライン新歓に参加してみよう！
            </h1>
            <div className="py-6 px-8 mx-4 bg-white rounded-md text-gray-500">
              <h1 className="pt-1 text-2xl">目次</h1>
              <p className="pt-2">0.Discordとは</p>
              <p className="pt-2">1.Discordをインストールしよう</p>
              <p className="pt-2">2.Discordのアカウントを作ろう</p>
              <p className="pt-2">3.Googleフォームから情報を入力</p>
              <p className="pt-2">4.招待URLから新歓会場へ！</p>
              <p className="pt-2">5.表示名を変更する</p>
              <p className="pt-2">6.新歓に参加しよう！</p>
            </div>
            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">0.Discordとは</h2>
            </div>
            <p className="px-4 pb-6">
              個人間の友達登録が必要なくて、大人数での通話やテキストのやり取りが複数同時にできるアプリだよ！いくつかのLINEのグループが、一つにまとまっている感じだね
            </p>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">
                1.アプリをインストール
              </h2>
            </div>

            <p className="px-4 pb-4">
              以下のURLをタップして、Discordをインストールしよう。
            </p>
            <div className="flex justify-center items-center pb-6">
              <a href="https://discord.com/download">
                <Image
                  src="/images/discord2.png"
                  width="250"
                  height="70"
                  alt="ディスコードをダウンロードしよう！"
                />
              </a>
            </div>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">2.アカウントを作成</h2>
            </div>

            <div className="px-4">
              <p>Discordアプリを開いたら「登録」からアカウントを作ろう。</p>
            </div>

            <div className="mx-4 mt-20 mb-28 text-center border-b-4 border-red-400">
              <p>↓Discordを使ったことがある人はここから！↓</p>
            </div>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">
                3.Googleフォームに入力
              </h2>
            </div>

            <div className="px-4 pb-6">
              <p className="mb-4">
                以下のURLから、メールアドレスと、Discordのアカウント名を入力しよう。
              </p>

              <p>
                <a
                  className="underline"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSciZMsDgqmcMXIxWszTfLF9jbMB8MrTw_HspSAzvF_XjIv9fA/viewform"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Formへ
                </a>
              </p>
            </div>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">
                4.招待URLから新歓会場へ！
              </h2>
            </div>

            <div className="px-4 pb-6">
              <p>
                その３で入力したアドレスに、オンライン新歓が行われるサーバーへの招待URLが届くよ！
              </p>
              <p> タップして参加しよう！（送信には時間がかかる場合がある？)</p>
            </div>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">5.表示名を変更する</h2>
            </div>

            <div className="px-4 pb-6">
              <p>
                自分の表示名は、サーバー・チャンネル一覧のページから新歓のサーバーを選んで、右上の「…」の中にある「ニックネームの変更」から変更できるよ。わかりやすいように表示名を「名前
                学部 学科 学年」に変更しよう。
              </p>
              <p>(例)たろう 工学部 基盤工学科 １年</p>
              <p>じろう 地デザ 建築 １年</p>
              <p> タップして参加しよう！（送信には時間がかかる場合がある？)</p>
            </div>

            <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
              <h2 className="px-4 text-2xl font-bold">6.新歓に参加しよう！</h2>
            </div>

            <div className="px-4 pb-24">
              <p>
                Discordにはたくさんのテキストチャンネル(＃がついているやつ)があるよ。タップで選んで、見たり話したりしてみよう！
              </p>
              <p>
                ボイスチャンネル（スピーカーマークがついているやつ）はタップしただけで、通話に参加しちゃうから要注意！
              </p>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
