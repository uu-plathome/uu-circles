import { FC } from "react"
import Link from 'next/link'
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy"
import { __ } from "@/lang/ja"
import dayjs from "dayjs"

const getDate = (circleNewJoy: CircleNewJoy) => {
    if (circleNewJoy.startDate) {
        const date = dayjs(circleNewJoy.startDate)

        return date.format('YYYY/MM/DD')
    }

    return '未定'
}
const getTime = (circleNewJoy: CircleNewJoy) => {
    if (circleNewJoy.startDate && circleNewJoy.endDate) {
        const startDate = dayjs(circleNewJoy.startDate)
        const endDate = dayjs(circleNewJoy.endDate)

        return `${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`
    }

    if (circleNewJoy.startDate) {
        const startDate = dayjs(circleNewJoy.startDate)

        return `${startDate.format('HH:mm')}-`
    }

    if (circleNewJoy.endDate) {
        const endDate = dayjs(circleNewJoy.endDate)

        return `-${endDate.format('HH:mm')}`
    }

    return '未定'
}

type Props = {
    slug: string
    circleNewJoy: CircleNewJoy
}
const CircleNewJoyListItem: FC<Props> = ({ slug, circleNewJoy }) => {
    return (
        <div className="border border-4 border-gray-300 rounded-lg flex justify-between items-center px-4 py-2 mx-auto mb-2" style={{ width: 300 }}>
            <div className="w-full pr-2">
                <h3 className="text-black font-bold mb-1">{ circleNewJoy.title }</h3>
                <p className="text-sm border-b border-gray-400 flex mb-1">
                    <span className="text-gray-400 whitespace-nowrap text-xs pl-1">場所</span><span className="block w-full text-center">{ __(circleNewJoy.placeOfActivity) }</span>
                </p>
                <div className="text-sm flex">
                    <div className="mr-2 border-b border-gray-400 whitespace-nowrap">
                        <span className="text-gray-400 text-xs pl-1">日時</span>
                        <span className="px-2">{ getDate(circleNewJoy) }</span>
                    </div>
                    <span className="block w-full text-center border-b border-gray-400 whitespace-nowrap">{ getTime(circleNewJoy) }</span>
                </div>
            </div>
            <div>
                <Link href="/circle/[slug]" as={`/circle/${slug}`}>
                    <div className="text-white bg-gray-900 rounded-full text-xs flex items-center justify-center" style={{ width: 52, height: 52 }}>
                        詳細
                    </div>
                </Link>
            </div>
        </div>
    )
}

export { CircleNewJoyListItem }