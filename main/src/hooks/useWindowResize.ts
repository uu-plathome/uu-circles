import { useEffect, useState } from 'react'

/**
 * 画面サイズを取得する
 *
 * @returns
 */
export const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(undefined)
  const [windowHeight, setWindowHeight] = useState<number>(undefined)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    width: windowWidth,
    height: windowHeight,
  }
}
