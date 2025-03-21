import dynamic from 'next/dynamic'
import { FC } from 'react'
import { SpButtonGroupProps } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsSp'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

const PcButtonGroup = dynamic<{}>(() =>
  import(
    '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsPc'
  ).then((mod) => mod.PcButtonGroup)
)
const SpButtonGroup = dynamic<SpButtonGroupProps>(() =>
  import(
    '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsSp'
  ).then((mod) => mod.SpButtonGroup)
)

const MainUucircleTopButtons: FC = ({}) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="flex justify-center py-10 bg-gray-100">
      {isMd ? <PcButtonGroup /> : <SpButtonGroup />}
    </div>
  )
}

export { MainUucircleTopButtons }
