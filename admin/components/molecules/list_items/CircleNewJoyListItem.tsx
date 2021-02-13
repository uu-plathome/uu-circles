import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { faCheckCircle, faTimesCircle, faEdit, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy';
import { newJoyTitleEntity } from '@/lib/entity/newJoyTitleEntity';
import { Circle } from '@/lib/types/model/Circle';
import { __ } from '@/lang/ja';

type Props = {
    circle: Circle
    circleNewJoy: CircleNewJoy
    onCopy(circleNewJoyId: number): void
    onDelete(circleNewJoyId: number): void
}

const CircleListItemTableColumn: FC<{
    title: string,
    large?: boolean
    xs?: boolean
}> = ({ children, title, large, xs }) => {
    let w = 'lg:w-1/6'
    w = large ? 'lg:w-1/4' : w
    w = xs ? 'lg:w-1/12' : w
    return (
        <div className={`
            w-full 
            ${w}
            pr-2
        `}>
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">{title}</p>
            <div className="flex justify-center h-10 items-center">
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
                <p className="text-sm text-white mt-4"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span>{formatDateTime(startDate)}</p>
                <p className="text-sm text-white mt-2"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">終</span>{formatDateTime(endDate)}</p>
            </div>
        )
    }
    
    if (startDate && !endDate) {
        return (
            <div>
                <p className="text-sm text-white"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span>{formatDateTime(startDate)}</p>
            </div>
        )
    }

    if (!startDate && endDate) {
        return (
            <div>
                <p className="text-sm text-white mt-4"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">始</span></p>
                <p className="text-sm text-white mt-2"><span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">終</span>{formatDateTime(endDate)}</p>
            </div>
        )
    }

    return (
        <div>
            未選択
        </div>
    )
}

const CircleNewJoyListItem: FC<Props> = ({ circle, circleNewJoy, onCopy, onDelete }) => {
    const newJoyTitle = newJoyTitleEntity(circle, circleNewJoy)
    return (
        <div className="mb-8">
        <div className="ml-2 w-full">
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ newJoyTitle.value }</h2>

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

                <CircleListItemTableColumn title="活動場所" large>
                    <div className="text-white">
                        <p>{ __(circleNewJoy.placeOfActivity) }</p>
                    </div>
                </CircleListItemTableColumn>

                <CircleListItemTableColumn title="編集">
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

                <CircleListItemTableColumn title="コピー" xs>
                    <button onClick={() => onCopy(circleNewJoy.id)}>
                        <FontAwesomeIcon
                            size="lg"
                            color="orange"
                            icon={ faCopy }
                        />
                    </button>
                </CircleListItemTableColumn>

                <CircleListItemTableColumn title="削除" xs>
                    <button onClick={() => onDelete(circleNewJoy.id)}>
                        <FontAwesomeIcon
                            size="lg"
                            color="red"
                            icon={ faTrash }
                        />
                    </button>
                </CircleListItemTableColumn>

            </div>
        </div>
    </div>
    )
}

export { CircleNewJoyListItem }