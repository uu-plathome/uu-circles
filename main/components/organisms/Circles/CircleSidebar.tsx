import { __ } from '@/lang/ja'
import { CircleType } from '@/lib/enum/api/CircleType'
import { TagSlugProperty } from '@/lib/enum/api/TagSlugProperty'
import { Category } from '@/lib/enum/app/Category'
import { TagPageView } from '@/lib/types/model/TagPageView'
import { TagPageViewRanking } from '@/lib/types/model/TagPageViewRanking'
import Link from 'next/link'
import { FC, useMemo } from 'react'

type BaseItem = {
  text: string
  href: string
  as?: string
}
type TagItem = BaseItem
type CategoryItem = BaseItem
type TagItemFcProps = {
  tagItem: TagItem
}
const TagItemFc: FC<TagItemFcProps> = ({ tagItem }) => {
  return (
    <li className="mb-3">
      <Link href={tagItem.href} as={tagItem.as}>
        <a className="text-gray-400 font-bold text-sm tag-title">
          {tagItem.text}
        </a>
      </Link>
    </li>
  )
}
const categoryItems: CategoryItem[] = [
  {
    text: __('CLUB'),
    href: '/circle/category/[category]',
    as: `/circle/category/${Category.club}`,
  },
  {
    text: __(CircleType.OFFICIAL_ORGANIZATION),
    href: '/circle/category/[category]',
    as: `/circle/category/${Category.officialOrganization}`,
  },
  {
    text: __(CircleType.STUDENT_GROUP),
    href: '/circle/category/[category]',
    as: `/circle/category/${Category.studentGroup}`,
  },
  {
    text: __(CircleType.UNOFFICIAL_ORGANIZATION),
    href: '/circle/category/[category]',
    as: `/circle/category/${Category.unofficialOrganization}`,
  },
]
type CategoryItemFcProps = {
  categoryItem: CategoryItem
}
const CategoryItemFc: FC<CategoryItemFcProps> = ({ categoryItem }) => {
  return (
    <li className="mb-3">
      <Link href={categoryItem.href} as={categoryItem.as}>
        <a className="text-gray-400 font-bold text-sm">{categoryItem.text}</a>
      </Link>
    </li>
  )
}

type Props = {
  tagPageViewRanking: TagPageViewRanking
  excludeTags?: TagSlugProperty[]
}
const CircleSidebar: FC<Props> = ({ tagPageViewRanking, excludeTags }) => {
  const tagList = useMemo(() => {
    const _tagList: TagPageView[] = []
    tagPageViewRanking.first && _tagList.push(tagPageViewRanking.first)
    tagPageViewRanking.second && _tagList.push(tagPageViewRanking.second)
    tagPageViewRanking.third && _tagList.push(tagPageViewRanking.third)
    tagPageViewRanking.fourth && _tagList.push(tagPageViewRanking.fourth)
    tagPageViewRanking.fifth && _tagList.push(tagPageViewRanking.fifth)
    tagPageViewRanking.sixth && _tagList.push(tagPageViewRanking.sixth)
    tagPageViewRanking.seventh && _tagList.push(tagPageViewRanking.seventh)
    tagPageViewRanking.eighth && _tagList.push(tagPageViewRanking.eighth)
    tagPageViewRanking.ninth && _tagList.push(tagPageViewRanking.ninth)
    tagPageViewRanking.tenth && _tagList.push(tagPageViewRanking.tenth)

    return _tagList.filter((tag) => {
      if (!excludeTags || !Array.isArray(excludeTags)) {
        return true
      }

      return !excludeTags.includes(tag.tagName)
    })
      .map((tagPageView): TagItem => ({
        text: __(String(tagPageView.tagName).toUpperCase()),
        href: '/circle/tag/[tag]',
        as: `/circle/tag/${tagPageView.tagName}`,
      }))
  }, [tagPageViewRanking, excludeTags])

  return (
    <div>
      <h2 className="text-gray-600 text-lg py-8">カテゴリー</h2>
      <ul>
        {categoryItems.map((_categoryItem, idx) => (
          <CategoryItemFc
            key={_categoryItem.text + idx}
            categoryItem={_categoryItem}
          />
        ))}
      </ul>

      <h2 className="text-gray-600 text-lg py-8">人気のタグ</h2>
      <ul>
        {tagList.map((_tagItem, idx) => (
          <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
        ))}
      </ul>
    </div>
  )
}

export { CircleSidebar }
