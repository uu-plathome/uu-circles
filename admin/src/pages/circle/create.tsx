import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/src/components/layouts/BaseContainer'
import { BaseWrapper } from '@/src/components/layouts/BaseWrapper'
import { CreateCircleForm } from '@/src/components/organisms/form/Circle/CreateCircleForm'
import { useDelayedEffect } from '@/src/hooks/useDelayedEffect'
import { useStringInput } from '@/src/hooks/useInput'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { createCircle } from '@/src/lib/infra/api/circle'
import {
  CreateCircleFormRequest,
  isCreateCircleFormRequestValidationError,
} from '@/src/lib/types/api/CreateCircleFormRequest'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const name = useStringInput('')
  const slug = useStringInput('')

  useDelayedEffect(
    () => {
      slug.set(slug.value.toLowerCase())
    },
    [slug.value],
    1000
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createCircle({
      type: 'CreateCircleFormRequest',
      name: name.value,
      slug: slug.value.toLowerCase(),
      release: true,
    } as CreateCircleFormRequest)

    if (isCreateCircleFormRequestValidationError(data)) {
      name.setErrors(data.errors.name)
      slug.setErrors(data.errors.slug)
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push('/circle')
  }

  return (
    <div>
      <Head>
        <title>サークル新規作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <SubmitLoading isOpen={isOpen} />

      <BaseContainer>
        <BaseWrapper title="サークル新規作成">
          <div className="border-2 border-gray-800 py-4 px-2">
            <CreateCircleForm
              onSubmit={onSubmit}
              form={{
                name,
                slug,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
