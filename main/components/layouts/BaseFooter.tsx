import { useMediaQuery } from "@/hooks/useMediaQuery";
import { __ } from "@/lang/ja";
import { CircleTagModel } from "@/lib/enum/api/CircleTagModel";
import { CircleType } from "@/lib/enum/api/CircleType";
import { FC, Fragment, useEffect, useState } from "react";
import { BaseContainer } from "../molecules/Container/BaseContainer";

type TagItem = {
    text: string
    href: string
    as?: string
}
const tagAlwaysItems: TagItem[] = [
    { text: __(CircleTagModel.VOLUNTEER), href: '/' },
    { text: __(CircleTagModel.PROGRAMMING), href: '/' },
    { text: __(CircleTagModel.NATURE), href: '/' },
    { text: __(CircleTagModel.INTERNATIONAL), href: '/' },
    { text: __(CircleTagModel.INCARE), href: '/' },
    { text: __(CircleTagModel.LOOSE), href: '/' },
]
const tagOtherItems: TagItem[] = [
    { text: __(CircleTagModel.COMMUNITY), href: '/' },
    { text: __(CircleTagModel.URGENT_RECRUITMENT), href: '/' },
    { text: __(CircleTagModel.MYSTERY), href: '/' },
    { text: __(CircleTagModel.MAMMOTH), href: '/' },
    { text: __(CircleTagModel.ACTIVE_ACTIVITY), href: '/' },
    { text: __(CircleTagModel.MONDAY), href: '/' },
    { text: __(CircleTagModel.TUESDAY), href: '/' },
    { text: __(CircleTagModel.WEDNESDAY), href: '/' },
    { text: __(CircleTagModel.THURSDAY), href: '/' },
    { text: __(CircleTagModel.FRIDAY), href: '/' },
    { text: __(CircleTagModel.ONLY_MONDAY), href: '/' },
    { text: __(CircleTagModel.ONLY_TUESDAY), href: '/' },
    { text: __(CircleTagModel.ONLY_WEDNESDAY), href: '/' },
    { text: __(CircleTagModel.ONLY_THURSDAY), href: '/' },
    { text: __(CircleTagModel.ONLY_FRIDAY), href: '/' },
    { text: __(CircleTagModel.HOLIDAY), href: '/' },
]

type TagItemFcProps = {
    tagItem: TagItem
}
const TagItemFc: FC<TagItemFcProps> = ({ tagItem }) => {
    return (
        <li className="mb-3">
            <a href={ tagItem.href } className="text-gray-400 font-bold text-sm tag-title">
                { tagItem.text }
            </a>
        </li>
    )
}

type Props = {}
const BaseFooter: FC<Props> = () => {
    const [isTagOpen, setIsTagOpen] = useState(false)
    const { isMd } = useMediaQuery()

    useEffect(() => {
        if (isMd) {
            setIsTagOpen(true)
        }
    })

    return (
        <div className="bg-gray-100 px-6">
            <BaseContainer>
                <div className="flex">
                    <div className="pt-6 w-1/2 md:w-3/4">
                        <h2 className="text-lg mb-6">全てのタグ</h2>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-3">
                            {tagAlwaysItems.map((_tagItem, idx) => <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} /> ) }
                            {isTagOpen ? (
                                <Fragment>
                                    {tagOtherItems.map((_tagItem, idx) => <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} /> ) }
                                </Fragment>
                            ) : (
                                <p>
                                    <a onClick={() => setIsTagOpen(true)} className="underline text-gray-400 text-xs">全てのタグ</a>
                                </p>
                            )}
                        </ul>
                    </div>
                    
                    <div className="pt-6 w-1/2 md:w-1/4">
                        <h2 className="text-lg mb-6">カテゴリー</h2>
                        
                        <ul>
                            <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">部活</a></li>
                            <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">{ __(CircleType.OFFICIAL_ORGANIZATION) }</a></li>
                            <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">{ __(CircleType.STUDENT_GROUP) }</a></li>
                            <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">{ __(CircleType.UNOFFICIAL_ORGANIZATION) }</a></li>
                        </ul>
                    </div>
                </div>
            </BaseContainer>

            <BaseContainer>
                <div className="pt-6">
                    <h2 className="text-lg mb-6">メニュー</h2>
                    
                    <ul>
                        <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">サークルを見つける</a></li>
                        <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">運営団体について</a></li>
                        <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">お問い合わせ</a></li>
                        <li className="mb-3"><a href="" className="text-gray-400 font-bold text-sm">ヘルプ</a></li>
                    </ul>
                </div>
            </BaseContainer>

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