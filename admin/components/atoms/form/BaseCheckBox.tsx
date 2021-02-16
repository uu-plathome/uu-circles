import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type CheckBoxItem = {
    value: string|number
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
const BaseCheckBox: React.FC<Props> = ({ label, id, note, items, required, error, onChange, cols = 3, mdCols = 3 }) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <BaseLabel
                label={label}
                note={note}
                required={required}
                id={id}
            />

            <div id={id} className={'grid'+` grid-cols-${cols}`+` md:grid-cols-${mdCols} gap-1`}>
                {items.map((checkBoxItem: CheckBoxItem) => {
                    return (
                        <label key={checkBoxItem.value} className="inline-flex items-center text-white">
                            <input 
                                type="checkbox" 
                                className="mb-1 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                value={checkBoxItem.value} 
                                checked={checkBoxItem.checked}
                                id={`${id}_${checkBoxItem.value}`}
                                onChange={onChange}
                            />
                            <span className="ml-2">{checkBoxItem.label}</span>
                        </label>
                )})}
            </div>

            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseCheckBox }
