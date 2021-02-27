import { FC } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Circle } from "@/lib/types/model/Circle";

type Props = {
    circles: Circle[]
}
const MainPageCircleList: FC<Props> = ({ circles }) => {
    const width = 400
    // w : h = 210 : 297
    const height = width * 297 / 210

    return (
        <div>
            <div className="max-w-screen-md md:mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
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
                                    />
                                </a>
                            </Link>

                            <h3 className="text-center">
                                { circle.name }
                            </h3>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export { MainPageCircleList }