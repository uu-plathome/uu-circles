import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type CheckBoxItem = {
  value: string | number
  checked: boolean
  label?: string
}

export type Props = {
  id: string
  name: string
  required?: boolean
  placeholder?: string
  items: CheckBoxItem[]
  error?: string
  onChange(e: any): void
  cols?: number
  mdCols?: number
} & BaseLabelProps
const BaseCheckBox: React.FC<Props> = ({
  label,
  id,
  note,
  items,
  required,
  error,
  onChange,
  cols = 2,
  mdCols = 3,
}) => {
  const widthClass = getWidthClass(cols)
  const mdWidthClass = 'md:' + getWidthClass(mdCols)

  return (
    <div className="mb-4">
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div id={id} className="flex flex-wrap">
        {items.map((checkBoxItem: CheckBoxItem) => {
          return (
            <label
              key={checkBoxItem.value}
              className={`${widthClass} ${mdWidthClass} inline-flex items-center text-black mb-2`}
            >
              <input
                type="checkbox"
                className="mb-1 text-indigo-600 rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                value={checkBoxItem.value}
                checked={checkBoxItem.checked}
                id={`${id}_${checkBoxItem.value}`}
                onChange={onChange}
              />
              <span className="ml-2">{checkBoxItem.label}</span>
            </label>
          )
        })}
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

const getWidthClass = (cols: number) => {
  if (cols === 1) {
    return 'w-full'
  }

  if (cols === 2) {
    return 'w-1/2'
  }

  if (cols === 3) {
    return 'w-1/3'
  }

  if (cols === 4) {
    return 'w-1/4'
  }

  console.error(`不適切なcolsが指定されてます。 cols=${cols}`)
}

export { BaseCheckBox }
