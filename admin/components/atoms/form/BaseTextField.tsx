import { FC } from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type Props = {
    id: string
    name: string
    value: string|number
    required?: boolean
    type?: string
    placeholder?: string
    suffix?: string
    error?: string
    onChange(e: any): void
} & BaseLabelProps
const BaseTextField: FC<Props> = ({
    label,
    id,
    name,
    note,
    value,
    type = 'text',
    required,
    placeholder,
    suffix,
    error,
    onChange
}) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <BaseLabel
                label={label}
                note={note}
                required={required}
                id={id}
            />

            <div className="flex">
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

                {suffix ? (
                    <p className="ml-1">{suffix}</p>
                ) : ''}
            </div>
            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseTextField }
