import dynamic from 'next/dynamic'
import { FC } from 'react'
import { SpButtonGroupProps } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons/MainUucircleTopButtonsSp'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

const PcButtonGroup = dynamic(() =>
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
  const { isLg } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isLg ? (
        <PcButtonGroup/>
      ) : (
        <SpButtonGroup />
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
