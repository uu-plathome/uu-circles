import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import Compressor from 'compressorjs'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { createAdvertise } from '@/infra/api/advertise'
import { isCreateAdvertiseRequestValidationError } from '@/lib/types/api/CreateAdvertiseRequest'
import { CreateAdvertiseForm } from '@/components/organisms/form/Advertise/CreateAdvertiseForm'
import { putStorage } from '@/infra/api/storage'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'
import { AdvertiseType } from '@/lib/enum/api/AdvertiseType'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()

  const title = useStringInput('')
  const link = useStringInput('')
  const mainImageUrl = useStringInput('')
  const active = useBooleanInput(true)
  const advertiseType = useStringInput(AdvertiseType.COMMON)
  const publishTo = useDateInput(null, 'YYYY-MM-DD')
  const publishFrom = useDateInput(null, 'YYYY-MM-DD')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = await createAdvertise({
      type: 'CreateAdvertiseRequest',
      link: link.value,
      title: title.value,
      mainImageUrl: mainImageUrl.value,
      advertiseType: advertiseType.value,
      active: active.toBoolean,
      publishTo: publishTo.value,
      publishFrom: publishFrom.value,
    })

    if (isCreateAdvertiseRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      link.setErrors(data.errors.link)
      active.setErrors(data.errors.active)
      mainImageUrl.setErrors(data.errors.mainImageUrl)
      advertiseType.setErrors(data.errors.advertiseType)
      publishTo.setErrors(data.errors.publishTo)
      publishFrom.setErrors(data.errors.publishFrom)
      return
    }

    await router.push('/advertise')
  }

  const onDropMainImage = (acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async (e) => {
        new Compressor(file, {
          quality: 1.0,
          maxWidth: advertiseType.value === AdvertiseType.MAIN_TOP ? 800 : 2000,
          async success(result) {
            try {
              // Send the compressed image file to server with XMLHttpRequest.
              const data = await putStorage(result)
              if (isAdminPutStorageRequestValidationError(data)) {
                mainImageUrl.setErrors(data.errors.file)
              }
              mainImageUrl.set(data.url)
            } catch (e) {
              mainImageUrl.setError(
                'エラーが発生しました。別の画像を試してください。'
              )
            }
          },
          error(err) {
            console.error(err.message)
          },
        })
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div>
      <Head>
        <title>広告発行</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="広告発行">
          <div className="border-2 border-gray-800 px-2 py-4">
            <CreateAdvertiseForm
              onDropMainImage={onDropMainImage}
              onSubmit={onSubmit}
              form={{
                title,
                link,
                mainImageUrl,
                active,
                advertiseType,
                publishTo,
                publishFrom,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
