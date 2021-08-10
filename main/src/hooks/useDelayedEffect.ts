import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

/**
 * 遅延評価されるuseEffect
 *
 * @param { EffectCallback } effect
 * @param { DependencyList } deps
 * @param { Number } delayTime
 */
export const useDelayedEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  delayTime = 1000
): void => {
  const [waiting, setWaiting] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    window.clearTimeout(timer.current)

    setWaiting(true)

    timer.current = window.setTimeout(() => {
      setWaiting(false)
    }, delayTime)
  }, deps)

  useEffect(() => {
    if (!waiting) {
      effect()
    }
  }, [waiting])
}
