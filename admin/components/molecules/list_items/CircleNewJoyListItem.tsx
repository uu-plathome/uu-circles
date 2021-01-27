import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Image from 'next/image'
import { faCheckCircle, faTimesCircle, faEdit, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { CircleNewJoy } from '@/infra/api/types';
import Link from 'next/link';
import { __ } from '@/lang/ja';

type Props = {
    circleNewJoy: CircleNewJoy
}

const CircleListItemTableColumn: FC<{
    title: string,
    large?: boolean
}> = ({ children, title, large }) => {
    return (
        <div className={`
            w-full 
            ${large ? 'lg:w-1/3' : 'lg:w-1/6'}
            pr-2
        `}>
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">{title}</p>
            <div className="flex justify-center h-7 items-center">
                { children }
            </div>
        </div>
    )
}
const formatDateTime = (datetime: string) => dayjs(datetime).format('M月D日 H時m分')
const NewJoyDateTime: FC<{
    startDate: string,
    endDate: string
}> = ({ startDate, endDate }) => {
    if (startDate && endDate) {
        return (
            <div>
                <p className="text-sm mt-4"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span>{formatDateTime(startDate)}</p>
                <p className="text-sm mt-2"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">終</span>{formatDateTime(endDate)}</p>
            </div>
        )
    }
    
    if (startDate && !endDate) {
        return (
            <div>
                <p className="text-sm"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span>{formatDateTime(startDate)}</p>
            </div>
        )
    }

    if (!startDate && endDate) {
        return (
            <div>
                <p className="text-sm mt-4"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span></p>
                <p className="text-sm mt-2"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">終</span>{formatDateTime(endDate)}</p>
            </div>
        )
    }

    return (
        <div>
            未選択
        </div>
    )
}

const CircleNewJoyListItem: FC<Props> = ({ circleNewJoy }) => {
    return (
        <div className="text-white flex">
        <div>
            <Image
                src={`/images/no-image.png`}
                width="100"
                height="100"
                layout={"fixed"}
                objectFit={"contain"}
                className="square-image"
            />
        </div>

        <div className="ml-2 w-full">
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ circleNewJoy.title }</h2>

            <div className="flex flex-wrap w-full">
                <CircleListItemTableColumn title="公開中">
                    <FontAwesomeIcon
                        size="lg"
                        color={circleNewJoy.release ? 'green' : 'red' }
                        icon={circleNewJoy.release ? faCheckCircle : faTimesCircle}
                    />
                </CircleListItemTableColumn>

                <CircleListItemTableColumn title="新歓日時" large>
                    <NewJoyDateTime 
                        startDate={circleNewJoy.startDate}
                        endDate={circleNewJoy.endDate}
                    />
                </CircleListItemTableColumn>

                <CircleListItemTableColumn title="編集する">
                    <Link 
                        href="/circle/[id]/newjoy/[circleNewJoyId]/edit" 
                        as={`/circle/${circleNewJoy.circleId}/newjoy/${circleNewJoy.id}/edit`} 
                    >
                        <a>
                            <FontAwesomeIcon
                                size="lg"
                                color="orange"
                                icon={ faEdit }
                            />
                        </a>
                    </Link>
                </CircleListItemTableColumn>
            </div>
        </div>
    </div>
    )
}

export { CircleNewJoyListItem }