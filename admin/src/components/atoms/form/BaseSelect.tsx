import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type SelectItem = {
  value: string | number
  label?: string
}

export type Props = {
  id: string
  name: string
  value: string | number
  required?: boolean
  placeholder?: string
  items: SelectItem[]
  error?: string
  onChange(e: any): void
} & BaseLabelProps
const BaseSelect: React.FC<Props> = ({
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
    <div className={`flex flex-col space-y-1 mb-4 ${error ? '' : 'pb-5'}`}>
      <BaseLabel label={label} note={note} required={required} id={id} />

      <select
        id={id}
        name={name}
        className="py-2 px-4 rounded border border-gray-300 focus:border-transparent focus:ring-4 focus:ring-blue-200 transition duration-300 appearance-none focus:outline-none"
        value={value}
        onChange={onChange}
      >
        {items.map((selectItem: SelectItem) => {
          return (
            <option
              key={`${id}-${selectItem.value || 'null'}`}
              value={selectItem.value}
            >
              {selectItem.label || selectItem.value}
            </option>
          )
        })}
      </select>

      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

export { BaseSelect }
