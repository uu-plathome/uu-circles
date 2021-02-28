import { FC } from "react";

type Props = {}
const BaseFooter: FC<Props> = () => {
    return (
        <div className="bg-gray-50 px-6">
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