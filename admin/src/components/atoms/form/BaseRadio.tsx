import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

type SelectItem = {
  value: string
  label?: string
}

export type Props = {
  id: string
  name: string
  value: string
  required?: boolean
  items: SelectItem[]
  error?: string
  onChange(e: any): void
} & BaseLabelProps
const BaseRadio: React.FC<Props> = ({
  label,
  id,
  name,
  note,
  value,
  items,
  required,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4 space-y-1">
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div>
        {items.map((selectItem: SelectItem) => {
          return (
            <div key={`${id}-${selectItem.value || 'null'}`}>
              <label htmlFor={`${id}_${value}`}>
                {selectItem.label || selectItem.value}
              </label>

              <input
                id={`${id}_${value}`}
                name={name}
                className="py-2 px-4 rounded border border-gray-300 focus:border-transparent focus:ring-4 focus:ring-blue-200 transition duration-300 focus:outline-none"
                type="radio"
                value={selectItem.value}
                checked={value === selectItem.value}
                onChange={onChange}
              />
            </div>
          )
        })}
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

export { BaseRadio }
