import Link from 'next/link'
import React from 'react'

const AdminHeader: React.FC = () => {
    return (
        <div className="bg-white h-14 flex items-center justify-between px-4">
            <a className="text-black text-xl hover:underline">
                U-lab
            </a>

            <a className="hover:underline" href="https://ulab-uu.com">
                サークル管理画面へ
            </a>
        </div>
    )
}

export { AdminHeader }