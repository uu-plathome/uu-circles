import Color from 'colors'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, InputHTMLAttributes, useState } from 'react'
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
  value: string | number
  required?: boolean
  type?: InputHTMLAttributes<any>['type']
  placeholder?: InputHTMLAttributes<any>['placeholder']
  error?: string
  pattern?: string
  disabled?: boolean
  onChange(e: any): void
} & BaseLabelProps
const SimplePasswordTextField: FC<Props> = ({
  label,
  id,
  name,
  note,
  value,
  required,
  placeholder,
  pattern,
  error,
  disabled,
  onChange,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col space-y-1 mb-4">
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={255}
          className={inputClass}
          pattern={pattern}
          disabled={disabled}
          style={{
            width: '100%',
          }}
        />

        <div className="absolute top-1/4 right-4">
          <button type="button" onClick={() => setVisible(!visible)}>
            <FontAwesomeIcon
              color={Color.black}
              icon={visible ? faEye : faEyeSlash}
              size="lg"
            />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <span> </span>
        )}
      </div>
    </div>
  )
}

export { SimplePasswordTextField }
