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
    value: string|number
    required?: boolean
    placeholder?: string
    items: CheckBoxItem[]
    error?: string
    onChange(e: any): void
} & BaseLabelProps
const BaseSelect: React.FC<Props> = ({ label, id, note, items, required, error, onChange }) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <BaseLabel
                label={label}
                note={note}
                required={required}
                id={id}
            />

            <div id={id}>
                {items.map((checkBoxItem: CheckBoxItem) => {
                    return (
                        <div key={checkBoxItem.value}>
                            <label className="inline-flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox" 
                                    value={checkBoxItem.value} 
                                    checked={checkBoxItem.checked}
                                    id={`${id}_${checkBoxItem.value}`}
                                    onChange={onChange}
                                />
                                <span className="ml-2">{checkBoxItem.label}</span>
                            </label>
                        </div>
                )})}
            </div>

            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseSelect }
