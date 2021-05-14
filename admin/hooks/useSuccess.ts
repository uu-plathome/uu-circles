import { time } from 'console'
import { useState } from 'react'

export const useSuccess = <T>(initialState: T) => {
  const [success, setSuccess] = useState<T>(initialState)
  const [timeoutId, setTimeoutId] =
    useState<ReturnType<typeof setTimeout>>(null)

  const newSetSuceess = (state: T, timeout?: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeout(null)
    }
    setSuccess(state)

    setTimeoutId(
      setTimeout(() => {
        setSuccess(initialState)
      }, timeout)
    )
  }

  return {
    success,
    setSuccess: newSetSuceess,
  }
}
