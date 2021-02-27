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
                        <div className="flex justify-center items-center pt-6">
                            <a href="https://discord.com/download"><Image src="/images/rookie.png" width="328" height="76" /></a>
                        </div>
                        <h1 className="text-2xl pt-6 pb-8 px-4">新入生へ</h1>
                        <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
                            <h1 className="text-2xl pt-1">目次</h1>
                            <p className="pt-2">0.新入生へ</p>
                            <p className="pt-2">1.気になったサークルを見てみよう</p>
                            <p className="pt-2">2.オンライン新歓会場に参加してみよう</p>
                            <p className="pt-2">3.いつ・どんな新歓があるか確認してみよう</p>
                            <p className="pt-2">4.宇都宮大学の情報を知ろう</p>
                            <p className="pt-2">5.先輩のお話を聞いてみよう</p>
                        </div>
                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">0.新入生へ</h2>
                        </div>
                        <p className="px-4 pb-6">新入生の方々合格おめでとうございます。</p>
                        <p className="px-4 pb-6">新型コロナという残念な状況ではありますが、
                        その中でも新入生が楽しく学生生活を送れるようにこのサイトを制作運営しています。
                        在校生一同皆様のご入学を心からお祝い申し上げます</p>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">1.気になったサークルを見てみよう</h2>
                        </div>

                        <p className="pb-6 px-4">ホームのサークル一覧から、「なんだか楽しそう！」と思ったビラをタップして
                        実際にサークル情報を見てみましょう。</p>

                        <button className="mb-8 hover:shadow-lg bg-green-500 hover:bg-green-700 shadow text-gray-50 font-bold py-4 px-4 rounded mx-4">
                            UU-Circleのトップ画面へ
                        </button>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">2.オンライン新歓会場に参加してみよう</h2>
                        </div>

                        <div className="px-4 pb-6">
                            <p>現在はオフラインでの新歓開催を予定していますが、
                            オンラインになった場合のためにdiscordと呼ばれるプラットフォームを用いて
                            、サークルが新歓の告知から説明会まで行ってくれます。まだ入っていない人は下のボタンをタップ！</p>
                        </div>

                        <button className="mb-8 hover:shadow-lg shadow bg-green-500 hover:bg-green-700 text-gray-50 font-bold py-4 px-4 rounded mx-4">
                            オンライン新歓会場への参加方法へ
                        </button>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">3.いつ・どんな新歓があるか確認してみよう</h2>
                        </div>

                        <div className="px-4 pb-6">
                            <p>今日の新歓というバナーからその日にある新歓や、これからどんな新歓が行われるかがオンラインでわかります。
                            毎日チェックして気になった新歓に遊びに行こう！
                            </p>
                        </div>

                        <button className="mb-8 hover:shadow-lg shadow bg-green-500 hover:bg-green-700 text-gray-50 font-bold py-4 px-4 rounded mx-4">
                            今日の新歓ページへ
                        </button>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">4.宇都宮大学の情報を知ろう</h2>
                        </div>

                        <div className="px-4 pb-6">
                            <p>宇都宮大学の情報や宇大の学生の情報はメディアサイトuu-yellで分かるよ！
                            </p>
                            <p> コンセプトは「uu-mailのとなりにuu-yell。」</p>
                            <p>是非チェックしてホーム画面に追加してね！</p>
                        </div>

                        <button className="mb-8 hover:shadow-lg shadow bg-green-500 hover:bg-green-700 text-gray-50 font-bold py-4 px-4 rounded mx-4">
                            メディアサイトuu-yellへ
                        </button>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">5.先輩のお話を聞いてみよう</h2>
                        </div>


                        <div className="px-4 pb-24">
                            <p>
                                メディアサイト「uu-yell」では、どうやってアパートを探せばいいのか？どうやって自転車をゲットすればいいのか？またおすすめのバイト先は？といった新入生にありがちなお悩みを解決する記事を掲載しています！
                                是非チェックして、スタートダッシュで楽しい大学生ライフを！
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