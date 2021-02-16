import { __ } from "@/lang/ja";
import { CircleTagModel } from "@/lib/enum/api/CircleTagModel";
import { FC } from "react";

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
const CircleSidebar: FC = () => {
    return (
        <div>
            <h2 className="text-gray-600 text-lg py-8">カテゴリー</h2>
            <ul>
                {tagAlwaysItems.map((_tagItem, idx) => <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} /> ) }
            </ul>

            <h2 className="text-gray-600 text-lg py-8">人気のタグ</h2>
            <ul>
                {tagAlwaysItems.map((_tagItem, idx) => <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} /> ) }
            </ul>
        </div>
    )
}

export { CircleSidebar }