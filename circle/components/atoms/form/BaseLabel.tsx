import React from 'react'

export type Props = {
    label: string
    id: string
    note?: string
    required?: boolean
}
const BaseLabel: React.FC<Props> = ({ label, id, note, required }) => {
    return (
        <div className="flex items-center mb-1">
            <label
                className="font-semibold text-white mr-2"
                htmlFor={id}
                id={`base_label_${id}`}
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
    )
}

export { BaseLabel }
