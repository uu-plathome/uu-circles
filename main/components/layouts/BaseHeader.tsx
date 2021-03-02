import { FC } from 'react'
import { YellowButton } from '@/components/atoms/button/YellowButton'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Color from 'colors'

type Props = {
  onClick?(): void
}
const BaseHeader: FC<Props> = ({ onClick }) => {
  const router = useRouter()

  return (
    <div className="border-b border-gray-300">
      <div className="bg-white">
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <div
            id="site_title"
            className="px-4 sm:px-0 xl:container flex justify-between items-center py-4"
          >
            <div className="flex items-center">
              <div className="md:hidden pr-4">
                <button onClick={onClick}>
                  <FontAwesomeIcon
                    size="lg"
                    color={Color.gray[400]}
                    icon={faBars}
                  />
                </button>
              </div>

              <h1 className="text-sm md:text-lg">
                {router.pathname === '/' ? (
                  <p>UU-circles</p>
                ) : (
                  <Link href="/">
                    <a>UU-circles</a>
                  </Link>
                )}
              </h1>
            </div>

            <div className="flex items-center">
              <p className="mr-4 text-xs sm:text-sm">
                <Link href="/circle">
                  <a>
                    <span className="hidden sm:inline">サークルを</span>みつける
                  </a>
                </Link>
              </p>

              <YellowButton href="/guide/to-new-students">
                新入生へ
              </YellowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BaseHeader }
