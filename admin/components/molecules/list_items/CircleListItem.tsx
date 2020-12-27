import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Image from 'next/image'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Circle } from '@/infra/api/types';

type Props = {
    circle: Circle
}
const CircleListItem: FC<Props> = ({ circle }) => {
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
            <h2 className="font-bold text-lg text-gray-300 mb-2">サークル名</h2>

            <div className="flex flex-wrap w-full">
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">公開中</p>
                    <div className="flex justify-center h-7 items-center">
                        <FontAwesomeIcon
                            size="lg"
                            color={circle.release ? 'green' : 'red' }
                            icon={circle.release ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">種別</p>
                    <div className="flex justify-center h-7 items-center">
                        サークル
                    </div>
                </div>
                <div className="w-full lg:w-1/6">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">編集する</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export { CircleListItem }