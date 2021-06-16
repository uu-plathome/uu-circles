import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { NextPage } from 'next'
import Image from 'next/image'

const Page: NextPage = () => {
  return (
    <div>
      <BaseHead title="Discordで行われるオンライン新歓に参加してみよう！" />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <a href="https://discord.com/download">
                <Image src="/images/banner.png" width="328" height="76" />
              </a>
            </div>
            <h1 className="text-2xl pt-6 pb-8 px-4">
              Discordで行われるオンライン新歓に参加してみよう！
            </h1>
            <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
              <h1 className="text-2xl pt-1">目次</h1>
              <p className="pt-2">0.Discordとは</p>
              <p className="pt-2">1.Discordをインストールしよう</p>
              <p className="pt-2">2.Discordのアカウントを作ろう</p>
              <p className="pt-2">3.Googleフォームから情報を入力</p>
              <p className="pt-2">4.招待URLから新歓会場へ！</p>
              <p className="pt-2">5.表示名を変更する</p>
              <p className="pt-2">6.新歓に参加しよう！</p>
            </div>
            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">0.Discordとは</h2>
            </div>
            <p className="px-4 pb-6">
              個人間の友達登録が必要なくて、大人数での通話やテキストのやり取りが複数同時にできるアプリだよ！いくつかのLINEのグループが、一つにまとまっている感じだね
            </p>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">
                1.アプリをインストール
              </h2>
            </div>

            <p className="pb-4 px-4">
              以下のURLをタップして、Discordをインストールしよう。
            </p>
            <div className="flex justify-center items-center pb-6">
              <a href="https://discord.com/download">
                <Image src="/images/discord2.png" width="250" height="70" />
              </a>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">2.アカウントを作成</h2>
            </div>

            <div className="px-4">
              <p>Discordアプリを開いたら「登録」からアカウントを作ろう。</p>
            </div>

            <div className="border-b-4 border-red-400 mx-4 mb-28 mt-20 text-center">
              <p>↓Discordを使ったことがある人はここから！↓</p>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">
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

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">
                4.招待URLから新歓会場へ！
              </h2>
            </div>

            <div className="px-4 pb-6">
              <p>
                その３で入力したアドレスに、オンライン新歓が行われるサーバーへの招待URLが届くよ！
              </p>
              <p> タップして参加しよう！（送信には時間がかかる場合がある？)</p>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">5.表示名を変更する</h2>
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

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">6.新歓に参加しよう！</h2>
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
