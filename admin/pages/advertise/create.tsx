import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { createAdvertise } from '@/infra/api/advertise'
import { isCreateAdvertiseRequestValidationError } from '@/lib/types/api/CreateAdvertiseRequest'
import { CreateAdvertiseForm } from '@/components/organisms/form/Advertise/CreateAdvertiseForm'
import { putStorage } from '@/infra/api/storage'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'

const CreatePage: NextPage = () => {
    const router = useRouter()

    const title = useStringInput('')
    const mainImageUrl = useStringInput('')
    const active = useBooleanInput(true)
    const publishTo = useStringInput('')
    const publishFrom = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createAdvertise({
            type: 'CreateAdvertiseRequest',
            title: title.value,
            mainImageUrl: mainImageUrl.value,
            active: active.toBoolean,
            publishTo: publishTo.value,
            publishFrom: publishFrom.value,
        })

        if (isCreateAdvertiseRequestValidationError(data)) {
            title.setErrors(data.errors.title)
            active.setErrors(data.errors.active)
            mainImageUrl.setErrors(data.errors.mainImageUrl)
            publishTo.setErrors(data.errors.publishTo)
            publishFrom.setErrors(data.errors.publishFrom)
            return
        }

        await router.push('/advertise')
    }

    const onDropMainImage = (acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async (e) => {
                try {
                    const data = await putStorage(file)
    
                    if (isAdminPutStorageRequestValidationError(data)) {
                        mainImageUrl.setErrors(data.errors.file)
                    }
                    mainImageUrl.set(data.url)
                } catch (e) {
                    mainImageUrl.setError('エラーが発生しました。別の画像を試してください。')
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="広告発行"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <CreateAdvertiseForm 
                            onDropMainImage={onDropMainImage}
                            onSubmit={onSubmit}
                            form={{
                                title,
                                mainImageUrl,
                                active,
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