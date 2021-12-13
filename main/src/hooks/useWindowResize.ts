import { useEffect, useState } from 'react'

/**
 * 画面サイズを取得する
 *
 * @returns
 */
export const useWindowResize = (): {
  width: number
  height: number
} => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined
  )

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
    width: windowWidth || 0,
    height: windowHeight || 0,
  }
}
