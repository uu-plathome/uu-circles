import { FC } from 'react'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/src/hooks/useInput'

export type Props = {
  form: {
    name: UseStringInput
    nameKana: UseStringInput
    shortName: UseStringInput
    prefixName: UseStringInput
  }
}
const NameEditCircleForm: FC<Props> = ({ form }) => {
  return (
    <div>
      <BaseTextField
        label="サークル名"
        name="name"
        id="name"
        required
        expand
        maxLength={50}
        {...form.name}
      />

      <BaseTextField
        label="サークル名(全角カナ)"
        name="nameKana"
        id="nameKana"
        expand
        maxLength={100}
        pattern="(?=.*?[\u30A1-\u30FC])[\u30A1-\u30FC\s]*"
        {...form.nameKana}
      />

      <BaseTextField
        label="サークル名(省略名)"
        name="shortName"
        id="shortName"
        expand
        maxLength={20}
        {...form.shortName}
      />

      <BaseTextField
        label="サークル名(肩書)"
        name="prefixName"
        id="prefixName"
        expand
        maxLength={50}
        {...form.prefixName}
      />
    </div>
  )
}

export { NameEditCircleForm }
