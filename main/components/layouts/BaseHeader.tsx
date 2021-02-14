import { FC } from "react";
import { YellowButton } from '@/components/atoms/button/YellowButton'
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Color from 'colors'

type Props = {}
const BaseHeader: FC<Props> = () => {
    const router = useRouter()
    const {isMd} = useMediaQuery()

    return (
        <div>
            <div id="site_title" className="px-2 sm:px-0 xl:container flex justify-between items-center py-2">
                <div className="flex items-center">
                    {!isMd ? (
                        <div className="pr-2">
                            <button>
                                <FontAwesomeIcon size="lg" color={Color.gray[400]} icon={faBars} />
                            </button>
                        </div>
                    ): ''}

                    <h1 className="text-sm md:text-lg">
                        {router.pathname === '/' ? (
                            <p>UU-Circle</p>
                        ) : (
                            <Link href="/">
                                <a></a>
                            </Link>
                        )}
                    </h1>
                </div>

                <div className="flex items-center">
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