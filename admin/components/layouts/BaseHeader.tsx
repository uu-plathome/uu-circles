import Link from 'next/link'
import React from 'react'

const BaseHeader: React.FC = () => {
    return (
        <div className="h-14 flex items-center justify-between px-4 border-b-2 border-gray-100 shadow">
            <a className="text-white text-xl hover:underline">
                U-lab
            </a>

            <a className="text-white hover:underline" href="https://ulab-uu.com">
                サークル一覧
            </a>
        </div>
    )
}

export { BaseHeader }