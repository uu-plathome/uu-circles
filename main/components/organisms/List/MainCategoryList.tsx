import { WhiteBadge } from "@/components/atoms/badge/WhiteBadge"
import { FC } from "react"

const MainCategoryList: FC = () => {
    return (
        <div className="md:flex md:justify-center md:items-center md:pt-10 pb-10">
            <h2 className="text-black text-lg font-bold md:pr-8 md:border-r md:border-gray-400 md:mr-8 mb-2">
                おすすめのカテゴリー
            </h2>

            <div className="flex">
                <div className="px-1">
                    <WhiteBadge href="/">
                        運動部
                    </WhiteBadge>
                </div>

                <div className="px-1">
                    <WhiteBadge href="/">
                        サークル
                    </WhiteBadge>
                </div>

                <div className="px-1">
                    <WhiteBadge href="/">
                        文化部
                    </WhiteBadge>
                </div>

                <div className="px-1">
                    <WhiteBadge href="/">
                        音楽系
                    </WhiteBadge>
                </div>
            </div>
        </div>
    )
}

export { MainCategoryList }