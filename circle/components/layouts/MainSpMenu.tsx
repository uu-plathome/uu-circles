import Link from "next/link"
import { FC } from "react"

type MenuItemProps = {
    href: string
}
const MenuItem: FC<MenuItemProps> = ({ href, children }) => {
    return (
        <li className="border border-b border-gray-200">
            <Link href={href}>
                <a className="text-sm text-black">
                    <div className="pl-8 py-4">
                        { children }
                    </div>
                </a>
            </Link>
        </li>
    )
}

const MainSpMenu: FC = () => {
    return (
        <div>
            <div>
                <ul>
                    <MenuItem href="/circle">
                        団体・サークルを探す
                    </MenuItem>

                    <MenuItem href="/circle/newjoy">
                        今日の新歓イベント
                    </MenuItem>

                    <MenuItem href="/circle">
                        全てのカテゴリー
                    </MenuItem>

                    <MenuItem href="/circle">
                        全てのタグ
                    </MenuItem>
                </ul>
            </div>
            
        </div>
    )
}

export { MainSpMenu }