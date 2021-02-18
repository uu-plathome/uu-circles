import { NextPage } from "next";
import { BaseFooter } from "@/components/layouts/BaseFooter";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { BaseContainer } from "@/components/molecules/Container/BaseContainer";
import Image from "next/image";

type Props = {}
const Page: NextPage<Props> = () => {
    return (
        <div>
            <BaseLayout>
                <div className="bg-gray-100 px-2">
                    <BaseContainer>
                        <h1 className="text-2xl pt-8">Discordで行われるオンライン新歓に</h1>
                        <h1 className="text-2xl pt-3">参加してみよう！</h1>
                        <h1 className="text-2xl pt-3">まずはDiscordのインストールから</h1>
                        <h1 className="text-2xl pt-10">目次</h1>
                        <p>Discordを使ったことがない人向け</p>
                        <p>0.Discordとは</p>
                        <p>1.Discordをインストールしよう</p>
                        <p>2.Discordのアカウントを作ろう</p>
                        <p>全員向け</p>
                        <p>3.Googleフォームから情報を入力</p>
                        <p>4.招待URLから新歓会場へ！</p>
                        <p>5.表示名を変更する</p>
                        <p>6.新歓に参加しよう！</p>
                        <h1 className="text-2xl pt-10">0.Discordとは</h1>
                        <p className="pt-4">個人間の友達登録が必要なくて、大人数での通話やテキストのやり取りが複数同時にできるアプリだよ！いくつかのLINEのグループが、一つにまとまっている感じだね</p>
                        <h1 className="text-2xl pt-10">1.Discordをインストールしよう</h1>
                        <p className="pt-4">以下のURLをタップして、Discordをインストールしよう。</p>
                        <p className="pt-4">https://discord.com/download</p>
                        <h1 className="text-2xl pt-10">2.Discordのアカウントを作ろう</h1>
                        <p className="pt-4">Discordアプリを開いたら「登録」からアカウントを作ろう。</p>
                        <p className="pt-4">↓Discordを使ったことがある人はここから！↓</p>
                        <h1 className="text-2xl pt-10">3.Googleフォームから情報を入力</h1>
                        <p className="pt-4">以下のURLから、メールアドレスと、Discordのアカウント名を入力しよう。</p>
                        <h1 className="text-2xl pt-10">4.招待URLから新歓会場へ！</h1>
                        <p className="pt-4">その３で入力したアドレスに、オンライン新歓が行われるサーバーへの招待URLが届くよ！</p>
                        <p className="pt-4"> タップして参加しよう！（送信には時間がかかる場合がある？)</p>
                        <h1 className="text-2xl pt-10">5.表示名を変更する</h1>
                        <p className="pt-4">　自分の表示名は、サーバー・チャンネル一覧のページから新歓のサーバーを選んで、右上の「…」の中にある「ニックネームの変更」から変更できるよ。わかりやすいように表示名を「名前　学部　学科　学年」に変更しよう。（例）たろう　工学部　基盤工学科　１年じろう　地デザ　建築　１年</p>
                        <h1 className="text-2xl pt-10">6.新歓に参加しよう！</h1>
                        <p className="pt-4">Discordにはたくさんのテキストチャンネル（＃がついているやつ）があるよ。タップで選んで、見たり話したりしてみよう！</p>
                        <p className="pt-4">ボイスチャンネル（スピーカーマークがついているやつ）はタップしただけで、通話に参加しちゃうから要注意！</p>
                        <Image src="/images/discord.png" width="60" height="60" />

                        
                    </BaseContainer>
                </div>

                {/*  フッター */}
                <BaseFooter />
            </BaseLayout>
        </div>
    )
}

export default Page