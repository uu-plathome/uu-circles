import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}
const MainUucircleBottomButtons: FC<Props> = () => {
  return (
    <nav className="horizontal_scroll">
      <button
        className="w-screen rounded px-5 py-6 m-10 focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{ backgroundColor: '#c4c4c4' }}
      >
        <Link href="">
          <a className="text-white text-3xl">新生活の初め方</a>
        </Link>
      </button>
      <button
        className="w-screen rounded px-5 py-6 m-10   focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{ backgroundColor: '#fb8f8f' }}
      >
        <Link href="">
          <a className="text-white text-3xl">先輩が教えるおすすめバイト</a>
        </Link>
      </button>
      <button
        className="w-screen rounded px-5 py-6 m-10 focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        style={{ backgroundColor: '#c4c4c4' }}
      >
        <Link href="">
          <a className="text-white text-3xl">自転車ってどこで買うの？</a>
        </Link>
      </button>
    </nav>
  )
}

export { MainUucircleBottomButtons }
