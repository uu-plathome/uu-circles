import { DatePicker } from '@/plugins/ReactDatepicker'
import { FC, InputHTMLAttributes } from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type Props = {
    id: string
    name: InputHTMLAttributes<any>['name']
    value: string|number
    expand?: boolean
    required?: boolean
    type?: InputHTMLAttributes<any>['type']
    placeholder?: InputHTMLAttributes<any>['placeholder']
    prefix?: string
    suffix?: string
    error?: string
    onChange(e: any): void
} & BaseLabelProps
const BaseDate: FC<Props> = ({
    label,
    id,
    name,
    note,
    value,
    required,
    prefix,
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
                    <p className="ml-1 text-white">{prefix}</p>
                ) : ''}

                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={value}
                    onChange={(date) => onChange({
                            target: {
                                value: date
                            }
                        }
                    )}
                    name={name}
                    locale="ja"
                    isClearable
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

export { BaseDate }
