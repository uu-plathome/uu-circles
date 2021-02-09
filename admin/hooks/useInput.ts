import { isDate, isDatetime } from '@/lib/utils/Date'
import { useState } from 'react'

export const useInput = <T extends string>(initialValue: T) => {
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

export const useStringInput = (initialValue: string) => {
  const _useInput = useInput(initialValue)

  return {
    ..._useInput,
    set: (newVal?: string) => {
      _useInput.set(newVal || '')
    },
  }
}
export const useNumberInput = (initialValue: number) => {
  const initialValueStr = String(initialValue)
  const _useInput = useInput(initialValueStr)

  return {
    ..._useInput,
    set: (newVal?: number) => _useInput.set(String(newVal || 0)),
    toNumber: Number(_useInput.value),
  }
}
export const useBooleanInput = (initialValue: boolean) => {
  const initialValueStr = initialValue === true ? 'true' : 'false'
  const _useInput = useInput<'true' | 'false'>(initialValueStr)

  return {
    ..._useInput,
    set: (newVal: boolean) => _useInput.set(newVal === true ? 'true' : 'false'),
    toBoolean: _useInput.value === 'true',
  }
}
export const useDateInput = (initialValue?: Date) => {
  const initialValueStr = initialValue ? initialValue.toISOString() : ''
  const _useInput = useInput(initialValueStr)
  const set = (newVal?: Date | string) => {
    if (typeof newVal === 'string' && (isDate(newVal) || isDatetime(newVal))) {
      _useInput.set(newVal)
      return
    }

    if (newVal instanceof Date) {
      _useInput.set(newVal.toISOString())
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
