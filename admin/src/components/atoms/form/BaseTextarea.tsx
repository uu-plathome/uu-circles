import { FC, TextareaHTMLAttributes, useState } from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'
import { useDelayedEffect } from '@/src/hooks/useDelayedEffect'

const inputClass = `
    px-4
    py-2
    transition
    duration-300
    border
    border-gray-300
    rounded
    focus:border-transparent
    focus:outline-none
    focus:ring-4
    focus:ring-blue-200
`

export type Props = {
  id: string
  name: TextareaHTMLAttributes<any>['name']
  value: string | number
  expand?: boolean
  required?: boolean
  placeholder?: TextareaHTMLAttributes<any>['placeholder']
  prefix?: string | any
  suffix?: string
  error?: string
  maxLength?: number
  disabled?: boolean
  onChange(e: any): void
} & BaseLabelProps
const BaseTextarea: FC<Props> = ({
  label,
  id,
  name,
  note,
  value,
  expand,
  required,
  placeholder,
  prefix,
  maxLength,
  suffix,
  error,
  disabled,
  onChange,
}) => {
  const [counter, setCounter] = useState<number>(0)

  useDelayedEffect(
    () => {
      if (typeof value === 'number') {
        setCounter(value ? String(value).length : 0)
      } else {
        setCounter(value ? value.length : 0)
      }
    },
    [value],
    1000
  )

  return (
    <div className="mb-4 flex flex-col space-y-1">
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div className="flex items-end">
        {prefix ? (
          <p
            className="text-black-900 flex items-center whitespace-nowrap rounded bg-gray-200 px-2 text-xs md:px-4 md:text-base"
            style={{ height: 42 }}
          >
            <span>{prefix}</span>
          </p>
        ) : (
          ''
        )}

        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className={inputClass}
          disabled={disabled}
          rows={maxLength ? Math.ceil(maxLength / 40) : 4}
          style={{
            width: expand ? '100%' : 'auto',
          }}
        />

        {suffix ? <p className="ml-1 text-white">{suffix}</p> : ''}
      </div>

      <div className="flex justify-between">
        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <span> </span>
        )}
        <p className="text-sm text-white">
          <span>{counter}</span>
          {maxLength ? <span> / {maxLength}</span> : ''}
        </p>
      </div>
    </div>
  )
}

export { BaseTextarea }
