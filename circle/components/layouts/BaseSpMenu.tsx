import colors from "@/colors"
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

const BaseSpMenu: FC = () => {
    return (
        <div>
            <div>
                <ul>
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
            </div>

        </div>
    )
}

export { BaseSpMenu }
