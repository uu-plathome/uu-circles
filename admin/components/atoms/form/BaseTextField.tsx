import { FC, InputHTMLAttributes } from 'react'
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
    value: string|number
    expand?: boolean
    required?: boolean
    type?: InputHTMLAttributes<any>['type']
    placeholder?: InputHTMLAttributes<any>['placeholder']
    prefix?: string|any
    suffix?: string
    error?: string
    pattern?: string
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
    pattern,
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

            <div className="flex items-end">
                {prefix ? (
                    <p className="ml-1 rounded whitespace-nowrap bg-gray-200 text-black-900 px-4 flex items-center" style={{ height: 42 }}>
                        <span>{prefix}</span>
                    </p>
                ) : ''}

                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={inputClass}
                    pattern={pattern}
                    style={{
                        width: expand ? '100%' : 'auto'
                    }}
                />

                {suffix ? (
                    <p className="ml-1 text-white">{suffix}</p>
                ) : ''}
            </div>
            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseTextField }
