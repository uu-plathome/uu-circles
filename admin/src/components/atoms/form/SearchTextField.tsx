import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, InputHTMLAttributes } from 'react'

export type Props = {
  id: string
  name: InputHTMLAttributes<any>['name']
  value: string | number
  expand?: boolean
  required?: boolean
  type?: InputHTMLAttributes<any>['type']
  placeholder?: InputHTMLAttributes<any>['placeholder']
  error?: string
  maxLength?: number
  pattern?: string
  disabled?: boolean
  onChange(e: any): void
}
const SearchTextField: FC<Props> = ({
  id,
  name,
  value,
  type = 'text',
  placeholder,
  maxLength,
  pattern,
  expand,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative text-gray-600">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className="pr-12 pl-3 h-10 text-sm bg-white rounded-lg border-2 border-gray-300 focus:outline-none"
          pattern={pattern}
          disabled={disabled}
          style={{
            width: expand ? '100%' : 'auto',
          }}
        />

        <p
          className="flex absolute top-0 right-0 items-center px-1 md:px-2 mt-0.5 mr-2 md:mr-1 text-xs md:text-base whitespace-nowrap text-black-900"
          style={{ height: 34 }}
        >
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </p>
      </div>
    </div>
  )
}

export { SearchTextField }
