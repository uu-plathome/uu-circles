import { useDelayedEffect } from '@/hooks/useDelayedEffect'
import { FC, InputHTMLAttributes, useState } from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

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
  name: InputHTMLAttributes<any>['name']
  value: string | number
  expand?: boolean
  required?: boolean
  type?: InputHTMLAttributes<any>['type']
  placeholder?: InputHTMLAttributes<any>['placeholder']
  prefix?: string | any
  suffix?: string
  error?: string
  maxLength?: number
  pattern?: string
  disabled?: boolean
  onChange(e: any): void
} & BaseLabelProps
const BaseTextField: FC<Props> = ({
  label,
  id,
  name,
  note,
  value,
  expand,
  type = 'text',
  required,
  placeholder,
  prefix,
  maxLength,
  pattern,
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
    <div className="flex flex-col space-y-1 mb-4">
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div className="flex items-end">
        {prefix ? (
          <p
            className="rounded whitespace-nowrap bg-gray-200 text-black-900 px-2 md:px-4 flex items-center text-xs md:text-base"
            style={{ height: 42 }}
          >
            <span>{prefix}</span>
          </p>
        ) : (
          ''
        )}

        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className={inputClass}
          pattern={pattern}
          disabled={disabled}
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

export { BaseTextField }
