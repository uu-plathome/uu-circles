import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useEffect, useState } from 'react'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import { BaseContainer } from '../molecules/Container/BaseContainer'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useWindowResize } from '@/src/hooks/useWindowResize'
import { __ } from '@/src/lang/ja'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'

type TagItem = {
  text: string
  href: string
  as?: string
}
const tagAlwaysItems: TagItem[] = [
  {
    text: __(CircleTagModel.SPORT, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.sport}`,
  },
  {
    text: __(CircleTagModel.MUSIC, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.music}`,
  },
  {
    text: __(CircleTagModel.CULTURE, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.culture}`,
  },
  {
    text: __(CircleTagModel.VOLUNTEER, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.volunteer}`,
  },
  {
    text: __(CircleTagModel.PROGRAMMING, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.programming}`,
  },
  {
    text: __(CircleTagModel.NATURE, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.nature}`,
  },
  {
    text: __(CircleTagModel.INTERNATIONAL, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.international}`,
  },
]
const tagOtherItems: TagItem[] = [
  {
    text: __(CircleTagModel.INCARE, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.incare}`,
  },
  {
    text: __(CircleTagModel.LOOSE, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.loose}`,
  },
  {
    text: __(CircleTagModel.COMMUNITY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.community}`,
  },
  {
    text: __(CircleTagModel.URGENT_RECRUITMENT, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.urgent_recruitment}`,
  },
  {
    text: __(CircleTagModel.MYSTERY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mystery}`,
  },
  {
    text: __(CircleTagModel.MAMMOTH, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mammoth}`,
  },
  {
    text: __(CircleTagModel.ACTIVE_ACTIVITY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.active_activity}`,
  },
  {
    text: __(CircleTagModel.ONLY_MONDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_monday}`,
  },
  {
    text: __(CircleTagModel.ONLY_TUESDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_tuesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_WEDNESDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_wednesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_THURSDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_thursday}`,
  },
  {
    text: __(CircleTagModel.ONLY_FRIDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_friday}`,
  },
  {
    text: __(CircleTagModel.HOLIDAY, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.holiday}`,
  },
  {
    text: __(CircleTagModel.MINE, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mine}`,
  },
  {
    text: __(CircleTagModel.YOTO, CircleTagModel._type),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.yoto}`,
  },
]

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

type Props = {
  uuYellArticles?: WP_REST_API_Posts
}
const BaseFooter: FC<Props> = ({ uuYellArticles }) => {
  const [isTagOpen, setIsTagOpen] = useState(false)
  const { width } = useWindowResize()
  const { isMd } = useMediaQuery()

  useEffect(() => {
    if (isMd) {
      setIsTagOpen(true)
    }
  }, [isMd])

  return (
    <div className="bg-gray-100">
      {width ? (
        <div className="md:px-6 md:mb-10 text-center">
          <a href="https://media.uu-circles.com/">
            <Image
              src={ImagePath.UU_YELL.POSTER}
              width={width > 700 ? 700 : width}
              height={width > 700 ? (700 * 218) / 375 : (width * 218) / 375}
              alt="メディアサイトuu-yellを見る"
            />
          </a>
        </div>
      ) : (
        ''
      )}

      <div className="mb-10">
        <BaseContainer>
          {uuYellArticles && uuYellArticles.length > 0 ? (
            <div className="px-6 pt-12 md:pt-16 mb-10">
              <h2 className="mb-6 text-lg">uu-yellの最新記事</h2>

              <ul className="pl-4 list-decimal list-outside text-gray-400">
                {uuYellArticles.map((uuYellArticle: WP_REST_API_Post, idx) => {
                  return (
                    <li key={`uuYellArticle-${idx}`} className="mb-3">
                      <a
                        href={uuYellArticle.link}
                        className="text-sm font-bold text-gray-400"
                      >
                        {uuYellArticle.title.rendered}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            ''
          )}

          <hr className="border border-gray-200" />
        </BaseContainer>
      </div>

      <div className="px-6">
        <BaseContainer>
          <div className="flex">
            <div className="pt-6 w-1/2 md:w-3/4">
              <h2 id="footer_tag_list" className="mb-6 text-lg">
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
                      className="text-xs text-gray-400 underline"
                    >
                      全てのタグ
                    </a>
                  </p>
                )}
              </ul>
            </div>

            <div className="pt-6 w-1/2 md:w-1/4">
              <h2 className="mb-6 text-lg">カテゴリー</h2>

              <ul>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${CategorySlugProperty.club}`}
                  >
                    <a className="text-sm font-bold text-gray-400">
                      {__(
                        CategorySlugProperty.club,
                        CategorySlugProperty._type
                      )}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${CategorySlugProperty.official_organization}`}
                  >
                    <a className="text-sm font-bold text-gray-400">
                      {__(
                        CategorySlugProperty.official_organization,
                        CategorySlugProperty._type
                      )}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${CategorySlugProperty.student_group}`}
                  >
                    <a className="text-sm font-bold text-gray-400">
                      {__(
                        CategorySlugProperty.student_group,
                        CategorySlugProperty._type
                      )}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${CategorySlugProperty.unofficial_organization}`}
                  >
                    <a className="text-sm font-bold text-gray-400">
                      {__(
                        CategorySlugProperty.unofficial_organization,
                        CategorySlugProperty._type
                      )}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </BaseContainer>

        <BaseContainer>
          <div>
            <div className="flex flex-col-reverse md:flex-row">
              <div className="pt-20 md:w-1/2">
                <h2 className="mb-6 text-lg">メニュー</h2>

                <ul>
                  <li className="mb-3">
                    <Link href="/circle">
                      <a className="text-sm font-bold text-gray-400">
                        サークルを見つける
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/circle/newjoy">
                      <a className="text-sm font-bold text-gray-400">
                        今日の新歓
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/gacha">
                      <a className="text-sm font-bold text-gray-400">
                        サークルガチャ
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/statistics">
                      <a className="text-sm font-bold text-gray-400">
                        統計情報
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <a
                      href="https://forms.gle/1oULcDjiPaknvfvc8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-gray-400"
                    >
                      お問い合わせ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-20 md:w-1/2">
                <h2 className="mb-6 text-lg">デモ画面</h2>

                <ul>
                  <li className="mb-3">
                    <Link href="/demo">
                      <a className="text-sm font-bold text-gray-400">
                        メイン画面 (デモ)
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/circle/newjoy/demo">
                      <a className="text-sm font-bold text-gray-400">
                        今日の新歓 (デモ)
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </BaseContainer>

        <div className="pt-8 text-center">
          <BaseContainer>
            <hr className="border border-gray-200" />
            <div className="py-8">
              <Link href="/guide/management-team">
                <a className="px-2 text-xs text-gray-400">UU-Circlesについて</a>
              </Link>

              <Link href="/terms">
                <a className="px-2 text-xs text-gray-400">利用規約</a>
              </Link>

              <Link href="/privacy">
                <a className="px-2 text-xs text-gray-400">
                  プライバシーポリシー
                </a>
              </Link>
            </div>
          </BaseContainer>
        </div>

        <div className="pb-8 text-center">
          <a href="https://uu-plathome.com/">
            <Image
              src={ImagePath.UUPH.LOGO_SVG}
              width={220}
              height={39}
              alt="UU-PlatHome CopyLight"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export type { Props }
export { BaseFooter }
