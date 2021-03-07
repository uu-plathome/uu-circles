import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { __ } from '@/lang/ja'
import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { CircleType } from '@/lib/enum/api/CircleType'
import { TagSlugProperty } from '@/lib/enum/api/TagSlugProperty'
import { Category } from '@/lib/enum/app/Category'
import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useEffect, useState } from 'react'
import { BaseContainer } from '../molecules/Container/BaseContainer'

type TagItem = {
  text: string
  href: string
  as?: string
}
const tagAlwaysItems: TagItem[] = [
  {
    text: __(CircleTagModel.SPORT),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.sport}`,
  },
  {
    text: __(CircleTagModel.MUSIC),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.music}`,
  },
  {
    text: __(CircleTagModel.CULTURE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.culture}`,
  },
  {
    text: __(CircleTagModel.VOLUNTEER),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.volunteer}`,
  },
  {
    text: __(CircleTagModel.PROGRAMMING),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.programming}`,
  },
  {
    text: __(CircleTagModel.NATURE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.nature}`,
  },
  {
    text: __(CircleTagModel.INTERNATIONAL),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.international}`,
  },
]
const tagOtherItems: TagItem[] = [
  {
    text: __(CircleTagModel.INCARE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.incare}`,
  },
  {
    text: __(CircleTagModel.LOOSE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.loose}`,
  },
  {
    text: __(CircleTagModel.COMMUNITY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.community}`,
  },
  {
    text: __(CircleTagModel.URGENT_RECRUITMENT),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.urgent_recruitment}`,
  },
  {
    text: __(CircleTagModel.MYSTERY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mystery}`,
  },
  {
    text: __(CircleTagModel.MAMMOTH),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mammoth}`,
  },
  {
    text: 'オンライン活動',
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.online}`,
  },
  {
    text: __(CircleTagModel.ACTIVE_ACTIVITY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.active_activity}`,
  },
  {
    text: __(CircleTagModel.MONDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.monday}`,
  },
  {
    text: __(CircleTagModel.TUESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.tuesday}`,
  },
  {
    text: __(CircleTagModel.WEDNESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.wednesday}`,
  },
  {
    text: __(CircleTagModel.THURSDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.thursday}`,
  },
  {
    text: __(CircleTagModel.FRIDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.friday}`,
  },
  {
    text: __(CircleTagModel.ONLY_MONDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_monday}`,
  },
  {
    text: __(CircleTagModel.ONLY_TUESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_tuesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_WEDNESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_wednesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_THURSDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_thursday}`,
  },
  {
    text: __(CircleTagModel.ONLY_FRIDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_friday}`,
  },
  {
    text: __(CircleTagModel.HOLIDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.holiday}`,
  },
]

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

type Props = {}
const BaseFooter: FC<Props> = () => {
  const [isTagOpen, setIsTagOpen] = useState(false)
  const { width } = useWindowResize()
  const { isMd } = useMediaQuery()

  useEffect(() => {
    if (isMd) {
      setIsTagOpen(true)
    }
  })

  return (
    <div className="bg-gray-100">
      {width ? (
        <div className="md:px-6 md:mb-10 text-center">
          <a href="https://media.uu-circles.com/" target="_blank">
            <Image
              src="/images/uuyell-poster.png"
              width={width > 700 ? 700 : width}
              height={width > 700 ? (700 * 218) / 375 : (width * 218) / 375}
            />
          </a>
        </div>
      ) : (
        ''
      )}

      <div className="hidden md:flex justify-center">
        <div className="grid grid-cols-2 gap-6" style={{ maxWidth: 700 }}>
          <div className="md:mb-10 text-center">
            <Link href="/circle/newjoy">
              <a>
                <Image
                  className="border-2 border-red-900 rounded"
                  src="/images/topButtons/shinkan1.png"
                  width={340}
                  height={92}
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>

          <div className="md:mb-10 text-center">
            <Link href="/guide/discord">
              <a>
                <Image
                  className="border-2 border-red-900 rounded"
                  src="/images/topButtons/discordBunner1.png"
                  width={340}
                  height={92}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6">
        <BaseContainer>
          <div className="flex">
            <div className="pt-6 w-1/2 md:w-3/4">
              <h2 id="footer_tag_list" className="text-lg mb-6">
                全てのタグ
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-3">
                {tagAlwaysItems.map((_tagItem, idx) => (
                  <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
                ))}
                {isTagOpen ? (
                  <Fragment>
                    {tagOtherItems.map((_tagItem, idx) => (
                      <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
                    ))}
                  </Fragment>
                ) : (
                  <p>
                    <a
                      onClick={() => setIsTagOpen(true)}
                      className="underline text-gray-400 text-xs"
                    >
                      全てのタグ
                    </a>
                  </p>
                )}
              </ul>
            </div>

            <div className="pt-6 w-1/2 md:w-1/4">
              <h2 className="text-lg mb-6">カテゴリー</h2>

              <ul>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.club}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">部活</a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.officialOrganization}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.OFFICIAL_ORGANIZATION)}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.studentGroup}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.STUDENT_GROUP)}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.unofficialOrganization}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.UNOFFICIAL_ORGANIZATION)}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </BaseContainer>

        <BaseContainer>
          <div className="pt-16">
            <h2 className="text-lg mb-6">メニュー</h2>

            <ul>
              <li className="mb-3">
                <Link href="/circle">
                  <a className="text-gray-400 font-bold text-sm">
                    サークルを見つける
                  </a>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/circle/newjoy">
                  <a className="text-gray-400 font-bold text-sm">今日の新歓</a>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/guide/discord">
                  <a className="text-gray-400 font-bold text-sm">
                    オンライン新歓に参加しよう！
                  </a>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/guide/management-team">
                  <a className="text-gray-400 font-bold text-sm">
                    運営団体について
                  </a>
                </Link>
              </li>
              <li className="mb-3">
                <a
                  href="https://forms.gle/1oULcDjiPaknvfvc8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 font-bold text-sm"
                >
                  お問い合わせ
                </a>
              </li>
              <li className="mb-3">
                <Link href="/guide/qanda">
                  <a className="text-gray-400 font-bold text-sm">Q and A</a>
                </Link>
              </li>
            </ul>
          </div>
        </BaseContainer>

        <div className="pt-8 text-center">
          <BaseContainer>
            <hr className="border border-gray-200" />
            <div className="pt-8 pb-16">
              <Link href="/guide/management-team">
                <a className="text-gray-400 px-2 text-xs">運営団体</a>
              </Link>

              <Link href="/terms">
                <a className="text-gray-400 px-2 text-xs">利用規約</a>
              </Link>

              <Link href="/privacy">
                <a className="text-gray-400 px-2 text-xs">
                  プライバシーポリシー
                </a>
              </Link>
            </div>
          </BaseContainer>
        </div>
      </div>
    </div>
  )
}

export { BaseFooter }
