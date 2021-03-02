import { dayjs } from '@/plugins/Dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useState } from 'react'
import {
    faCheckCircle,
    faTimesCircle,
    faEdit,
    faTrash,
    faCopy,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { newJoyTitleEntity } from '@/lib/entity/newJoyTitleEntity'
import { Circle } from '@/lib/types/model/Circle'
import { __ } from '@/lang/ja'
import Modal from 'react-modal'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { OrangeButton } from '@/components/atoms/buttons/OrangeButton'

type Props = {
    circle: Circle
    circleNewJoy: CircleNewJoy
    onCopy(circleNewJoyId: number): void
    onDelete(circleNewJoyId: number): void
}

const CircleListItemTableColumn: FC<{
    title: string
    large?: boolean
    xs?: boolean
}> = ({ children, title, large, xs }) => {
    let w = 'lg:w-1/6'
    w = large ? 'lg:w-1/4' : w
    w = xs ? 'lg:w-1/12' : w
    return (
        <div
            className={`
            w-1/2
            ${w}
            pr-2
            mb-8
            lg:mb-0
        `}
        >
            <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
                {title}
            </p>
            <div className="flex justify-center h-10 items-center">
                {children}
            </div>
        </div>
    )
}
const formatDateTime = (datetime: string) =>
    dayjs(datetime).format('M月D日 H時m分')
const NewJoyDateTime: FC<{
    startDate: string
    endDate: string
}> = ({ startDate, endDate }) => {
    if (startDate && endDate) {
        return (
            <div>
                <p className="text-sm text-white mt-4">
                    <span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">
                        始
                    </span>
                    {formatDateTime(startDate)}
                </p>
                <p className="text-sm text-white mt-2">
                    <span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">
                        終
                    </span>
                    {formatDateTime(endDate)}
                </p>
            </div>
        )
    }

    if (startDate && !endDate) {
        return (
            <div>
                <p className="text-sm text-white">
                    <span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">
                        始
                    </span>
                    {formatDateTime(startDate)}
                </p>
            </div>
        )
    }

    if (!startDate && endDate) {
        return (
            <div>
                <p className="text-sm text-white mt-4">
                    <span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">
                        始
                    </span>
                </p>
                <p className="text-sm text-white mt-2">
                    <span className="border-2 border-white bg-white text-gray-800 rounded-full mr-2">
                        終
                    </span>
                    {formatDateTime(endDate)}
                </p>
            </div>
        )
    }

    return (
        <div>
            <p className="text-white">未登録</p>
        </div>
    )
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '320px',
    },
}

type CopyButtonProps = {
    circleNewJoy: CircleNewJoy
    newJoyTitle: string
    onCopy(): void
}
const CopyButton: FC<CopyButtonProps> = ({
    circleNewJoy,
    newJoyTitle,
    onCopy,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onClickCopyButton = () => {
        setIsOpen(false)
        onCopy()
    }

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon size="lg" color="orange" icon={faCopy} />
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="新歓のコピー"
            >
                <h2 className="text-center text-lg mb-4 font-bold">
                    本当にコピーしますか？
                </h2>

                <p className="mb-4 text-center">{newJoyTitle}</p>

                <div className="bg-gray-800 rounded p-4 mb-4">
                    <p className="text-white">新歓日時</p>
                    <div className="pb-2">
                        <NewJoyDateTime
                            startDate={circleNewJoy.startDate}
                            endDate={circleNewJoy.endDate}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="mx-2">
                        <GrayButton onClick={() => setIsOpen(false)}>
                            閉じる
                        </GrayButton>
                    </div>
                    <div className="mx-2">
                        <OrangeButton onClick={onClickCopyButton}>
                            コピー
                        </OrangeButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

type DeleteButtonProps = {
    circleNewJoy: CircleNewJoy
    newJoyTitle: string
    onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({
    circleNewJoy,
    newJoyTitle,
    onDelete,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onClickDeleteButton = () => {
        setIsOpen(false)
        onDelete()
    }

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="新歓の削除"
            >
                <h2 className="text-center text-lg mb-4 font-bold">
                    本当に削除しますか？
                </h2>

                <p className="mb-4 text-center">{newJoyTitle}</p>

                <div className="bg-gray-800 rounded p-4 mb-4">
                    <p className="text-white">新歓日時</p>
                    <div className="pb-2">
                        <NewJoyDateTime
                            startDate={circleNewJoy.startDate}
                            endDate={circleNewJoy.endDate}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="mx-2">
                        <GrayButton onClick={() => setIsOpen(false)}>
                            閉じる
                        </GrayButton>
                    </div>
                    <div className="mx-2">
                        <RedButton onClick={onClickDeleteButton}>
                            削除
                        </RedButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const CircleNewJoyListItem: FC<Props> = ({
    circle,
    circleNewJoy,
    onCopy,
    onDelete,
}) => {
    const newJoyTitle = newJoyTitleEntity(circle, circleNewJoy)
    return (
        <div className="mb-8">
            <div className="ml-2 w-full">
                <h2 className="font-bold text-lg text-gray-300 mb-2">
                    {newJoyTitle.value}
                </h2>

                <div className="flex flex-wrap w-full">
                    <CircleListItemTableColumn title="公開中">
                        <FontAwesomeIcon
                            size="lg"
                            color={circleNewJoy.release ? 'green' : 'red'}
                            icon={
                                circleNewJoy.release
                                    ? faCheckCircle
                                    : faTimesCircle
                            }
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
                            <p>{__(circleNewJoy.placeOfActivity)}</p>
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
                                    icon={faEdit}
                                />
                            </a>
                        </Link>
                    </CircleListItemTableColumn>

                    <CircleListItemTableColumn title="コピー" xs>
                        <CopyButton
                            newJoyTitle={newJoyTitle.value}
                            circleNewJoy={circleNewJoy}
                            onCopy={() => onCopy(circleNewJoy.id)}
                        />
                    </CircleListItemTableColumn>

                    <CircleListItemTableColumn title="削除" xs>
                        <DeleteButton
                            newJoyTitle={newJoyTitle.value}
                            circleNewJoy={circleNewJoy}
                            onDelete={() => onDelete(circleNewJoy.id)}
                        />
                    </CircleListItemTableColumn>
                </div>
            </div>
        </div>
    )
}

export { CircleNewJoyListItem }
