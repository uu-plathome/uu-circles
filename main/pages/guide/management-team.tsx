import { NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { BaseHead } from '@/components/layouts/BaseHead'

type Props = {}
const Page: NextPage<Props> = () => {
  return (
    <div>
      <BaseHead title={`制作・運営団体`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl pt-12 pb-8 px-4">制作・運営団体</h1>
            <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
              <h1 className="text-2xl pt-1">目次</h1>
              <p className="pt-2">0.制作・運営団体U-labとは？</p>
              <p className="pt-2">1.このサイトを作った動機</p>
              <p className="pt-2">2.今後の展望</p>
              <p className="pt-2">3.クレジット</p>
            </div>
            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">
                0.制作・運営団体U-labとは？
              </h2>
            </div>
            <p className="px-4 pb-6">
              こんにちは、私たちは「地域に根差すテクノロジー集団」U-labです。
            </p>
            <p className="px-4">
              デザインとエンジニアリングと地域おこしを掛け合わせたような団体で、
              主な活動はデザインセンスやプログラミング技術の向上や街を舞台にした
              作品展示、今までにないようなwebサービスの考案から開発などを行っています。
            </p>

            <div className="pt-4">
              <p className="px-4 mb-4">
                <Link href="/circle/u-lab">
                  <a className="underline">U-labのサークル情報を見る→</a>
                </Link>
              </p>

              <p className="px-4">
                <Link href="/circle/u-lab/newjoy">
                  <a className="underline">U-labの新歓を見る→</a>
                </Link>
              </p>
            </div>

            <div className="flex justify-center items-center pt-6 pb-6">
              <a href="http://ulab-uu.com/" target="_blank">
                <Image src="/images/ulab-bg.png" width="680" height="404" />
              </a>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">
                1.このサイトを作った動機
              </h2>
            </div>

            <p className="pb-6 px-4">
              このサイトは今年が初めてというわけではなく、去年始めたwebサービスです。このwebサービスの構想を考えたのは
              去年の合格発表日前日で、「思いたったがすぐ行動と」1日で急いでプロトタイプを制作して公開しました。
              そこから大きな反響があり、U-labのメンバーの全面協力により、その１週間後に正式にwebサービスをリリースしました。
              ですが、制作時間が１週間しかないためデザイン的にもUI・UX的にも満足いくものは作れず来年こそはと
              今年の1月くらいから密かに準備を進めてきました。
            </p>

            <div className="flex justify-center items-center pt-6 pb-6">
              <a href="https://uu-circle20.firebaseapp.com/" target="_blank">
                <Image
                  src="/images/uucircle2020-main.png"
                  width="900"
                  height="675"
                />
              </a>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">2.今後の展望</h2>
            </div>

            <div className="px-4 pb-4">
              <p>
                このwebサービスのこれからとしては、何年間か使われ続けるサービスを目指したいと考えています。
                UU-Circlesという今回のwebサービスはサークルのSNSを繋げるハブになると同時に、サークルを
                まとめる団体がサークルを管理しやすくなるという可能性があります。
                将来的には「今日の新歓はどこに行こうか？」「UU-Circlesで見てみようか」という風に学生生活
                に溶け込めたら団体冥利に尽きると思っています。
              </p>
            </div>

            <div className="flex justify-center items-center pt-6 pb-6">
              <a href="http://ulab-uu.com/" target="_blank">
                <Image
                  src="/images/future-uucircle.png"
                  width="1020"
                  height="544"
                />
              </a>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">3.クレジット</h2>
            </div>

            <div className="px-4 pb-12">
              <p>
                今回のサークルビラ一覧サイト「UU-Circles」は昨年以上に多くのメンバーに助けられて行うことができました。
                特に去年入ってきて新型コロナで行動が制限される中、U-labを見つけてに入ってきてくれた一年生も
                今年は一緒に制作を行う側に立って活動できたことが個人的には一番嬉しいです。ありがとう！
              </p>
            </div>

            <div className="px-4 pb-6">
              <p className="font-bold pb-2">プロジェクト責任者</p>
              <p>U-lab代表 3年 飯泉一馬</p>
            </div>

            <div className="px-4 pb-6">
              <p className="font-bold pb-2">プログラム管理責任者</p>
              <p>U-lab 3年 樋口航也</p>
            </div>

            <div className="px-4 pb-12">
              <p className="font-bold pb-2">開発サポートメンバー</p>
              <p>U-lab 1年 小畑</p>
              <p>U-lab 1年 浅野</p>
              <p>U-lab 1年 佐藤</p>
            </div>

            <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
              <h2 className="text-2xl px-4 font-bold">4.開発の様子</h2>
            </div>

            <div className="px-4 pb-4">
              <p>UU-Circlesでは、開発の様子を公開しています。</p>
            </div>

            <div className="pb-36">
              <p className="px-4">
                <a
                  href="https://github.com/H37kouya/uu-circle"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                  <span className="underline ml-4">GitHubを見る</span>
                </a>
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
