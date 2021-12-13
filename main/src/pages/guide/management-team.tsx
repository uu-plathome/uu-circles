import { faGithub, faLaravel } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import YouTube from 'react-youtube'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const Header: FC<{
  id: string
}> = ({ children, id }) => {
  return (
    <div className="mx-5 mt-8 mb-6 border-l-4 border-green-500">
      <h2 id={id} className="px-4 text-lg md:text-2xl font-bold">
        {children}
      </h2>
    </div>
  )
}

const ID_LIST = {
  first: 'first',
  second: 'second',
  third: 'third',
  fourth: 'fourth',
  fifth: 'fifth',
  sixth: 'sixth',
  seventh: 'seventh',
} as const

type Props = Record<string, never>
const Page: NextPage<Props> = () => {
  return (
    <>
      <BaseHead title={`UU-Circlesについて`} />

      <BaseLayout>
        <div className="px-2 bg-gray-100">
          <BaseContainer>
            <h1 className="px-4 pt-12 pb-8 text-2xl">UU-Circlesについて</h1>

            <div className="py-6 px-8 mx-4 bg-white rounded-md text-gray-500">
              <p className="pt-1 text-2xl">目次</p>

              <ul>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.first}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    1. UU-Circles について
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.second}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    2. 制作・運営団体U-labとは？
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.third}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    3. このサイトを作った動機
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.fourth}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    4. 今後の展望
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.fifth}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    5. クレジット
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.sixth}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    6. 宣伝動画
                  </ScrollLink>
                </li>
                <li className="pt-2">
                  <ScrollLink
                    to={ID_LIST.seventh}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:underline cursor-pointer"
                  >
                    7. 開発の様子
                  </ScrollLink>
                </li>
              </ul>
            </div>

            <Header id={ID_LIST.first}>1. UU-Circles について</Header>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles
              は「宇都宮大学の全てのサークルを知れる場所」を目標に運営を行っている
              Web サービスです。U-lab
              のプロジェクトとして発足し、2021年3月8日にリリースされました。
            </p>

            <p className="px-4 pb-8 leading-relaxed">
              各サークルオリジナルの『ビラ』一覧や毎日更新される『今日の新歓』、サークルが新歓の追加や情報を更新できる『サークル管理ページ』などの機能があります。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles は一般ユーザー向けのページだけでなく、いくつかの Web
              サービスから成り立っています。
            </p>

            <ul className="px-4 pb-8 list-disc list-inside">
              <li className="pb-2">
                <span className="inline-block md:inline mb-2 md:mb-0">
                  一般ユーザー向けのページ：
                </span>
                <br className="md:hidden" />
                <span className="ml-6 md:ml-0">
                  「UU-Circles メインページ」
                </span>
              </li>
              <li className="pb-2">
                <span className="inline-block md:inline mb-2 md:mb-0">
                  サークル管理者向けのページ：
                </span>
                <br className="md:hidden" />
                <span className="ml-6 md:ml-0">
                  「UU-Circles サークル管理ページ」
                </span>
              </li>
              <li className="pb-2">
                <span className="inline-block md:inline mb-2 md:mb-0">
                  UU-Circles運営向けのページ：
                </span>
                <br className="md:hidden" />
                <span className="ml-6 md:ml-0">「UU-Manager」</span>
              </li>
            </ul>

            <div className="flex justify-center items-center pt-6 pb-8">
              <Image
                src={ImagePath.UU_CIRCLES.UU_CIRCLES_SERVICE}
                width="900"
                height="506"
                alt="UU-Circlesと関連サービス (UU-Circles メインページ, UU-Circles サークル管理ページ, UU-Manager)"
              />
            </div>

            <Header id={ID_LIST.second}>2. 制作・運営団体U-labとは？</Header>

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

            <p className="px-4 pb-4">U-labが制作・運営を行う主な作品</p>

            <ul className="px-4 pb-8 list-disc list-inside">
              <li className="pb-2">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://uu-circle20.firebaseapp.com/"
                >
                  サークルビラ一覧サイト2020
                </a>
              </li>
              <li className="pb-2">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://media.uu-circles.com/"
                >
                  メディアサイト uu-yell
                </a>
              </li>
              <li className="pb-2">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://nocodebase.jp/post_detail/1619639468529x409085387850907650"
                >
                  マチナカベンチ (第一回 Click Live 視聴型ハッカソン)
                </a>
              </li>
              <li className="pb-2">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://cluster.mu/w/b677e156-e8cf-475f-9202-92e74d5bc4ec"
                >
                  バーチャル宇都宮大学峰キャンパス
                </a>
              </li>
              <li className="pb-2">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://cluster.mu/w/73b85e37-10c9-4cb1-8ef7-2cd80cb93ddd"
                >
                  バーチャル宇都宮大学陽東キャンパス
                </a>
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

            <Header id={ID_LIST.third}>3. このサイトを作った動機</Header>

            <p className="px-4 pb-2 leading-relaxed">
              ときは、2020年3月。去年の大学入試の合格発表前日に、コロナ禍で例年のように新入生を迎えることができない状況を打開しようと、サークルビラ一覧の構想を考えました。「思いたったが吉日」とたった1日で急いでプロトタイプを制作して公開しました。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              そこから大きな反響があり、U-labメンバーの全面協力により、その1週間後に正式にWebサービスとしてリリースしました。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              しかし、正式版の制作時間は1週間しかなかったため、システムやデザイン、UI・UX
              のどの観点も満足いくものが作れませんでした。
            </p>

            <p className="px-4 pb-8 leading-relaxed">
              次の年はさらにより良いものにしたいと思い、今年 (2021年)
              の1月くらいから密かに準備を進めてきました。
            </p>

            <p className="px-4 pb-2 leading-relaxed">
              2021年3月に、新システムと新デザインを用意し、プロジェクト名を「UU-Circles」と改名し公開しました。
            </p>

            <div className="flex justify-center items-center pt-6 pb-8">
              <a href="https://uu-circle20.firebaseapp.com/">
                <Image
                  src={ImagePath.UU_CIRCLES_2020.MAIN}
                  width="900"
                  height="675"
                  alt="宇都宮大学サークルビラ一覧 (2020)"
                />
              </a>
            </div>

            <Header id={ID_LIST.fourth}>4. 今後の展望</Header>

            <p className="px-4 pb-2 leading-relaxed">
              UU-Circles は長く使われ続けるWebサービスを目指しています。
              新入生とサークルを繋げるハブになることを願っています。
            </p>
            <p className="px-4 pb-8 leading-relaxed">
              そして、UU-Circles
              に登録されているサークルをまとめて管理するWebサービス UU-Manager
              により、新歓実行委員会が各サークルの管理を行いやすくなる可能性を秘めています。
            </p>

            <p className="px-4 pb-2">
              将来的には「今日の新歓はどこに行こうか？」「UU-Circlesで見てみようか！」という風に学生生活に溶け込めたら団体冥利に尽きると思っています。
            </p>

            <div className="flex justify-center items-center pt-6 pb-8">
              <a href="http://ulab-uu.com/">
                <Image
                  src="/images/future-uucircle.png"
                  width="1020"
                  height="544"
                  alt="将来のUU-Circles"
                />
              </a>
            </div>

            <Header id={ID_LIST.fifth}>5. クレジット</Header>

            <div className="px-4 pb-12 leading-relaxed">
              <p>
                今回のサークルビラ一覧サイト「UU-Circles」は昨年以上に多くのメンバーに助けられて制作することができました。
                特に去年入ってきて新型コロナで行動が制限される中、U-labを見つけて入ってきてくれた1年生(当時1年生で、現在は2年生)も今年は一緒に制作を行う側に立って活動できたことが一番嬉しいです。プロジェクトに参加してくれてありがとう！
                （飯泉 一馬）
              </p>
            </div>

            <div className="px-4 pb-8">
              <p className="pb-2 font-bold">プロジェクト責任者</p>
              <p className="pb-2">元 U-lab 代表 4年 飯泉 一馬</p>
              <p className="pb-2 text-sm">
                担当: プロダクトマネジメント、UI・UXデザイン
              </p>
            </div>

            <div className="px-4 pb-8">
              <p className="pb-2 font-bold">プログラム管理責任者</p>
              <p className="pb-2">U-lab 4年 樋口 航也</p>
              <p className="pb-2 text-sm">
                担当: システムアーキテクティング、プログラム
              </p>
            </div>

            <div className="px-4 pb-12">
              <p className="pb-2 font-bold">開発サポートメンバー</p>

              <p className="pb-2">U-lab 4年 野沢 万葉</p>
              <p className="pb-4 text-sm">
                担当：デザイン（ロゴ、アイキャッチ作成）
              </p>

              <p className="pb-2">U-lab 4年 菊地 ひなた</p>
              <p className="pb-4 text-sm">担当：プログラム (サブシステム)</p>

              <p className="pb-2">U-lab 4年 藤倉 理子</p>
              <p className="pb-4 text-sm">担当：ゴーストライティング</p>

              <p className="pb-2">U-lab 代表 2年 佐藤 歩夢</p>
              <p className="pb-4 text-sm">担当: UIデザイン、ライティング</p>

              <p className="pb-2">U-lab 2年 小畑 尚史</p>
              <p className="pb-4 text-sm">担当: プログラム (UU-Circles)</p>

              <p className="pb-2">U-lab 2年 浅野 亮太</p>
              <p className="pb-4 text-sm">
                担当:{' '}
                <a
                  href="https://announce.uu-circles.com/"
                  className="hover:underline"
                >
                  告知サイト制作
                </a>
              </p>

              <p className="pb-2">U-lab 1年 高木 壱哲</p>
              <p className="pb-4 text-sm">
                担当:{' '}
                <a
                  href="https://www.youtube.com/watch?v=f_YOvzGCe3w"
                  className="hover:underline"
                >
                  宣伝動画監督・編集
                </a>
              </p>

              <p className="pb-2">U-lab 1年 高木 壱哲</p>
              <p className="pb-4 text-sm">
                担当:{' '}
                <a
                  href="https://www.youtube.com/watch?v=f_YOvzGCe3w"
                  className="hover:underline"
                >
                  宣伝動画監督・編集
                </a>
              </p>
            </div>

            <Header id={ID_LIST.sixth}>6. 宣伝動画</Header>

            <div className="flex justify-center mb-4">
              <div className="px-4 md:px-0 main-advertise-youtube">
                <div
                  className="overflow-hidden relative pb-0 mb-4 w-full h-0"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <YouTube
                    videoId={'f_YOvzGCe3w'}
                    containerClassName="main-advertise-youtube mb-2"
                    className="absolute top-0 left-0 h-full main-advertise-youtube"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              <p className="text-black">
                フルナレーション付きの動画です。音声を付けてぜひ、みてください。
              </p>
            </div>

            <Header id={ID_LIST.sixth}>7. 開発の様子</Header>

            <div className="px-4 pb-4">
              <p>UU-Circlesでは、開発の様子を公開しています。</p>
            </div>

            <div className="pb-36">
              <p className="px-4 mb-4">
                <a
                  href="https://github.com/H37kouya/uu-circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                  <span className="ml-4 underline">GitHubを見る</span>
                </a>
              </p>

              <p className="px-4 mb-4">
                <a
                  href="https://ulab-uu.com/2021/08/08/uu-circles-system-report/"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faLaravel} size="2x" />
                  <span className="ml-4 underline">
                    UU-Circles システム目線の話
                  </span>
                </a>
              </p>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </>
  )
}

export default Page
