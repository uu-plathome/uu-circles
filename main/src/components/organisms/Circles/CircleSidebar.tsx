import Link from 'next/link'
import { FC, useMemo } from 'react'
import { __ } from '@/src/lang/ja'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { TagPageView } from '@/src/lib/types/model/TagPageView'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'

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
        <a className="text-sm font-bold text-gray-400 before:content-['#']">
          {tagItem.text}
        </a>
      </Link>
    </li>
  )
}
const categoryItems: CategoryItem[] = [
  {
    text: __(CategorySlugProperty.club, CategorySlugProperty._type),
    href: '/circle/category/[category]',
    as: `/circle/category/${CategorySlugProperty.club}`,
  },
  {
    text: __(
      CategorySlugProperty.official_organization,
      CategorySlugProperty._type
    ),
    href: '/circle/category/[category]',
    as: `/circle/category/${CategorySlugProperty.official_organization}`,
  },
  {
    text: __(CategorySlugProperty.student_group, CategorySlugProperty._type),
    href: '/circle/category/[category]',
    as: `/circle/category/${CategorySlugProperty.student_group}`,
  },
  {
    text: __(
      CategorySlugProperty.unofficial_organization,
      CategorySlugProperty._type
    ),
    href: '/circle/category/[category]',
    as: `/circle/category/${CategorySlugProperty.unofficial_organization}`,
  },
]
type CategoryItemFcProps = {
  categoryItem: CategoryItem
}
const CategoryItemFc: FC<CategoryItemFcProps> = ({ categoryItem }) => {
  return (
    <li className="mb-3">
      <Link href={categoryItem.href} as={categoryItem.as}>
        <a className="text-sm font-bold text-gray-400">{categoryItem.text}</a>
      </Link>
    </li>
  )
}

type Props = {
  tagPageViewRanking?: TagPageViewRanking
  excludeTags?: TagSlugProperty[]
}
const CircleSidebar: FC<Props> = ({ tagPageViewRanking, excludeTags }) => {
  const tagList = useMemo(() => {
    const _tagList: TagPageView[] = []

    if (!tagPageViewRanking) return []

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

    return _tagList
      .filter((tag) => {
        if (!excludeTags || !Array.isArray(excludeTags)) {
          return true
        }

        return !excludeTags.includes(tag.tagName)
      })
      .map(
        (tagPageView): TagItem => ({
          text: __(String(tagPageView.tagName), TagSlugProperty._type),
          href: '/circle/tag/[tag]',
          as: `/circle/tag/${tagPageView.tagName}`,
        })
      )
  }, [tagPageViewRanking, excludeTags])

  return (
    <div>
      <h2 className="py-8 text-lg text-gray-600">カテゴリー</h2>
      <ul>
        {categoryItems.map((_categoryItem, idx) => (
          <CategoryItemFc
            key={_categoryItem.text + idx}
            categoryItem={_categoryItem}
          />
        ))}
      </ul>

      <h2 className="py-8 text-lg text-gray-600">人気のタグ</h2>
      <ul>
        {tagList.map((_tagItem, idx) => (
          <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
        ))}
      </ul>
    </div>
  )
}

export { CircleSidebar }
