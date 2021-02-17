import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  return (
    <nav className="horizontal_scroll">
      <button
        className="w-screen rounded px-5 py-3 m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{
          backgroundColor: '#faf6e3',
          width: '280px',
          height: '65px',
        }}
      >
        <Link href="">
          <a
            className="text-gray-900 text-2xl"
            style={{
              borderBottom: '3px solid #66c7eb',
            }}
          >
            初めての人のための使い方
            <img src=""></img>
          </a>
        </Link>
      </button>
      <button
        className="w-screen rounded px-5 py-3 m-10   focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{
          backgroundColor: '#fb8f8f',
          width: '280px',
          height: '65px',
        }}
      >
        <Link href="">
          <a className="text-white text-2xl">今日の新歓</a>
        </Link>
      </button>
      <button
        className="w-screen rounded px-5 py-3 m-10 focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{
          backgroundColor: '#c4c4c4',
          width: '280px',
          height: '65px',
        }}
      >
        <Link href="">
          <a className="text-white text-2xl">メディアサイト</a>
        </Link>
      </button>
    </nav>
  )
}

export { MainUucircleTopButtons }
