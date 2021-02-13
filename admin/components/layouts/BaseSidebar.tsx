import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faChevronRight, faHome, faBuilding, faUser, faAd, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BaseHeader } from "./BaseHeader";

interface SidebarItem {
    name: string
    link: string
    icon: IconDefinition
    exact: boolean
}

const generalSiderbarList = [
    { name: 'ダッシュボード', link: '/', icon: faHome, exact: true },
    { name: 'サークル', link: '/circle', icon: faBuilding, exact: false },
    { name: '管理者管理', link: '/user/admin', icon: faUser, exact: true },
    { name: '広告管理', link: '/advertise', icon: faAd, exact: true },
    { name: 'ログアウト', link: '/logout', icon: faUser, exact: true },
] as SidebarItem[]

/**
 * 
 * @param router 
 * @param link 
 * @param exact 完全一致かどうか
 */
const isActiveRoute = (router: NextRouter, link: string, exact: boolean) => {
    if (exact) {
        return link === router.pathname
    }

    return router.pathname.startsWith(link)
}

type SidebarItemProps= {
    sidebarItem: SidebarItem
}
const SidebarItem: FC<SidebarItemProps> = ({
    sidebarItem
}) => {
    const router = useRouter()
    const isActiveSidebar = isActiveRoute(router, sidebarItem.link, sidebarItem.exact)

    return (
        <li className="pb-2">
            <Link href={sidebarItem.link}>
                <a
                    className={`
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        p-2
                        rounded
                        hover:bg-white
                        hover:text-black
                        hover:font-bold
                        ${isActiveSidebar ? 'bg-white' : '' }
                        ${isActiveSidebar ? 'text-black' : 'text-white' }
                        ${isActiveSidebar ? 'font-bold' : 'font-light' }
                    `}
                >
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={sidebarItem.icon}  />
                        <span className="pl-1">{sidebarItem.name}</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} />
                </a>
            </Link>
        </li>
    )
}

const BaseSidebar: FC = () => {
    const [ visible, setVisible ] = useState(true)
    const { isMd } = useMediaQuery()

    useEffect(() => {
        if (isMd) {
            setVisible(true)
        }
    })

    return (
        <div className="relative">

            <div 
                className={
                    (!isMd ? `fixed top-0 left-0 bg-gray-900 w-full` : '' )
                    + (visible ? ` h-full` : '')
                }
            >
                {!isMd ? (
                    <BaseHeader
                        onClick={() => setVisible(!visible)}
                    />
                ): ''}

                {visible ? (
                    <div className="py-4 pr-4 relative">
                        <div>
                            <p className="font-bold text-white p-2">General</p>
                        </div>
        
                        <ul>
                            {generalSiderbarList.map((sidebarItem: SidebarItem, idx) =>
                                <SidebarItem sidebarItem={sidebarItem} key={`general-${idx}`} />
                            )}
                        </ul>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export { BaseSidebar }