import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  if (process.browser) {
    // ブラウザ側で使う処理
    // console.log('')
    // const scrollElement = document.getElementById('top-button-scroll')
    // scrollElement.scrollTop = 300
  }
  return (
    <div className="flex justify-center">
      <nav
        className="horizontal_scroll md:flex md:justify-center"
        style={{ margin: '0 auto!important' }}
        id="top-button-scroll"
      >
        <button
          className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
          style={{
            // backgroundColor: '#faf6e3',
            width: '280px',
            height: '65px',
          }}
        >
          <Link href="">
            <a
              className="text-gray-900 text-2xl"
              style={
                {
                  // borderBottom: '3px solid #66c7eb',
                }
              }
            >
              <img src="/images/tobButtons/Rectangle15.png"></img>
            </a>
          </Link>
        </button>
        <button
          className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
          style={{
            // backgroundColor: '#faf6e3',
            width: '280px',
            height: '65px',
          }}
        >
          <Link href="">
            <a
              className="text-gray-900 text-2xl"
              style={
                {
                  // borderBottom: '3px solid #66c7eb',
                }
              }
            >
              <img src="/images/tobButtons/shinkan1.png"></img>
            </a>
          </Link>
        </button>
        <button
          className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
          style={{
            // backgroundColor: '#faf6e3',
            width: '280px',
            height: '65px',
          }}
        >
          <Link href="">
            <a
              className="text-gray-900 text-2xl"
              style={
                {
                  // borderBottom: '3px solid #66c7eb',
                }
              }
            >
              <img src="/images/tobButtons/discordBunner1.png"></img>
            </a>
          </Link>
        </button>
      </nav>
    </div>
  )
}

export { MainUucircleTopButtons }
