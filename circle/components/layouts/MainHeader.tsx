import { YellowButton } from '@/components/atoms/buttons/YellowButton'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { FC } from 'react'

type Props = {
  onClick?(): void
}
const MainHeader: FC<Props> = ({ onClick }) => {
  return (
    <div className="border-b border-gray-300">
      <div className="bg-white">
        <div className="mx-auto" style={{ maxWidth: 700 }}>
          <div
            id="site_title"
            className="px-4 sm:px-0 xl:container flex justify-between items-center py-4"
          >
            <div className="flex items-center">
              <div className="md:hidden pr-2">
                <button onClick={onClick}>
                  <FontAwesomeIcon
                    size="lg"
                    color={Color.gray[400]}
                    icon={faBars}
                  />
                </button>
              </div>

              <h1 className="text-sm md:text-lg">
                <a href="https://uu-circles.com/">UU-circles</a>
              </h1>
            </div>

            <div className="flex items-center">
              <p className="mr-4 text-xs sm:text-sm">
                <a href="https://uu-circles.com/circle">
                  <span className="hidden sm:inline">サークルを</span>みつける
                </a>
              </p>

              <YellowButton href="https://uu-circles.com/guide/to-new-students">
                新入生へ
              </YellowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MainHeader }
