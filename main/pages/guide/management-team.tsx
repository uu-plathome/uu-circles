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
                        <h1 className="text-2xl pt-6 pb-8 px-4">制作・運営団体</h1>
                        <div className="bg-white px-8 py-6 mx-4 rounded-md text-gray-500">
                            <h1 className="text-2xl pt-1">目次</h1>
                            <p className="pt-2">0.制作・運営団体U-labとは？</p>
                            <p className="pt-2">1.このサイトを作った動機</p>
                            <p className="pt-2">2.今後の展望</p>
                            <p className="pt-2">3.クレジット</p>
                        </div>
                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">0.制作・運営団体U-labとは？</h2>
                        </div>
                        <p className="px-4 pb-6">こんにちは、私たちは「地域に根差すテクノロジー集団」U-labです。</p>
                        <p className="px-4 pb-6">デザインとエンジニアリングと地域おこしを掛け合わせたような団体で、
                        主な活動はデザインセンスやプログラミング技術の向上や街を舞台にした作品展示、今までにないようなwebサービスの考案から開発などを行っています。</p>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">1.このサイトを作った動機</h2>
                        </div>

                        <p className="pb-6 px-4">
                            このサイトは今年が初めてというわけではなく、去年初めたwebサイトです。このwebサービスの構想を考えたのは
                            合格発表日の前日で、1日で急いでプロトタイプを制作して公開しました。そこから大きな反響があり、U-labの
                            メンバーがもっと良いサイトを作りたいということで、その１週間後に正式にwebサービスをリリースしました。
                            ですが、制作時間が１週間しかないため満足いくものは作れずもっとデザインがよくUI・UXが良いものを作りたいと思い、
                            今年は1月くらいから準備を進めてきました。
                        </p>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">2.今後の展望</h2>
                        </div>

                        <div className="px-4 pb-6">
                            <p>
                                このwebサービスのこれからとしては、何年間か使われ続けるサービスを目指したいと考えています。
                                UU-Circlesという今回のwebサービスはサークルのSNSを繋げるハブになると同時に、サークルを
                                まとめる団体がサークルを管理しやすくなるという可能性があります。
                                将来的には「今日の新歓はどこに行こうか？」「UU-Circlesで見てみようか」という風に学生生活
                                に溶け込めたら団体冥利に尽きると思っています。
                            </p>
                        </div>

                        <div className="border-l-4 border-green-500 mt-8 mb-6 mx-5">
                            <h2 className="text-2xl px-4 text-lg font-bold">3.クレジット</h2>
                        </div>

                        <div className="px-4 pb-6">
                            <p>
                                プロジェクト責任者
                                U-lab代表 飯泉一馬


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