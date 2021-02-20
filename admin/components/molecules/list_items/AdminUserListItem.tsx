import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { faCheckCircle, faTimesCircle, faEdit, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/lib/types/model/User';
import Link from 'next/link';
import { __ } from '@/lang/ja';

type Props = {
    user: User
    authUser: User
    onResendEmail(email: string): void
}
const AdminUserListItem: FC<Props> = ({ user, authUser, onResendEmail }) => {
    return (
        <div className="mb-4">
        <div className="ml-2 w-full">
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ user.displayName }</h2>

            <div className="flex flex-wrap w-full">
                <div className="w-1/2 sm:w-1/3 lg:w-3/12 pr-2 mb-4 lg:mb-0">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">ユーザー名</p>
                    <div className="flex justify-center h-7 items-center text-white">
                        {`@${user.username}`}
                    </div>
                </div>
                <div className="w-1/2 sm:w-1/3 lg:w-3/12 pr-2 mb-4 lg:mb-0">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">権限</p>
                    <div className="flex justify-center h-7 items-center text-white">
                        {__(user.role, 'Role')}
                    </div>
                </div>
                <div className="w-1/2 sm:w-1/3 lg:w-2/12 pr-2 mb-4 lg:mb-0">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">有効なアカウント</p>
                    <div className="flex justify-center h-7 items-center">
                        <FontAwesomeIcon
                            size="lg"
                            color={user.active ? 'green' : 'red' }
                            icon={user.active ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                </div>
                <div className="w-1/2 sm:w-1/3 lg:w-2/12 pr-2 mb-4 lg:mb-0">
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
                                <div className="text-sm text-white">
                                    <button onClick={() => onResendEmail(user.email)}>メールの再送信</button>
                                </div>
                            ) : '' }
                        </div>
                    </div>
                </div>
                <div className="w-1/2 sm:w-1/3 lg:w-1/12 pr-2 mb-4 lg:mb-0">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">編集</p>
                    <div className="flex justify-center h-7 items-center">
                        <Link href="/user/admin/[userId]/edit" as={`/user/admin/${user.id}/edit`} >
                            <a>
                                <FontAwesomeIcon
                                    size="lg"
                                    color="orange"
                                    icon={ faEdit }
                                />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 sm:w-1/3 lg:w-1/12 pr-2 mb-4 lg:mb-0">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">削除</p>
                    <div className="flex justify-center h-7 items-center">
                        {authUser && user.id !== authUser.id ? (
                            <Link href="/user/admin/[userId]/delete" as={`/user/admin/${user.id}/delete`} >
                                <a>
                                    <FontAwesomeIcon
                                        size="lg"
                                        color="red"
                                        icon={ faTrash }
                                    />
                                </a>
                            </Link>
                        ) : (
                            <FontAwesomeIcon
                                size="lg"
                                color="white"
                                icon={ faMinus }
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export { AdminUserListItem }