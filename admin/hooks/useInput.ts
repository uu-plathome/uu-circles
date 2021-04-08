import { isDate, isDatetime } from '@/lib/utils/Date'
import { dayjs } from '@/plugins/Dayjs'
import { useMemo, useState } from 'react'

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
export const useDateInput = (
  initialValue?: Date,
  format = 'YYYY/MM/DD HH:mm',
  apiFormat = 'YYYY-MM-DD HH:mm'
) => {
  const initialValueStr = initialValue ? initialValue.toISOString() : ''
  const _useInput = useInput(initialValueStr)
  const set = (newVal?: Date | string) => {
    if (!newVal) {
      _useInput.set('')
      return
    }

    if (typeof newVal === 'string') {
      const formatNewVal = newVal.replace(/-/g, '/')

      if (isDate(formatNewVal) || isDatetime(formatNewVal)) {
        const val = dayjs(formatNewVal)
        _useInput.set(val.format(format))
        return
      }

      console.error(
        'useDateInputで予期せぬ値が入っています。 newValはstring型です。',
        newVal,
        formatNewVal
      )
      return
    }

    if (newVal instanceof Date) {
      const val = dayjs(newVal)
      _useInput.set(val.format(format))
      return
    }

    console.error('useDateInputで予期せぬ値が入っています。', newVal)
  }

  return {
    ..._useInput,
    set,
    onChangeDate: (date?: Date) => set(date),
    toDateOrNull: () => {
      return _useInput.value ? new Date(_useInput.value) : null
    },
    toFormatApi: useMemo(() => {
      if (!_useInput.value) {
        return null
      }

      return dayjs(_useInput.value).format(apiFormat)
    }, [_useInput, apiFormat]),
  }
}

export type UseStringInput = ReturnType<typeof useStringInput>
export type UseNumberInput = ReturnType<typeof useNumberInput>
export type UseBooleanInput = ReturnType<typeof useBooleanInput>
export type UseDateInput = ReturnType<typeof useDateInput>
