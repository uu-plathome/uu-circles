import dynamic from 'next/dynamic'
import { FC } from 'react'
import { ComputedPagePositionIdNowLength } from '@/src/components/pages/Main/computedPagePositionIdNowLength'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

const PcButtonGroup = dynamic(() =>
  import(
    '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsPc'
  ).then((mod) => mod.PcButtonGroup)
)
const SpButtonGroup = dynamic(() =>
  import(
    '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsSp'
  ).then((mod) => mod.SpButtonGroup)
)

type Props = {
  pagePositionIdNowLength: ComputedPagePositionIdNowLength
  onChangeId: (id: string) => void
}
const MainUucircleTopButtons: FC<Props> = ({
  pagePositionIdNowLength,
  onChangeId,
}) => {
  const { isLg } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isLg ? (
        <PcButtonGroup
          pagePositionIdNowLength={pagePositionIdNowLength}
          onChangeId={onChangeId}
        />
      ) : (
        <SpButtonGroup />
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
