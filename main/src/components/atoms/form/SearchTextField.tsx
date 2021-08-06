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
          maxLength={255}
          className="border-2 border-gray-300 bg-white h-10 pl-3 pr-12 rounded-lg text-sm focus:outline-none"
          pattern={pattern}
          disabled={disabled}
          style={{
            width: expand ? '100%' : 'auto',
          }}
        />

        <p
          className="absolute right-0 top-0 mt-0.5 mr-2 md:mr-1 whitespace-nowrap text-black-900 px-1 md:px-2 flex items-center text-xs md:text-base"
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
