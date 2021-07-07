import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { ImagePath } from '@/lib/enum/app/ImagePath'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Link as ScrollLink } from "react-scroll"

const Header: FC<{
  id: string
}> = ({ children, id }) => {
  return (
    <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
      <h2 id={id} className="text-lg md:text-2xl px-4 font-bold">
        {children}
      </h2>
    </div>
  )
}

type Props = Record<string, never>
const Page: NextPage<Props> = () => {
  return (
    <div>
      <BaseHead title={`UU-Circlesについて`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl pt-12 pb-8 px-4">UU-Circlesについて</h1>

            <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
              <p className="text-2xl pt-1">目次</p>

              <ul>
                <li className="pt-2">
                  <ScrollLink to="first" spy={true} smooth={true} duration={500}>
                    1. UU-Circles について
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink to="second" spy={true} smooth={true} duration={500}>
                    2. 制作・運営団体U-labとは？
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink to="third" spy={true} smooth={true} duration={500}>
                    3. このサイトを作った動機
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink to="fourth" spy={true} smooth={true} duration={500}>
                    4. 今後の展望
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink to="fifth" spy={true} smooth={true} duration={500}>
                    5. クレジット
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink to="sixth" spy={true} smooth={true} duration={500}>
                    6. 開発の様子
                  </ScrollLink>
                </li>
              </ul>
            </div>

            <Header id="first">
              1. UU-Circles について
            </Header>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles は「宇都宮大学の全てのサークルを知れる場所」を目標に運営を行っている Web サービスです。U-lab のプロジェクトとして発足し、2021年3月8日にリリースされました。
            </p>

            <p className="px-4 pb-8 leading-relaxed">
              各サークルオリジナルの『ビラ』一覧や毎日更新される『今日の新歓』、サークルが新歓の追加や情報を更新できる『サークル管理ページ』などの機能があります。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles は一般ユーザー向けのページだけでなく、いくつかの Web サービスから成り立っています。
            </p>

            <ul className="list-disc list-inside px-4 pb-8">
              <li className="pb-2">
                一般ユーザー向けのページ：
                <br className="none md:inline" />
                <span className="pt-2 ml-4 md:ml-0">「UU-Circles メインページ」</span>
              </li>
              <li className="pb-2">
                サークル管理者向けのページ：
                <br className="none md:inline" />
                <span className="pt-2 ml-4 md:ml-0">「UU-Circles サークル管理ページ」</span>
              </li>
              <li className="pb-2">
                UU-Circles運営向けのページ：
                <br className="none md:inline" />
                <span className="pt-2 ml-4 md:ml-0">「UU-Manager」</span>
              </li>
            </ul>

            <Header id="second">
              2. 制作・運営団体U-labとは？
            </Header>

            <p className="px-4 pb-8 leading-relaxed">
              こんにちは！地域に根差すテクノロジー集団 U-lab です。
            </p>
            <p className="px-4 pb-2 leading-relaxed">
              デザインとエンジニアリングと地域おこしを掛け合わせたような、とにかく面白いことが大好きな団体です。
            </p>
            <p className="px-4 pb-2 leading-relaxed">
              主に、デザインセンスやプログラミング技術の向上を図る勉強会、まちを舞台にした作品展示、今までにないようなWebサービスの考案と制作・運営などの活動を行なっています。
            </p>

            <div className="pt-6 pb-8">
              <p className="px-4 mb-4">
                <Link href="/circle/u-lab">
                  <a className="underline">U-labのサークル情報を見る→</a>
                </Link>
              </p>

              <p className="px-4 pb-2">
                <Link href="/circle/u-lab/newjoy">
                  <a className="underline">U-labの新歓を見る→</a>
                </Link>
              </p>
            </div>

            <p className="px-4 pb-4">
              U-labが制作・運営を行う主な作品
            </p>

            <ul className="list-disc list-inside px-4 pb-8">
              <li className="pb-2">
                <a className="text-blue-600 hover:underline" href="https://uu-circle20.firebaseapp.com/">サークルビラ一覧サイト2020</a>
              </li>
              <li className="pb-2">
                <a className="text-blue-600 hover:underline" href="https://media.uu-circles.com/">メディアサイト uu-yell</a>
              </li>
              <li className="pb-2">
                <a className="text-blue-600 hover:underline" href="https://nocodebase.jp/post_detail/1619639468529x409085387850907650">マチナカベンチ (第一回 Click Live 視聴型ハッカソン)</a>
              </li>
              <li className="pb-2">
                <a className="text-blue-600 hover:underline" href="https://cluster.mu/w/b677e156-e8cf-475f-9202-92e74d5bc4ec">バーチャル宇都宮大学峰キャンパス</a>
              </li>
              <li className="pb-2">
                <a className="text-blue-600 hover:underline" href="https://cluster.mu/w/73b85e37-10c9-4cb1-8ef7-2cd80cb93ddd">バーチャル宇都宮大学陽東キャンパス</a>
              </li>
            </ul>

            <div className="flex justify-center items-center pt-6 pb-8">
              <a href="http://ulab-uu.com/" target="_blank" rel="noreferrer">
                <Image
                  src={ImagePath.U_LAB.ICON_RECTANGLE_WHITE}
                  width="680"
                  height="404"
                  alt="U-lab（ウラボ）のサイトを見る"
                />
              </a>
            </div>

            <Header id="third">
              3. このサイトを作った動機
            </Header>

            <p className="pb-2 px-4 leading-relaxed">
              このサイトは今年が初めてというわけではなく、去年 (2020年) に始めました。サークルビラ一覧の構想を考えたのは去年の合格発表日前日で、「思いたったがすぐ行動」と1日で急いでプロトタイプを制作して公開しました。
            </p>

            <p className="pb-2 px-4 leading-relaxed">
              そこから大きな反響があり、U-labメンバーの全面協力により、その１週間後に正式にWebサービスとしてリリースしました。
            </p>

            <p className="pb-2 px-4 leading-relaxed">
              しかし、正式版の制作時間は１週間しかないため、システムやデザイン、UI・UX のどの観点も満足ができるものが作れませんでした。
            </p>

            <p className="pb-8 px-4 leading-relaxed">
              次の年はさらにより良いものにしたいと思い、今年 (2021年) の1月くらいから密かに準備を進めてきました。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              2021年3月に、新デザインと新システムを用意し、プロジェクト名を「UU-Circles」と改名し公開しました。
            </p>

            <div className="flex justify-center items-center pt-6 pb-8">
              <a href="https://uu-circle20.firebaseapp.com/">
                <Image
                  src={ImagePath.UU_CIRCLES_2020.MAIN}
                  width="900"
                  height="675"
                />
              </a>
            </div>

            <Header id="fourth">
              4. 今後の展望
            </Header>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles は何年間か使われ続けるWebサービスを目指したいと考えています。 新入生とサークル、サークルの SNS を繋げるハブになることを願っています。
            </p>
            <p className="px-4 pb-8 leading-relaxed">
              そして、UU-Circles に登録されているサークルをまとめて管理するWebサービス UU-Manager により、サークルをまとめる団体がサークルの管理を行いやすくなる可能性を秘めています。
            </p>

            <p className="px-4 pb-2">
              将来的には「今日の新歓はどこに行こうか？」「UU-Circlesで見てみようか」という風に学生生活に溶け込めたら団体冥利に尽きると思っています。
            </p>

            <div className="flex justify-center items-center pt-6 pb-8">
              <a href="http://ulab-uu.com/">
                <Image
                  src="/images/future-uucircle.png"
                  width="1020"
                  height="544"
                />
              </a>
            </div>

            <Header id="fifth">5. クレジット</Header>

            <div className="px-4 pb-12 leading-relaxed">
              <p>
                今回のサークルビラ一覧サイト「UU-Circles」は昨年以上に多くのメンバーに助けられて制作することができました。 特に去年入ってきて新型コロナで行動が制限される中、U-labを見つけて入ってきてくれた1年生(当時1年生で、現在は2年生)も今年は一緒に制作を行う側に立って活動できたことが一番嬉しいです。プロジェクトに参加してくれてありがとう！ （飯泉 一馬）
              </p>
            </div>

            <div className="px-4 pb-8">
              <p className="font-bold pb-2">プロジェクト責任者</p>
              <p className="pb-2">元 U-lab 代表 4年 飯泉 一馬</p>
              <p className="pb-2 text-sm">担当: プロダクトマネジメント、UI・UXデザイン</p>
            </div>

            <div className="px-4 pb-8">
              <p className="font-bold pb-2">プログラム管理責任者</p>
              <p className="pb-2">U-lab 4年 樋口 航也</p>
              <p className="pb-2 text-sm">担当: システムアーキテクティング、プログラム</p>
            </div>

            <div className="px-4 pb-12">
              <p className="font-bold pb-2">開発サポートメンバー</p>

              <p className="pb-2">U-lab?? 4年 野沢 万葉</p>
              <p className="pb-4 text-sm">担当：デザイン（ロゴ、アイキャッチ作成）</p>

              <p className="pb-2">U-lab 4年 菊地 ひなた</p>
              <p className="pb-4 text-sm">担当：プログラム (サブシステム)</p>

              <p className="pb-2">U-lab 代表 2年 佐藤 歩夢</p>
              <p className="pb-4 text-sm">担当: UIデザイン</p>

              <p className="pb-2">U-lab 2年 小畑 尚史</p>
              <p className="pb-4 text-sm">担当: プログラム (UU-Circles)</p>

              <p className="pb-2">U-lab 2年 浅野 亮太</p>
              <p className="pb-4 text-sm">
                担当: <a href="https://announce.uu-circles.com/">告知サイト制作</a>
              </p>
            </div>

            <Header id="sixth">6. 開発の様子</Header>

            <div className="px-4 pb-4">
              <p>UU-Circlesでは、開発の様子を公開しています。</p>
            </div>

            <div className="pb-36">
              <p className="px-4">
                <a
                  href="https://github.com/H37kouya/uu-circle"
                  target="_blank"
                  rel="noopener noreferrer"
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
