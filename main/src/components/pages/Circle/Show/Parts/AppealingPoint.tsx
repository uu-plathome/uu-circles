import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, Fragment } from 'react'
import { ShowCircleTitle } from './ShowCircleTitle'
import { Circle } from '@/src/lib/types/model/Circle'
import Color from '@/src/styles/colors'

type Props = {
  circle: Circle
}
const AppealingPoint: FC<Props> = ({ circle }) => {
  return (
    <Fragment>
      {circle.appealingPoint1 ||
      circle.appealingPoint2 ||
      circle.appealingPoint3 ? (
        <div className="pt-10">
          <ShowCircleTitle>{circle.name}について</ShowCircleTitle>

          <div className="flex justify-center px-6 md:justify-start md:px-0">
            <div className="p-4 w-full bg-white rounded-2xl md:px-6 md:w-full md:rounded">
              <ul>
                {circle.appealingPoint1 ? (
                  <li className="flex mb-2 text-sm md:text-base">
                    <FontAwesomeIcon
                      className="mt-1"
                      size="xs"
                      color={Color.yellow[500]}
                      icon={faCircle}
                    />
                    <p className="ml-4">{circle.appealingPoint1}</p>
                  </li>
                ) : (
                  ''
                )}
                {circle.appealingPoint2 ? (
                  <li className="flex mb-2 text-sm md:text-base">
                    <FontAwesomeIcon
                      className="mt-1"
                      size="xs"
                      color={Color.yellow[500]}
                      icon={faCircle}
                    />
                    <p className="ml-4">{circle.appealingPoint2}</p>
                  </li>
                ) : (
                  ''
                )}
                {circle.appealingPoint3 ? (
                  <li className="flex mb-2 text-sm md:text-base">
                    <FontAwesomeIcon
                      className="mt-1"
                      size="xs"
                      color={Color.yellow[500]}
                      icon={faCircle}
                    />
                    <p className="ml-4">{circle.appealingPoint3}</p>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  )
}

export { AppealingPoint }
