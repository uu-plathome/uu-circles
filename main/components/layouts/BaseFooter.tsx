import { FC } from "react";

type Props = {}
const BaseFooter: FC<Props> = () => {
    return (
        <div className="bg-gray-100 px-6">
            <div className="pt-6">
                <h2 className="text-lg mb-6">メニュー</h2>
                
                <ul>
                    <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">サークルを見つける</a></li>
                    <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">運営団体について</a></li>
                    <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">お問い合わせ</a></li>
                    <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">ヘルプ</a></li>
                </ul>
            </div>

            <div className="pt-8 text-center">
                <hr className="border border-gray-200"/>
                <div className="pt-8 pb-16">
                    <a href="" className="text-gray-400 px-2 text-xs">運営団体</a>
                    <a href="" className="text-gray-400 px-2 text-xs">利用規約</a>
                    <a href="" className="text-gray-400 px-2 text-xs">プライバシーポリシー</a>
                </div>
            </div>
        </div>
    )
}

export { BaseFooter }