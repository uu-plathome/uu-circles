import { Circle } from '../types/model/Circle'
import { CircleNewJoy } from '../types/model/CircleNewJoy'

/**
 * 新歓タイトル
 *
 * @param circle
 * @param circleNewJoy
 * @returns
 */
export const newJoyTitleEntity = (
  circle: Circle,
  circleNewJoy: CircleNewJoy
) => {
  const circleName = circle.shortName || circle.name

  return {
    value: `${circleName} ${circleNewJoy.title}`,
  }
}
