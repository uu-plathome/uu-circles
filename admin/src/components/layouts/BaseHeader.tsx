import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { BaseContainer } from './BaseContainer'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import Color from '@/src/styles/colors'

type Props = {
  onClick?(): void
}
const BaseHeader: React.FC<Props> = ({ onClick }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="border-b-2 border-gray-100 shadow">
      <BaseContainer>
        <div className="flex justify-between items-center px-4 h-14">
          <div className="flex items-center">
            {!isMd ? (
              <div className="pr-2">
                <button onClick={onClick}>
                  <FontAwesomeIcon size="lg" color="#fff" icon={faBars} />
                </button>
              </div>
            ) : (
              ''
            )}

            <Link href="/">
              <p className="text-xl text-white hover:underline">UU-Manager</p>
            </Link>
          </div>

          <Link href="/logout">
            <p className="text-white hover:underline">
              <FontAwesomeIcon color={Color.red[600]} icon={faUser} />
              <span className="ml-2">ログアウト</span>
            </p>
          </Link>
        </div>
      </BaseContainer>
    </div>
  )
}

export { BaseHeader }
