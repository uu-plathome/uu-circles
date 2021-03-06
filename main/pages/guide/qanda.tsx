import { NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import Image from 'next/image'
import { GreenLgButton } from '@/components/atoms/button/GreenLgButton'
import { FC } from 'react'

const SubHeaderGreen: FC = ({ children }) => {
  return (
    <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
      <h2 className="text-xl px-4 font-bold">{children}</h2>
    </div>
  )
}

const SubHeaderPink: FC = ({ children }) => {
  return (
    <div className="border-l-4 border-red-500 mt-8 mb-6 mx-5">
      <h2 className="px-4">{children}</h2>
    </div>
  )
}

type Props = {}
const Page: NextPage<Props> = () => {
  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <div className="bg-green-500 py-6">
              <p className="text-center text-5xl text-white">Q and A</p>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. タグの一覧など、諸情報はどこにありますか？
              </SubHeaderGreen>
              <SubHeaderPink>
                A.
                ページ下部からアクセスできます。タグの一覧は”全てのタグ”から確認することが可能です。
              </SubHeaderPink>
            </div>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/">タグ一覧へ</GreenLgButton>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>Q. 新歓はどこで行われるのですか？</SubHeaderGreen>
              <SubHeaderPink>
                A.
                新歓はdiscordやzoomというアプリ上で、オンラインで行われます。詳細はこちらから。
              </SubHeaderPink>
            </div>

            <a href="https://discord.com/download">
              <Image src="/images/banner.png" width="328" height="76" />
            </a>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. 学校生活について質問があります（入学準備など）
              </SubHeaderGreen>
              <SubHeaderPink>
                A.
                以下のメディアサイトに情報がまとめてありますので一度ご確認ください。情報が無い場合はDiscordなどで聞いてみてください。また、緊急でない場合はオンライン新歓での話の種なんかにもしてみてください。
              </SubHeaderPink>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. サークルの活動内容などについて質問があります。
              </SubHeaderGreen>
              <SubHeaderPink>
                A.
                各サークルのページに記載されている連絡先にお問い合わせください。話を聞いただけでロックオンしてくるような、冬眠前の熊みたいな団体は（多分）いないので気軽にどうぞ。
              </SubHeaderPink>
            </div>

            <a href="https://discord.com/download">
              <Image src="/images/uuyell-banner.jpg" width="328" height="76" />
            </a>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. このサイトに関して質問があります。
              </SubHeaderGreen>
              <SubHeaderPink>
                A. ページ下部の”お問い合わせ”、またはこちらからどうぞ。
              </SubHeaderPink>
            </div>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/">お問い合わせへ</GreenLgButton>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. おすすめのサークルはどこですか？
              </SubHeaderGreen>
              <SubHeaderPink>
                A.
                U-labというサークルが良いと聞いたことがあります。なんでも、初心者にも優しくスキルを教えてくれる先輩と、上級者でも飽きないくらいの活動が目白押しだそうです。実力問わず、なんとなくおもしろいことをしてみたいなぁと思っている人を募集中らしいですよ。
                詳細はこちらからどうぞ。
              </SubHeaderPink>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q.
                2年生以上向け）自分達のサークルが見当たりません/このサイトへのサークルの登録方法を教えてください。
              </SubHeaderGreen>
              <SubHeaderPink>
                A. 新歓実行委員に直接お問い合わせください。
              </SubHeaderPink>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. （外部向け）このサイトに関する話が聞きたい/取材がしたいです。
              </SubHeaderGreen>
              <SubHeaderPink>
                A.
                運営団体に関することはページ下部の”運営団体”からご確認いただけます。
              </SubHeaderPink>

              <div className="pb-8 pt-4">
                <GreenLgButton href="/">運営団体へ</GreenLgButton>　
              </div>

              <SubHeaderPink>
                A.
                また、このサイトに関することはページ下部の”お問い合わせ”かこちらからご連絡ください。
              </SubHeaderPink>

              <div className="pb-8 pt-4">
                <GreenLgButton href="/">お問い合わせへ</GreenLgButton>
              </div>
            </div>

            <div className="pb-6">
              <SubHeaderGreen>
                Q. （外部向け）このサイトに広告を掲載したいのですが。
              </SubHeaderGreen>
              <SubHeaderPink>
                A. ページ下部の”お問い合わせ”、またはこちらからご連絡ください。
              </SubHeaderPink>
            </div>

            <div className="pb-8 pt-4">
              <GreenLgButton href="/">お問い合わせへ</GreenLgButton>
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
