import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect } from 'react'
import Compressor from 'compressorjs'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { showAdvertise, updateAdvertise } from '@/infra/api/advertise'
import { EditAdvertiseForm } from '@/components/organisms/form/Advertise/EditAdvertiseForm'
import { putStorage } from '@/infra/api/storage'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { isUpdateAdvertiseRequestValidationError } from '@/lib/types/api/UpdateAdvertiseRequest'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { advertiseId } = router.query
    const { isMd } = useMediaQuery()

    const title = useStringInput('')
    const link = useStringInput('')
    const mainImageUrl = useStringInput('')
    const active = useBooleanInput(true)
    const publishTo = useDateInput(null, 'YYYY-MM-DD')
    const publishFrom = useDateInput(null,  'YYYY-MM-DD')

    useEffect(() => {
        const f = async () => {
            const foundsAdvertise = await showAdvertise(Number(advertiseId))
            title.set(foundsAdvertise.title)
            link.set(foundsAdvertise.link)
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
                link: link.value,
                mainImageUrl: mainImageUrl.value,
                active: active.toBoolean,
                publishTo: publishTo.value,
                publishFrom: publishFrom.value,
            }
        )

        if (isUpdateAdvertiseRequestValidationError(data)) {
            title.setErrors(data.errors.title)
            link.setErrors(data.errors.link)
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

            reader.onabort = () => console.error('file reading was aborted')
            reader.onerror = () => console.error('file reading has failed')
            reader.onload = async (e) => {
                new Compressor(file, {
                    quality: 1.0,
                    maxWidth: 800,
                    async success(result) {
                        try {
                            // Send the compressed image file to server with XMLHttpRequest.
                            const data = await putStorage(result)
                            if (isAdminPutStorageRequestValidationError(data)) {
                                mainImageUrl.setErrors(data.errors.file)
                            }
                            mainImageUrl.set(data.url)
                        } catch (e) {
                            mainImageUrl.setError('エラーが発生しました。別の画像を試してください。')
                        }
                    },
                    error(err) {
                        console.error(err.message);
                    },
                });
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <div>
            <Head>
                <title>広告発行</title>
            </Head>

            {isMd ? (
                <BaseHeader />
            ) : ''}

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
                                link,
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
