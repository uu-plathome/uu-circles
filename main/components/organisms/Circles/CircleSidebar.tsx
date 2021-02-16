import { __ } from "@/lang/ja";
import { CircleTagModel } from "@/lib/enum/api/CircleTagModel";
import { CircleType } from "@/lib/enum/api/CircleType";
import { Category } from "@/lib/enum/app/Category";
import Link from "next/link";
import { FC } from "react";

type BaseItem = {
    text: string
    href: string
    as?: string
}
type TagItem = BaseItem
type CategoryItem = BaseItem
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
const categoryItems: CategoryItem[] = [
    { text: __('CLUB'), href: "/circle/category/[category]", as: `/circle/category/${Category.club}` },
    { text: __(CircleType.OFFICIAL_ORGANIZATION), href: "/circle/category/[category]", as: `/circle/category/${Category.officialOrganization}` },
    { text: __(CircleType.STUDENT_GROUP), href: "/circle/category/[category]", as: `/circle/category/${Category.studentGroup}` },
    { text: __(CircleType.UNOFFICIAL_ORGANIZATION), href: "/circle/category/[category]", as: `/circle/category/${Category.unofficialOrganization}` },
]
type CategoryItemFcProps = {
    categoryItem: CategoryItem
}
const CategoryItemFc: FC<CategoryItemFcProps> = ({ categoryItem }) => {
    return (
        <li className="mb-3">
            <Link href={ categoryItem.href } as={ categoryItem.as }>
                <a className="text-gray-400 font-bold text-sm">
                    { categoryItem.text }
                </a>
            </Link>
        </li>
    )
}
const CircleSidebar: FC = () => {
    return (
        <div>
            <h2 className="text-gray-600 text-lg py-8">カテゴリー</h2>
            <ul>
                {categoryItems.map((_categoryItem, idx) => <CategoryItemFc key={_categoryItem.text + idx} categoryItem={_categoryItem} /> ) }
            </ul>

            <h2 className="text-gray-600 text-lg py-8">人気のタグ</h2>
            <ul>
                {tagAlwaysItems.map((_tagItem, idx) => <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} /> ) }
            </ul>
        </div>
    )
}

export { CircleSidebar }