import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { BaseContainer } from './BaseContainer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Color from 'colors'

type Props = {
  onClick?(): void
}
const BaseHeader: React.FC<Props> = ({ onClick }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="border-b-2 border-gray-100 shadow">
      <BaseContainer>
        <div className="h-14 flex items-center justify-between px-4">
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
              <a className="text-white text-xl hover:underline">UU-Manager</a>
            </Link>
          </div>

          <Link href="/logout">
            <a className="text-white hover:underline">
              <FontAwesomeIcon color={Color.red[600]} icon={faUser} />
              <span className="ml-2">ログアウト</span>
            </a>
          </Link>
        </div>
      </BaseContainer>
    </div>
  )
}

export { BaseHeader }
