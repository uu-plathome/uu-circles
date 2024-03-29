import { SetStateAction, Dispatch, useState } from 'react'
import { isDate, isDatetime } from '@/src/lib/utils/Date'
import { dayjs } from '@/src/plugins/Dayjs'

export const useInput = <T extends string>(
  initialValue: T
): {
  value: T
  set: Dispatch<SetStateAction<T>>
  onChange: (e: any) => void
  error: string
  setError: (newError?: string) => void
  errors: string[]
  setErrors: (newErrors?: string[]) => void
} => {
  const [state, set] = useState<T>(initialValue)
  const [error, setError] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  return {
    value: state,
    set,
    onChange: (e: any) => set(e.target.value),
    error,
    setError: (newError?: string) => {
      if (!newError) {
        setError('')
        return
      }

      setError(newError)
    },
    errors,
    setErrors: (newErrors?: string[]) => {
      if (!newErrors || (Array.isArray(newErrors) && newErrors.length === 0)) {
        setError('')
        setErrors([])
        return
      }

      setError(newErrors[0])
      setErrors(newErrors)
      return
    },
  }
}

export const useStringInput = (
  initialValue: string
): {
  value: string
  set: (newVal?: string) => void
  onChange: (e: any) => void
  error: string
  setError: (newError?: string) => void
  errors: string[]
  setErrors: (newErrors?: string[]) => void
} => {
  const _useInput = useInput(initialValue)

  return {
    ..._useInput,
    set: (newVal?: string) => {
      _useInput.set(newVal || '')
    },
  }
}
export const useNumberInput = (
  initialValue: number
): {
  value: string
  set: (newVal?: number) => void
  onChange: (e: any) => void
  error: string
  setError: (newError?: string) => void
  errors: string[]
  setErrors: (newErrors?: string[]) => void
  toNumber: number
} => {
  const initialValueStr = String(initialValue)
  const _useInput = useInput(initialValueStr)

  return {
    ..._useInput,
    set: (newVal?: number) => _useInput.set(String(newVal || 0)),
    toNumber: Number(_useInput.value),
  }
}
export const useBooleanInput = (
  initialValue: boolean
): {
  value: string
  set: (newVal: boolean) => void
  onChange: (e: any) => void
  error: string
  setError: (newError?: string) => void
  errors: string[]
  setErrors: (newErrors?: string[]) => void
  toBoolean: boolean
} => {
  const initialValueStr = initialValue === true ? 'true' : 'false'
  const _useInput = useInput<'true' | 'false'>(initialValueStr)

  return {
    ..._useInput,
    set: (newVal: boolean) => _useInput.set(newVal === true ? 'true' : 'false'),
    toBoolean: _useInput.value === 'true',
  }
}
export const useDateInput = (
  initialValue?: Date,
  format = 'YYYY-MM-DD HH:mm'
): {
  value: string
  set: (newVal: Date | string) => void
  onChange: (e: any) => void
  error: string
  setError: (newError?: string) => void
  errors: string[]
  setErrors: (newErrors?: string[]) => void
  onChangeDate: (date?: Date) => void
  toDateOrNull: Date | null
} => {
  const initialValueStr = initialValue ? initialValue.toISOString() : ''
  const _useInput = useInput(initialValueStr)
  const set = (newVal?: Date | string) => {
    if (typeof newVal === 'string' && (isDate(newVal) || isDatetime(newVal))) {
      const val = dayjs(newVal)
      _useInput.set(val.format(format))
      return
    }

    if (newVal instanceof Date) {
      const val = dayjs(newVal)
      _useInput.set(val.format(format))
      return
    }

    _useInput.set('')
  }

  return {
    ..._useInput,
    set,
    onChangeDate: (date?: Date) => set(date),
    toDateOrNull: _useInput.value ? new Date(_useInput.value) : null,
  }
}

export type UseStringInput = ReturnType<typeof useStringInput>
export type UseNumberInput = ReturnType<typeof useNumberInput>
export type UseBooleanInput = ReturnType<typeof useBooleanInput>
export type UseDateInput = ReturnType<typeof useDateInput>
