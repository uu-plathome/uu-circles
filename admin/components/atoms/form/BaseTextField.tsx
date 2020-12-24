import React from 'react'

type Props = {
    label: string
    id: string
    name: string
    value: string
    onChange(e: any): void
}
const BaseTextField: React.FC<Props> = ({ label, id, name, value, onChange }) => {
    return (
        <div className="flex flex-col space-y-1 mb-2">
            <label
                className="text-sm font-semibold text-white"
                htmlFor={id}
            >{label}</label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
        </div>
    )
}

export { BaseTextField }
