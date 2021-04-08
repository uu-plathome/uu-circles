import { UseDateInput } from '@/hooks/useInput'
import { DatePicker } from '@/plugins/ReactDatepicker'
import { FC, InputHTMLAttributes } from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type Props = {
  id: string
  name: InputHTMLAttributes<any>['name']
  expand?: boolean
  required?: boolean
  placeholder?: InputHTMLAttributes<any>['placeholder']
  prefix?: string
  suffix?: string
} & BaseLabelProps &
  UseDateInput
const BaseDatetime: FC<Props> = ({
  label,
  id,
  name,
  note,
  toDateOrNull,
  required,
  prefix,
  suffix,
  error,
  onChangeDate,
}) => {
  return (
    <div className={`flex flex-col space-y-1 mb-4 ${error ? '' : 'pb-5'}`}>
      <BaseLabel label={label} note={note} required={required} id={id} />

      <div className="flex items-end">
        {prefix ? <p className="ml-1 text-white">{prefix}</p> : ''}

        <DatePicker
          dateFormat="yyyy/MM/dd HH:mm"
          timeInputLabel="時間:"
          showTimeSelect
          selected={toDateOrNull}
          name={name}
          locale="ja"
          autoComplete="off"
          isClearable
          timeIntervals={10}
          onChange={(date) => {
            console.info('BaseDatetime [UPDATE]', date)
            onChangeDate(date)
          }}
          onFocus={(e: any) => (e.target.readOnly = true)}
        />

        {suffix ? <p className="ml-1 text-white">{suffix}</p> : ''}
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

export { BaseDatetime }
