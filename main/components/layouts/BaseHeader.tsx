import { FC } from "react";
import { YellowButton } from '@/components/atoms/button/YellowButton'
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Color from 'colors'

type Props = {
    onClick?(): void
}
const BaseHeader: FC<Props> = ({ onClick }) => {
    const router = useRouter()
    const {isMd} = useMediaQuery()

    return (
        <div>
            <div id="site_title" className="px-4 sm:px-0 xl:container flex justify-between items-end py-2">
                <div className="flex items-end">
                    {!isMd ? (
                        <div className="pr-2">
                            <button onClick={onClick}>
                                <FontAwesomeIcon size="lg" color={Color.gray[400]} icon={faBars} />
                            </button>
                        </div>
                    ): ''}

                    <h1 className="text-sm md:text-lg">
                        {router.pathname === '/' ? (
                            <p>UU-Circle</p>
                        ) : (
                            <Link href="/">
                                <a>UU-Circle</a>
                            </Link>
                        )}
                    </h1>
                </div>

                <div className="flex items-end">
                    <p className="mr-4 text-xs sm:text-base">
                        <a href="" className="underline">
                            <span className="hidden sm:inline">サークルを</span>見つける
                        </a>
                    </p>

                    <YellowButton>
                        新入生へ
                    </YellowButton>
                </div>
            </div>
        </div>
    )
}

export { BaseHeader }