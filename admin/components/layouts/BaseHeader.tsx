import { useMediaQuery } from '@/hooks/useMediaQuery'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    onClick?(): void
}
const BaseHeader: React.FC<Props> = ({ onClick }) => {
    const {isMd} = useMediaQuery()

    return (
        <div className="h-14 flex items-center justify-between px-4 border-b-2 border-gray-100 shadow">
            <div className="flex items-center">
                {!isMd ? (
                    <div className="pr-2">
                        <button onClick={onClick}>
                            <FontAwesomeIcon size="lg" color="#fff" icon={faBars} />
                        </button>
                    </div>
                ): ''}

                <a className="text-white text-xl hover:underline">
                    U-lab
                </a>
            </div>

            <a className="text-white hover:underline" href="https://ulab-uu.com">
                サークル一覧
            </a>
        </div>
    )
}

export { BaseHeader }