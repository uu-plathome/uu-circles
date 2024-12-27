import Link from 'next/link'
import React from 'react'
import { BaseContainer } from './BaseContainer'

const AuthHeader: React.FC = () => {
  return (
    <div className="border-b-2 border-gray-100 shadow">
      <BaseContainer>
        <div className="flex h-14 items-center justify-between px-4 ">
          <div className="flex items-center">
            <h1 className="text-xl text-white">UU-Manager</h1>
          </div>

          <Link href="/login">
            <p className="text-white hover:underline">ログイン</p>
          </Link>
        </div>
      </BaseContainer>
    </div>
  )
}

export { AuthHeader }
