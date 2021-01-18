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
    title: string
}> = ({ children, title }) => {
    return (
        <div className="w-full lg:w-1/6 pr-2">
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">{title}</p>
            <div className="flex justify-center h-7 items-center">
                { children }
            </div>
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
            </div>
        </div>
    </div>
    )
}

export { CircleNewJoyListItem }