import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { createAdvertise, showAdvertise, updateAdvertise } from '@/infra/api/advertise'
import { isCreateAdvertiseRequestValidationError } from '@/lib/types/api/CreateAdvertiseRequest'
import { EditAdvertiseForm } from '@/components/organisms/form/Advertise/EditAdvertiseForm'
import { putStorage } from '@/infra/api/storage'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { isUpdateAdvertiseRequestValidationError } from '@/lib/types/api/UpdateAdvertiseRequest'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { advertiseId } = router.query

    const title = useStringInput('')
    const mainImageUrl = useStringInput('')
    const active = useBooleanInput(true)
    const publishTo = useStringInput('')
    const publishFrom = useStringInput('')

    useEffect(() => {
        const f = async () => {
            const foundsAdvertise = await showAdvertise(Number(advertiseId))
            title.set(foundsAdvertise.title)
            mainImageUrl.set(foundsAdvertise.mainImageUrl)
            active.set(foundsAdvertise.active)
            publishTo.set(foundsAdvertise.publishTo)
            publishFrom.set(foundsAdvertise.publishFrom)
        }
        f()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await updateAdvertise(
            Number(advertiseId),
            {
                type: 'UpdateAdvertiseRequest',
                title: title.value,
                mainImageUrl: mainImageUrl.value,
                active: active.toBoolean,
                publishTo: publishTo.value,
                publishFrom: publishFrom.value,
            }
        )

        if (isUpdateAdvertiseRequestValidationError(data)) {
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
                        <EditAdvertiseForm 
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