import Image from 'next/image'
import { useEffect, useMemo, useState, FC } from 'react'
import { UtaColorList, UtaImagePath } from './utaColorList'

type UtasProps = {
  num: number
  center?: boolean
  colorList?: UtaColorList[]
}
const Utas: FC<UtasProps> = ({
  num = 1,
  center,
  colorList: _colorList = [],
}) => {
  const [isOnList, setIsOnList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([])

  const colorList: UtaColorList[] = useMemo(() => {
    if (_colorList && _colorList.length > 0) {
      return _colorList
    }

    // ランダムな順にする
    const candidateColorList = Object.values(UtaColorList)
    const randomColorList = candidateColorList.sort(() => Math.random() - 0.5)
    return randomColorList
  }, [])

  // 表示数
  const displayNum = useMemo(() => {
    if (num <= 1) return 1
    if (num >= 7) return 7
    return num
  }, [num])

  useEffect(() => {
    for (let i = 0; i < displayNum; i++) {
      const _timeoutId = setTimeout(() => {
        const newIsOnList = isOnList.map((isOn, index) => {
          return index <= i
        })
        setIsOnList(newIsOnList)
      }, 300 * (i + 1))

      setTimeoutIds([...timeoutIds, _timeoutId])
    }

    return () => {
      timeoutIds.forEach((timeoutId) => {
        clearTimeout(timeoutId)
      })
    }
  }, [displayNum])

  const randKey = useMemo(() => Math.random().toString(36).slice(-8), [])

  return (
    <div
      className={`
      relative
      pt-0.5
      transition
      ${center ? 'text-center flex justify-center' : ''}
      `}
    >
      {Array(displayNum)
        .fill(0)
        .map((_, i) => (
          <div
            key={`${randKey}-${i}`}
            style={{
              transition: '1s',
              opacity: isOnList[i] ? 1 : 0,
              width: isOnList[i] ? '24px' : 0,
            }}
          >
            <Uta
              center={center}
              left={`${i * 18}px`}
              top={`2px`}
              isFirst={i === 0}
              color={colorList[i]}
            />
          </div>
        ))}
    </div>
  )
}

type UtaProps = {
  isFirst: boolean
  center: boolean
  left: number | string
  top: number | string
  color?: UtaColorList
}
const Uta: FC<UtaProps> = ({
  isFirst,
  center,
  left,
  top,
  color = UtaColorList.BLUE,
}) => {
  const [isOn, setIsOn] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(undefined)

  useEffect(() => {
    setInterval(() => {
      const randInt = Math.floor(Math.random() * 5)

      if (randInt === 0) {
        setIsOn(true)

        const _timeoutId = setTimeout(() => {
          setIsOn(false)
        }, 1000)
        setTimeoutId(_timeoutId)
      }

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }, 1500)
  }, [])

  return (
    <div
      className={`
      ${isFirst || center ? '' : 'absolute'}
      transition
      ${isOn ? 'transform -translate-y-2' : ''}
    `}
      style={{ left, top, height: 28 }}
    >
      <Image
        className="rounded-full"
        width="24"
        height="24"
        src={UtaImagePath[color]}
        alt="一人目"
      />
    </div>
  )
}

export { Utas }
