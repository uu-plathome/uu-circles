import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { FunctionComponent } from 'react'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'

const BaseFooter = dynamic(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const Section: FunctionComponent = ({ children }) => (
  <section className="my-8">{children}</section>
)
const SubHeader: FunctionComponent = ({ children }) => (
  <h2 className="mb-4 text-lg">{children}</h2>
)
const Paragraph: FunctionComponent = ({ children }) => (
  <p className="mb-4 text-sm">{children}</p>
)
type ListProps = {
  list: (string | Element)[]
}
const List: FunctionComponent<ListProps> = ({ list, children }) => {
  return (
    <ul className="ml-8 text-sm list-decimal">
      {list.map((text, idx) => (
        <li key={idx} className="mb-4">
          {text}
        </li>
      ))}
      {children ? <li className="mb-4">{children}</li> : ''}
    </ul>
  )
}

const Page: NextPage = () => {
  return (
    <div>
      <BaseHead title="利用規約" />

      <BaseLayout>
        <div className="px-6 pb-20 bg-gray-100">
          <BaseContainer>
            <h1 className="py-8 text-2xl text-center">利用規約</h1>

            <Paragraph>
              この利用規約（以下，「本規約」といいます。）は，U-lab（以下，「当団体」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
            </Paragraph>

            <Section>
              <SubHeader>第1条（適用）</SubHeader>

              <List
                list={[
                  '本規約は，ユーザーと当団体との間の本サービスの利用に関わる一切の関係に適用されるものとします。',
                  '当団体は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）を適用することがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。',
                  '本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。',
                ]}
              />
            </Section>

            <Section>
              <SubHeader>第2条（利用登録）</SubHeader>

              <Paragraph>
                本サービスにおいては，登録希望者が本規約に同意の上，当団体の定める方法によって利用登録を申請し，当団体がこれを承認することによって，利用登録が完了するものとします。
              </Paragraph>

              <Paragraph>
                当団体は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
              </Paragraph>

              <List
                list={[
                  '利用登録の申請に際して虚偽の事項を届け出た場合',
                  '本規約に違反したことがある者からの申請である場合',
                  'その他，当団体が利用登録を相当でないと判断した場合',
                ]}
              />
            </Section>

            <Section>
              <SubHeader>第3条（ユーザーIDおよびパスワードの管理）</SubHeader>

              <Paragraph>
                ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              </Paragraph>

              <Paragraph>
                ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当団体は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
              </Paragraph>

              <Paragraph>
                ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当団体に故意又は重大な過失がある場合を除き，当団体は一切の責任を負わないものとします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第4条（利用料金および支払方法）</SubHeader>

              <Paragraph>
                本サービスは利用料金を求めることはありません。
              </Paragraph>

              <Paragraph>
                利用料金および支払い方法の変更を行った場合には，変更後の内容および目的について，当団体所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第5条（禁止事項）</SubHeader>

              <Paragraph>
                ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
              </Paragraph>

              <List
                list={[
                  '法令または公序良俗に違反する行為',
                  '犯罪行為に関連する行為',
                  '本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為',
                  '当団体，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為',
                  '当団体に許可されていないスクレイピング行為',
                  '本サービスによって得られた情報を商業的に利用する行為',
                  '当団体のサービスの運営を妨害するおそれのある行為',
                  '不正アクセスをし，またはこれを試みる行為',
                  '他のユーザーに関する個人情報等を収集または蓄積する行為',
                  '不正な目的を持って本サービスを利用する行為',
                  '本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為',
                  '他のユーザーに成りすます行為',
                  '当団体が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為',
                  '面識のない異性との出会いを目的とした行為',
                  '当団体のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為',
                  'その他，当団体が不適切と判断する行為',
                ]}
              />
            </Section>

            <Section>
              <SubHeader>第6条（本サービスの提供の停止等）</SubHeader>

              <Paragraph>
                当団体は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </Paragraph>

              <List
                list={[
                  '本サービスにかかるコンピュータシステムの保守点検または更新を行う場合',
                  '地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合',
                  'コンピュータまたは通信回線等が事故により停止した場合',
                  'その他，当団体が本サービスの提供が困難と判断した場合',
                ]}
              />

              <Paragraph>
                当団体は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第7条（利用制限および登録抹消）</SubHeader>

              <Paragraph>
                当団体は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
              </Paragraph>

              <List
                list={[
                  '本規約のいずれかの条項に違反した場合',
                  '登録事項に虚偽の事実があることが判明した場合',
                  '料金等の支払債務の不履行があった場合',
                  '当団体からの連絡に対し，一定期間返答がない場合',
                  '本サービスについて，最終の利用から一定期間利用がない場合',
                  'その他，当団体が本サービスの利用を適当でないと判断した場合',
                ]}
              />

              <Paragraph>
                当団体は，本条に基づき当団体が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第8条（退会）</SubHeader>

              <Paragraph>
                ユーザーは，当団体の定める退会手続により，本サービスから退会できるものとします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第9条（保証の否認および免責事項）</SubHeader>

              <Paragraph>
                当団体は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </Paragraph>

              <Paragraph>
                当団体は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし，本サービスに関する当団体とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
              </Paragraph>

              <Paragraph>
                前項ただし書に定める場合であっても，当団体は，当団体の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当団体またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当団体の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
              </Paragraph>

              <Paragraph>
                当団体は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第10条（サービス内容の変更等）</SubHeader>

              <Paragraph>
                当団体は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第11条（利用規約の変更）</SubHeader>

              <Paragraph>
                当団体は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第12条（個人情報の取扱い）</SubHeader>

              <Paragraph>
                当団体は，本サービスの利用によって取得する個人情報については，当団体「プライバシーポリシー」に従い適切に取り扱うものとします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第13条（通知または連絡）</SubHeader>

              <Paragraph>
                ユーザーと当団体との間の通知または連絡は，当団体の定める方法によって行うものとします。当団体は,ユーザーから,当団体が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第14条（権利義務の譲渡の禁止）</SubHeader>

              <Paragraph>
                ユーザーは，当団体の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
              </Paragraph>
            </Section>

            <Section>
              <SubHeader>第15条（準拠法・裁判管轄）</SubHeader>

              <Paragraph>
                本規約の解釈にあたっては，日本法を準拠法とします。
              </Paragraph>

              <Paragraph>
                本サービスに関して紛争が生じた場合には，当団体の本店所在地を管轄する裁判所を専属的合意管轄とします。
              </Paragraph>

              <div className="text-right">
                <Paragraph>最終改訂日 2021年12月13日</Paragraph>
                <Paragraph>以上</Paragraph>
              </div>
            </Section>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
