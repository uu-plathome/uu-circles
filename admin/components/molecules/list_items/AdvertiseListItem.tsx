import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Image from 'next/image'
import { faCheckCircle, faTimesCircle, faEdit, faUserAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { __ } from '@/lang/ja';
import { Advertise } from '@/lib/types/model/Advertise';

type Props = {
    advertise: Advertise
    onDelete(advertiseId: number): void
}

const ListItemTableColumn: FC<{
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
const AdvertiseListItem: FC<Props> = ({ advertise, onDelete }) => {
    return (
        <div className="text-white flex">
        <div>
            <Image
                src={advertise.mainImageUrl ? advertise.mainImageUrl : `/images/no-image.png`}
                width="100"
                height="100"
                layout={"fixed"}
                objectFit={"contain"}
                className="square-image"
            />
        </div>

        <div className="ml-2 w-full">
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ advertise.title }</h2>

            <div className="flex flex-wrap w-full">
                <ListItemTableColumn title="公開中">
                    <FontAwesomeIcon
                        size="lg"
                        color={advertise.active ? 'green' : 'red' }
                        icon={advertise.active ? faCheckCircle : faTimesCircle}
                    />
                </ListItemTableColumn>
                <ListItemTableColumn title="編集する">
                    <Link href="/advertise/[advertiseId]/edit" as={`/advertise/${advertise.id}/edit`} >
                        <a>
                            <FontAwesomeIcon
                                size="lg"
                                color="orange"
                                icon={ faEdit }
                            />
                        </a>
                    </Link>
                </ListItemTableColumn>
                <ListItemTableColumn title="削除する">
                <button onClick={() => onDelete(advertise.id)}>
                        <FontAwesomeIcon
                            size="lg"
                            color="red"
                            icon={ faTrash }
                        />
                    </button>
                </ListItemTableColumn>
            </div>
        </div>
    </div>
    )
}

export { AdvertiseListItem }