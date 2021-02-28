import { useEffect, useState } from 'react'
import TailwindConfig from 'tailwind.config'
import { useWindowResize } from './useWindowResize'

const useScreenSize = () => {
  return {
    sm: Number(TailwindConfig.theme.screens.sm.replace(/[^0-9]/g, '')),
    md: Number(TailwindConfig.theme.screens.md.replace(/[^0-9]/g, '')),
    lg: Number(TailwindConfig.theme.screens.lg.replace(/[^0-9]/g, '')),
    xl: Number(TailwindConfig.theme.screens.xl.replace(/[^0-9]/g, '')),
    xl2: Number(TailwindConfig.theme.screens['2xl'].replace(/[^0-9]/g, '')),
  }
}

export const useMediaQuery = () => {
  const { width } = useWindowResize()
  const { sm, md, lg, xl, xl2 } = useScreenSize()
  const [isSm, setIsSm] = useState(false)
  const [isMd, setIsMd] = useState(false)
  const [isLg, setIsLg] = useState(false)
  const [isXl, setIsXl] = useState(false)
  const [isXl2, setIsXl2] = useState(false)

  useEffect(() => {
    setIsSm(width > sm)
    setIsMd(width > md)
    setIsLg(width > lg)
    setIsXl(width > xl)
    setIsXl2(width > xl2)
  })

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    isXl2,
  }
}
