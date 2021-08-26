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
  const [colorList, setColorList] = useState<UtaColorList[]>(_colorList)

  useEffect(() => {
    // ランダムな順にする
    const candidateColorList = Object.values(UtaColorList)
    const randomColorList = candidateColorList.sort(() => Math.random() - 0.5)
    setColorList(randomColorList)
  }, [])

  // 表示数
  const displayNum = useMemo(() => {
    if (num <= 1) return 1
    if (num >= 5) return 5
    return num
  }, [num])

  const randKey = useMemo(() => Math.random().toString(36).slice(-8), [])

  return (
    <div
      className={`
      relative
      pt-0.5
      ${center ? 'text-center flex justify-center' : ''}
      `}
    >
      {Array(displayNum)
        .fill(0)
        .map((_, i) => (
          <Uta
            key={`${randKey}-${i}`}
            center={center}
            left={`${i * 18}px`}
            top={`2px`}
            isFirst={i === 0}
            color={colorList[i]}
          />
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
  return (
    <div className={isFirst || center ? '' : 'absolute'} style={{ left, top }}>
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
