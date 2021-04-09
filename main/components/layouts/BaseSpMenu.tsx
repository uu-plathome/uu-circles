import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { useStringInput } from '@/hooks/useInput'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FC, FormEvent } from 'react'

type MenuItemProps = {
  href: string
}
const MenuItem: FC<MenuItemProps> = ({ href, children }) => {
  return (
    <li className="border border-b border-gray-200">
      <Link href={href}>
        <a className="text-sm text-black">
          <div className="pl-8 py-4">{children}</div>
        </a>
      </Link>
    </li>
  )
}

/**
 * 外部リンク用
 *
 * @param param0
 * @returns
 */
const MenuExternalItem: FC<MenuItemProps> = ({ href, children }) => {
  return (
    <li className="border border-b border-gray-200">
      <a href={href} className="text-sm text-black">
        <div className="pl-8 py-4">{children}</div>
      </a>
    </li>
  )
}

const SearchForm = () => {
  const router = useRouter()
  const name = useStringInput('')
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (name.value) {
      router.push(`/circle/search/[name]`, `/circle/search/${name.value}`)
    } else {
      router.push(`/circle`)
    }
  }

  return (
    <div className="px-8 py-4">
      <form onSubmit={onSubmit}>
        <SearchTextField id="search" name="search" {...name} expand />
      </form>
    </div>
  )
}

const BaseSpMenu: FC = () => {
  return (
    <div>
      <div>
        <SearchForm />

        <ul>
          <MenuItem href="/circle">団体・サークルを探す</MenuItem>

          <MenuItem href="/circle/newjoy">今日の新歓イベント</MenuItem>

          <MenuItem href="/guide/to-new-students">新入生の方へ</MenuItem>

          <MenuItem href="/guide/discord">
            オンライン新歓に参加しよう！
          </MenuItem>

          <MenuItem href="/statistics">統計情報</MenuItem>

          <MenuExternalItem href="https://media.uu-circles.com">
            uu-yell
          </MenuExternalItem>

          <MenuExternalItem href="https://forms.gle/1oULcDjiPaknvfvc8">
            お問い合わせ
          </MenuExternalItem>
        </ul>
      </div>
    </div>
  )
}

export { BaseSpMenu }
