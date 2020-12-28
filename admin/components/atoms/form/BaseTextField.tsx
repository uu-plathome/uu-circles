import React from 'react'

type Props = {
    label: string
    id: string
    name: string
    value: string
    note?: string
    required?: boolean
    placeholder?: string
    error?: string
    onChange(e: any): void
}
const BaseTextField: React.FC<Props> = ({ label, id, name, note, value, required, placeholder, error, onChange }) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <div className="flex items-center mb-1">
                <label
                    className="font-semibold text-white mr-2"
                    htmlFor={id}
                >{label}</label>
                {required ? (
                    <span className="text-white text-xs bg-red-600 rounded p-1">
                        必須
                    </span>
                ) : ''}
                {note ? (
                    <p className="text-sm text-gray-400">※{note}</p>
                ) : ''}
            </div>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseTextField }
