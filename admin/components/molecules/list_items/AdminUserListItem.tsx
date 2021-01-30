import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Image from 'next/image'
import { faCheckCircle, faTimesCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { User } from '@/lib/types/model/User';

type Props = {
    user: User
    onResendEmail(email: string): void
    onDeleteUser(userId: number): void
}
const AdminUserListItem: FC<Props> = ({ user, onResendEmail, onDeleteUser }) => {
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
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ user.displayName }</h2>

            <div className="flex flex-wrap w-full">
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">ユーザー名</p>
                    <div className="flex justify-center h-7 items-center">
                        {user.username}
                    </div>
                </div>
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">有効なアカウント</p>
                    <div className="flex justify-center h-7 items-center">
                        <FontAwesomeIcon
                            size="lg"
                            color={user.active ? 'green' : 'red' }
                            icon={user.active ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">認証済みか</p>
                    <div className="flex justify-center h-7 items-center">
                        <div>
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon
                                    size="lg"
                                    color={user.emailVerifiedAt ? 'green' : 'red' }
                                    icon={user.emailVerifiedAt ? faCheckCircle : faTimesCircle}
                                />
                            </div>
                            {!user.emailVerifiedAt ? (
                                <div className="text-sm">
                                    <button onClick={() => onResendEmail(user.email)}>メールの再送信</button>
                                </div>
                            ) : '' }
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/6">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">編集する</p>
                    <div className="flex justify-center h-7 items-center">
                        {/* <Link href="/circle/edit/[id]" as={`/circle/edit/${user.id}`} >
                            <a> */}
                                <FontAwesomeIcon
                                    size="lg"
                                    color="orange"
                                    icon={ faEdit }
                                />
                            {/* </a>
                        </Link> */}
                    </div>
                </div>
                <div className="w-full lg:w-1/6">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">削除する</p>
                    <div className="flex justify-center h-7 items-center">
                        <button onClick={() => onDeleteUser(user.id)}>
                            <FontAwesomeIcon
                                size="lg"
                                color="red"
                                icon={ faTrash }
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export { AdminUserListItem }