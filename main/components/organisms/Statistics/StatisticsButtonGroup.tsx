import { FC } from 'react'
import { StatisticsButtonState } from './StatisticsButtonState'

const State = StatisticsButtonState
type State = StatisticsButtonState

type Props = {
  buttonState: State
  setButtonState(newVal: State): void
}
const StatisticsButtonGroup: FC<Props> = ({ buttonState, setButtonState }) => {
  return (
    <div style={{ width: 300 }} className="mb-8">
      <div className="flex">
        {/* 基本情報 */}
        <a
          className={`
              border
              border-gray-400
              rounded-l-md
              py-2
              px-2
              text-center
              text-sm
              ${buttonState === State.COMMON ? 'bg-blue-700' : 'bg-white'}
              ${buttonState === State.COMMON ? 'text-white' : 'bg-black'}
            `}
          style={{ width: 100 }}
          onClick={() => setButtonState(State.COMMON)}
        >
          <span>基本情報</span>
        </a>

        {/* 団体 */}
        <a
          className={`
              border
              border-gray-400
              py-2
              px-2
              text-center
              text-sm
              ${buttonState === State.CIRCLE ? 'bg-blue-700' : 'bg-white'}
              ${buttonState === State.CIRCLE ? 'text-white' : 'bg-black'}
            `}
          style={{ width: 100 }}
          onClick={() => setButtonState(State.CIRCLE)}
        >
          <span>団体</span>
        </a>

        {/* その他 */}
        <a
          className={`
              border
              border-gray-400
              rounded-r-md
              py-2
              px-2
              text-center
              text-sm
              ${buttonState === State.OTHER ? 'bg-blue-700' : 'bg-white'}
              ${buttonState === State.OTHER ? 'text-white' : 'bg-black'}
            `}
          style={{ width: 100 }}
          onClick={() => setButtonState(State.OTHER)}
        >
          <span>その他</span>
        </a>
      </div>
    </div>
  )
}

export { StatisticsButtonGroup }
