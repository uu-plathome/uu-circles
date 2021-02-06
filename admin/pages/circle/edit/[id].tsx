import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditCircleForm } from '@/components/organisms/form/Circle/EditCircleForm'
import { useBooleanInput, useNumberInput, useStringInput } from '@/hooks/useInput'
import { showCircle, updateCircle } from '@/infra/api/circle'
import { putStorage } from '@/infra/api/storage'
import { __ } from '@/lang/ja'
import { isDateOfActivity } from '@/lib/enum/api/DateOfActivity'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { isUpdateCircleFormRequestValidationError, UpdateCircleFormRequest } from '@/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/lib/types/model/Circle'

const EditPage: NextPage = () => {
    const [circle, setCircle] = useState<Circle|undefined>(undefined)
    const router = useRouter()
    const name = useStringInput('')
    const slug = useStringInput('')
    const release = useBooleanInput(false)
    const circleType = useStringInput('')
    const nameKana = useStringInput('')
    const shortName = useStringInput('')
    const prefixName = useStringInput('')
    const description = useStringInput('')
    const intro = useStringInput('')
    const placeOfActivity = useStringInput('')
    const placeOfActivityDetail = useStringInput('')
    const doOnlineActivity = useBooleanInput(true)
    const dateOfActivityMonday = useStringInput('')
    const dateOfActivityTuesday = useStringInput('')
    const dateOfActivityWednesday = useStringInput('')
    const dateOfActivityThursday = useStringInput('')
    const dateOfActivityFriday = useStringInput('')
    const dateOfActivitySaturday = useStringInput('')
    const dateOfActivitySunday = useStringInput('')
    const dateOfActivityDetail = useStringInput('')
    const admissionFee = useStringInput('')
    const numberOfMembers = useNumberInput(0)
    const publicEmail = useStringInput('')
    const twitterUrl = useStringInput('')
    const facebookUrl = useStringInput('')
    const instagramUrl = useStringInput('')
    const lineUrl = useStringInput('')
    const youtubeUrl = useStringInput('')
    const homepageUrl = useStringInput('')
    const peingUrl = useStringInput('')
    const githubUrl = useStringInput('')
    const tiktokUrl = useStringInput('')
    const participationUrl = useStringInput('')
    const mainImageUrl = useStringInput('')
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            const foundCircle = await showCircle(Number(id))
            setCircle(foundCircle)
            if (foundCircle) {
                name.set(foundCircle.name)
                slug.set(foundCircle.slug)
                release.set(foundCircle.release)
                nameKana.set(foundCircle.nameKana)
                shortName.set(foundCircle.shortName)
                prefixName.set(foundCircle.prefixName)
                description.set(foundCircle.description)
                intro.set(foundCircle.intro)
                circleType.set(foundCircle.circleType)
                placeOfActivity.set(foundCircle.placeOfActivity)
                placeOfActivityDetail.set(foundCircle.placeOfActivityDetail)
                doOnlineActivity.set(foundCircle.doOnlineActivity)
                dateOfActivityMonday.set(foundCircle.dateOfActivityMonday)
                dateOfActivityTuesday.set(foundCircle.dateOfActivityTuesday)
                dateOfActivityWednesday.set(foundCircle.dateOfActivityWednesday)
                dateOfActivityThursday.set(foundCircle.dateOfActivityThursday)
                dateOfActivityFriday.set(foundCircle.dateOfActivityFriday)
                dateOfActivitySaturday.set(foundCircle.dateOfActivitySaturday)
                dateOfActivitySunday.set(foundCircle.dateOfActivitySunday)
                dateOfActivityDetail.set(foundCircle.dateOfActivityDetail)
                admissionFee.set(foundCircle.admissionFee)
                numberOfMembers.set(foundCircle.numberOfMembers)
                publicEmail.set(foundCircle.publicEmail)
                twitterUrl.set(foundCircle.twitterUrl)
                facebookUrl.set(foundCircle.facebookUrl)
                instagramUrl.set(foundCircle.instagramUrl)
                lineUrl.set(foundCircle.lineUrl)
                youtubeUrl.set(foundCircle.youtubeUrl)
                homepageUrl.set(foundCircle.homepageUrl)
                peingUrl.set(foundCircle.peingUrl)
                githubUrl.set(foundCircle.githubUrl)
                tiktokUrl.set(foundCircle.tiktokUrl)
                participationUrl.set(foundCircle.participationUrl)
                mainImageUrl.set(foundCircle.mainImageUrl)
            }
        }

        f()
    }, [])

    const onDropMainImage = (acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async (e) => {
                try {
                    const data = await putStorage(file)
    
                    if (isAdminPutStorageRequestValidationError(data)) {
                        mainImageUrl.setError(data.errors.file && Array.isArray(data.errors.file) ? data.errors.file[0] : '')
                    }
                    mainImageUrl.set(data.url)
                } catch (e) {
                    mainImageUrl.setError('エラーが発生しました。別の画像を試してください。')
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!Array.isArray(id)) {
            const data = await updateCircle(
                Number(id),
                {
                    type: 'UpdateCircleFormRequest',
                    name: name.value,
                    slug: slug.value,
                    release: release.toBoolean,
                    nameKana: nameKana.value,
                    circleType: circleType.value,
                    shortName: shortName.value,
                    prefixName: prefixName.value,
                    description: description.value,
                    intro: intro.value,
                    placeOfActivity: placeOfActivity.value,
                    placeOfActivityDetail: placeOfActivityDetail.value,
                    doOnlineActivity: doOnlineActivity.toBoolean,
                    dateOfActivityMonday: isDateOfActivity(dateOfActivityMonday.value) ? dateOfActivityMonday.value : null,
                    dateOfActivityTuesday: isDateOfActivity(dateOfActivityTuesday.value) ? dateOfActivityTuesday.value: null,
                    dateOfActivityWednesday: isDateOfActivity(dateOfActivityWednesday.value) ? dateOfActivityWednesday.value: null,
                    dateOfActivityThursday: isDateOfActivity(dateOfActivityThursday.value) ? dateOfActivityThursday.value: null,
                    dateOfActivityFriday: isDateOfActivity(dateOfActivityFriday.value) ? dateOfActivityFriday.value: null,
                    dateOfActivitySaturday: isDateOfActivity(dateOfActivitySaturday.value) ? dateOfActivitySaturday.value: null,
                    dateOfActivitySunday: isDateOfActivity(dateOfActivitySunday.value) ? dateOfActivitySunday.value: null,
                    dateOfActivityDetail: dateOfActivityDetail.value,
                    admissionFee: admissionFee.value,
                    numberOfMembers: numberOfMembers.toNumber,
                    publicEmail: publicEmail.value,
                    twitterUrl: twitterUrl.value,
                    facebookUrl: facebookUrl.value,
                    instagramUrl: instagramUrl.value,
                    lineUrl: lineUrl.value,
                    youtubeUrl: youtubeUrl.value,
                    homepageUrl: homepageUrl.value,
                    peingUrl: peingUrl.value,
                    githubUrl: githubUrl.value,
                    tiktokUrl: tiktokUrl.value,
                    participationUrl: participationUrl.value,
                    mainImageUrl: mainImageUrl.value,
                } as UpdateCircleFormRequest
            )

            if (isUpdateCircleFormRequestValidationError(data)) {
                name.setErrors(data.errors.name)
                slug.setErrors(data.errors.slug)
                nameKana.setErrors(data.errors.nameKana)
                release.setErrors(data.errors.release)
                circleType.setErrors(data.errors.circleType)
                shortName.setErrors(data.errors.shortName)
                prefixName.setErrors(data.errors.prefixName)
                description.setErrors(data.errors.description)
                intro.setErrors(data.errors.intro)
                placeOfActivity.setErrors(data.errors.placeOfActivity)
                placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
                doOnlineActivity.setErrors(data.errors.doOnlineActivity)
                dateOfActivityMonday.setErrors(data.errors.dateOfActivityMonday)
                dateOfActivityTuesday.setErrors(data.errors.dateOfActivityTuesday)
                dateOfActivityWednesday.setErrors(data.errors.dateOfActivityWednesday)
                dateOfActivityThursday.setErrors(data.errors.dateOfActivityThursday)
                dateOfActivityFriday.setErrors(data.errors.dateOfActivityFriday)
                dateOfActivitySaturday.setErrors(data.errors.dateOfActivitySaturday)
                dateOfActivitySunday.setErrors(data.errors.dateOfActivitySunday)
                dateOfActivityDetail.setErrors(data.errors.dateOfActivityDetail)
                admissionFee.setErrors(data.errors.admissionFee)
                numberOfMembers.setErrors(data.errors.numberOfMembers)
                publicEmail.setErrors(data.errors.publicEmail)
                twitterUrl.setErrors(data.errors.twitterUrl)
                facebookUrl.setErrors(data.errors.facebookUrl)
                instagramUrl.setErrors(data.errors.instagramUrl)
                lineUrl.setErrors(data.errors.lineUrl)
                youtubeUrl.setErrors(data.errors.youtubeUrl)
                homepageUrl.setErrors(data.errors.homepageUrl)
                peingUrl.setErrors(data.errors.peingUrl)
                githubUrl.setErrors(data.errors.githubUrl)
                tiktokUrl.setErrors(data.errors.tiktokUrl)
                participationUrl.setErrors(data.errors.participationUrl)
                mainImageUrl.setErrors(data.errors.mainImageUrl)
                return
            }

            await router.push('/circle')
        }
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークル編集"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        { circle ? (
                            <EditCircleForm
                                onDropMainImage={onDropMainImage}
                                onSubmit={onSubmit}
                                form={{
                                    release,
                                    name,
                                    slug,
                                    nameKana,
                                    shortName,
                                    prefixName,
                                    description,
                                    intro,
                                    circleType,
                                    placeOfActivity,
                                    placeOfActivityDetail,
                                    doOnlineActivity,
                                    dateOfActivityMonday,
                                    dateOfActivityTuesday,
                                    dateOfActivityWednesday,
                                    dateOfActivityThursday,
                                    dateOfActivityFriday,
                                    dateOfActivitySaturday,
                                    dateOfActivitySunday,
                                    dateOfActivityDetail,
                                    admissionFee,
                                    numberOfMembers,
                                    publicEmail,
                                    twitterUrl,
                                    facebookUrl,
                                    instagramUrl,
                                    lineUrl,
                                    youtubeUrl,
                                    homepageUrl,
                                    peingUrl,
                                    githubUrl,
                                    tiktokUrl,
                                    participationUrl,
                                    mainImageUrl,
                                }}
                            />
                        ) : (
                            <p className="text-white">Loading...</p>
                        )}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default EditPage