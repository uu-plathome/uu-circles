import { faBuilding, faPager, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import colors from '@/src/styles/colors'

type MenuItemProps = {
  href: string
}
const MenuItem: FC<MenuItemProps> = ({ href, children }) => {
  return (
    <li className="border border-b border-gray-200">
      <Link href={href}>
        <a className="text-sm text-black">
          <div className="py-4 pl-8">{children}</div>
        </a>
      </Link>
    </li>
  )
}

const BaseSpMenu: FC = () => {
  return (
    <div>
      <div>
        <ul className="mb-8">
          <h3 className="my-4 text-center">サークル管理画面</h3>

          <MenuItem href="/">
            <FontAwesomeIcon icon={faBuilding} className="mr-4" size="lg" />
            サークル一覧
          </MenuItem>

          <MenuItem href="/user/edit">
            <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
            アカウント情報
          </MenuItem>

          <MenuItem href="/logout">
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              color={colors.red[500]}
              className="mr-4"
            />
            ログアウト
          </MenuItem>
        </ul>

        <ul>
          <h3 className="mb-4 text-center">メインページを見る</h3>

          <MenuItem href="https://uu-circles.com">
            <FontAwesomeIcon icon={faPager} size="lg" className="mr-4" />
            UU-Circles
          </MenuItem>

          <MenuItem href="https://media.uu-circles.com/">
            <FontAwesomeIcon icon={faPager} size="lg" className="mr-4" />
            uu-yell
          </MenuItem>
        </ul>
      </div>
    </div>
  )
}

export { BaseSpMenu }
