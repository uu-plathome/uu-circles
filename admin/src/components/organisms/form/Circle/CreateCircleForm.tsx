import { FC, FormEvent } from 'react'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { UseStringInput } from '@/src/hooks/useInput'

type Props = {
  onSubmit(e: FormEvent<HTMLFormElement>): void
  form: {
    name: UseStringInput
    slug: UseStringInput
  }
}
const CreateCircleForm: FC<Props> = ({ onSubmit, form }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <BaseTextField
          label="サークル名"
          name="name"
          id="name"
          maxLength={50}
          required
          {...form.name}
        />

        <BaseTextField
          label="URLのパス"
          name="slug"
          id="slug"
          placeholder="u-lab"
          maxLength={50}
          prefix="uu-circle.com/circle/"
          note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
          expand
          {...form.slug}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <GreenButton type="submit">進む</GreenButton>
      </div>
    </form>
  )
}

export { CreateCircleForm }
