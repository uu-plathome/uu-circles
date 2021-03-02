import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { BaseLabel } from './BaseLabel'

const inputClass = `
    px-4
    py-2
    transition
    duration-300
    bg-white
    border
    border-gray-300
    rounded
    focus:border-transparent
    focus:outline-none
    focus:ring-4
    focus:ring-blue-200
`

interface Props {
    label: string
    id: string
    required?: boolean
    preview: string
    onDrop(acceptedFiles: any): void
    error: string
}
const BaseImageInput: FC<Props> = ({
    label,
    required,
    id,
    onDrop,
    preview,
    error,
}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    return (
        <div className="mb-4">
            <BaseLabel
                label={label}
                note={
                    isDragActive
                        ? 'Drop the files here ...'
                        : 'Drag n drop some files here, or click to select files'
                }
                required={required}
                id={id}
            />

            <div {...getRootProps()} className={inputClass}>
                <input {...getInputProps()} />

                <div className="text-center">
                    <img width="120" src={preview} alt={label} />
                </div>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : ''}
        </div>
    )
}

export { BaseImageInput }
