import Link from "next/link"

const BaseSpMenu = () => {
    return (
        <div>
            <div>
                <ul>
                    <li className="border border-b border-gray-200">
                        <Link href="/circle">
                            <a className="text-sm text-black">
                                <div className="pl-8 py-4">
                                    団体・サークルを探す
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className="border border-b border-gray-200">
                        <Link href="/circle/newjoy">
                            <a className="text-sm text-black">
                                <div className="pl-8 py-4">
                                    今日の新歓イベント
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className="border border-b border-gray-200">
                        <Link href="/circle">
                            <a className="text-sm text-black">
                                <div className="pl-8 py-4">
                                    全てのカテゴリー
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className="border border-b border-gray-200">
                        <Link href="/circle">
                            <a className="text-sm text-black">
                                <div className="pl-8 py-4">
                                    全てのタグ
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export { BaseSpMenu }