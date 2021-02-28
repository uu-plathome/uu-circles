import { FC } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Circle } from "@/lib/types/model/Circle";

type Props = {
    circles: Circle[]
}
const BaseCircleList: FC<Props> = ({ circles }) => {
    const width = 400
    // w : h = 210 : 297
    const height = width * 297 / 210

    return (
        <div>
            <div className="max-w-screen-md md:mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                {circles.map((circle) => {
                    return (
                        <div key={circle.id} className="mb-6 md:mb-16">
                            <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                                <a>
                                    <Image 
                                        src={circle.handbillImageUrl} 
                                        alt={`${circle.name}のビラ`}
                                        width={width} 
                                        height={height}
                                        className="rounded"
                                    />
                                </a>
                            </Link>

                            <h3 className="text-center text-sm text-gray-600 pt-1">
                                { circle.name }
                            </h3>
                        </div>
                    )
                }) }
            </div>

            {circles.length === 0 ? (
                <div className="pt-4 pb-12">
                    <p className="text-black mb-4">サークルが見つかりませんでした。</p>
                    <p className="text-blue-500">
                        <Link href="/circle">
                            <a className="underline">
                                サークル一覧へ戻る
                            </a>
                        </Link>
                    </p>
                </div>
            ) : ''}
        </div>
    )
}

export { BaseCircleList }