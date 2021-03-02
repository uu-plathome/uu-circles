import React from 'react'

// md:text-gray-400
// md:bg-transparent
const noteClassName = `
    p-2
    text-sm 
    text-gray-600
    bg-gray-200
    rounded-lg 
`

export type Props = {
    label: string
    id: string
    note?: string
    required?: boolean
}
const BaseLabel: React.FC<Props> = ({ label, id, note, required }) => {
    return (
        <div className="mb-2">
            <div className="flex items-center mb-1">
                <label
                    className="text-white mr-2"
                    htmlFor={id}
                    id={`base_label_${id}`}
                >
                    {label}
                </label>
                {required ? (
                    <span className="text-white text-xs bg-red-600 rounded p-1">
                        必須
                    </span>
                ) : (
                    ''
                )}
            </div>

            <div>{note ? <p className={noteClassName}>※{note}</p> : ''}</div>
        </div>
    )
}

export { BaseLabel }
