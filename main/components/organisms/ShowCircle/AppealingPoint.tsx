import { FC, Fragment } from "react";
import { Circle } from "@/lib/types/model/Circle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Color from 'colors'

type Props = {
    circle: Circle
}
const AppealingPoint: FC<Props> = ({ circle }) => {
    return (
        <Fragment>
            {circle.appealingPoint1 || circle.appealingPoint2 || circle.appealingPoint3 ? (
                <div className="pt-10">
                    <h2 className="text-lg text-center mb-6 md:text-left">アピールポイント</h2>
    
                    <div className="flex justify-center md:justify-start px-6 md:px-0">
                        <div className="bg-white rounded md:w-full px-4 md:pr-6 md:pl-6 py-8 w-full">
                            <ul>
                                {circle.appealingPoint1 ? (
                                    <li className="flex mb-2 text-sm md:text-base">
                                        <FontAwesomeIcon
                                            className="mt-1"
                                            size="xs"
                                            color={ Color.yellow[500] }
                                            icon={ faCircle }
                                        />
                                        <p className="ml-4">{ circle.appealingPoint1 }</p>
                                    </li>
                                ) : ''}
                                {circle.appealingPoint2 ? (
                                    <li className="flex mb-2 text-sm md:text-base">
                                        <FontAwesomeIcon
                                            className="mt-1"
                                            size="xs"
                                            color={ Color.yellow[500] }
                                            icon={ faCircle }
                                        />
                                        <p className="ml-4">{ circle.appealingPoint2 }</p>
                                    </li>
                                ) : ''}
                                {circle.appealingPoint3 ? (
                                    <li className="flex mb-2 text-sm md:text-base">
                                        <FontAwesomeIcon
                                            className="mt-1"
                                            size="xs"
                                            color={ Color.yellow[500] }
                                            icon={ faCircle }
                                        />
                                        <p className="ml-4">{ circle.appealingPoint3 }</p>
                                    </li>
                                ) : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : ''}
        </Fragment>
    )
}

export { AppealingPoint }
