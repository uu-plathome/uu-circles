import { NextPage } from 'next'
import { FunctionComponent } from 'react'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'

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
      <BaseHead title="プライバシーポリシー" />

      <BaseLayout>
        <div className="px-6 pb-20 bg-gray-100">
          <BaseContainer>
            <h1 className="py-8 text-2xl text-center">プライバシーポリシー</h1>

            <div>
              <Paragraph>
                U-lab（以下，「当団体」といいます。）は，本ウェブサイト「UU-Circles」上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
              </Paragraph>

              <Section>
                <SubHeader>第1条（個人情報）</SubHeader>
                <Paragraph>
                  「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                </Paragraph>
              </Section>

              <Section>
                <SubHeader>第2条（個人情報の収集方法）</SubHeader>
                <Paragraph>
                  当団体は，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレスなどの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報に関する情報を,当団体の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。
                </Paragraph>
              </Section>

              <Section>
                <SubHeader>第3条（個人情報を収集・利用する目的）</SubHeader>
                <Paragraph>
                  当団体が個人情報を収集・利用する目的は，以下のとおりです。
                </Paragraph>
                <List
                  list={[
                    '当団体サービスの提供・運営のため',
                    'ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）',
                    'ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当団体が提供する他のサービスの案内のメールを送付するため',
                    'メンテナンス，重要なお知らせなど必要に応じたご連絡のため',
                    '利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため',
                    'ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため',
                    '上記の利用目的に付随する目的',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第4条（利用目的の変更）</SubHeader>
                <List
                  list={[
                    '当団体は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。',
                    '利用目的の変更を行った場合には，変更後の目的について，当団体所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第5条（個人情報の第三者提供）</SubHeader>
                <Paragraph>
                  当団体は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
                </Paragraph>
                <List
                  list={[
                    '人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき',
                    '公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき',
                    '国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき',
                  ]}
                >
                  <div>
                    <Paragraph>
                      予め次の事項を告知あるいは公表し，かつ当団体が個人情報保護委員会に届出をしたとき
                    </Paragraph>
                    <List
                      list={[
                        '利用目的に第三者への提供を含むこと',
                        '第三者に提供されるデータの項目',
                        '第三者への提供の手段または方法',
                        '本人の求めに応じて個人情報の第三者への提供を停止すること',
                        '本人の求めを受け付ける方法',
                      ]}
                    />
                  </div>
                </List>
                <Paragraph>
                  前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                </Paragraph>
                <List
                  list={[
                    '当団体が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合',
                    '個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合',
                    '合併その他の事由による事業の承継に伴って個人情報が提供される場合',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第6条（個人情報の開示）</SubHeader>
                <Paragraph>
                  当団体は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，手数料を申し受ける場合があります。
                </Paragraph>
                <List
                  list={[
                    '本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合',
                    '当団体の業務の適正な実施に著しい支障を及ぼすおそれがある場合',
                    'その他法令に違反することとなる場合',
                  ]}
                />
                <Paragraph>
                  前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
                </Paragraph>
              </Section>

              <Section>
                <SubHeader>第7条（個人情報の訂正および削除）</SubHeader>
                <List
                  list={[
                    'ユーザーは，当団体の保有する自己の個人情報が誤った情報である場合には，当団体が定める手続きにより，当団体に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。',
                    '当団体は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。',
                    '当団体は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第8条（個人情報の利用停止等）</SubHeader>
                <List
                  list={[
                    '当団体は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。',
                    '前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。',
                    '当団体は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。',
                    '前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第9条（プライバシーポリシーの変更）</SubHeader>
                <List
                  list={[
                    '本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。',
                    '当団体が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。',
                  ]}
                />
              </Section>

              <Section>
                <SubHeader>第10条（お問い合わせ窓口）</SubHeader>
                <Paragraph>
                  本ポリシーに関するお問い合わせは，下記のお問い合わせまでお願いいたします。
                </Paragraph>
                <Paragraph>
                  リンク：
                  <a
                    className="text-blue-600 underline"
                    href="https://forms.gle/1oULcDjiPaknvfvc8"
                  >
                    https://forms.gle/1oULcDjiPaknvfvc8
                  </a>
                </Paragraph>
                <div className="text-right">
                  <Paragraph>以上</Paragraph>
                </div>
              </Section>
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
