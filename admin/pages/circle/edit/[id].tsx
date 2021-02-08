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
    const isClubActivities = useBooleanInput(false)
    const appealingPoint1 = useStringInput('')
    const appealingPoint2 = useStringInput('')
    const appealingPoint3 = useStringInput('')
    const commonPlaceOfActivity = useStringInput('')
    const commonPlaceOfActivityDetail = useStringInput('')
    const commonDateOfActivityMonday = useBooleanInput(false)
    const commonDateOfActivityTuesday = useBooleanInput(false)
    const commonDateOfActivityWednesday = useBooleanInput(false)
    const commonDateOfActivityThursday = useBooleanInput(false)
    const commonDateOfActivityFriday = useBooleanInput(false)
    const commonDateOfActivitySaturday = useBooleanInput(false)
    const commonDateOfActivitySunday = useBooleanInput(false)
    const commonDateOfActivityDetail = useStringInput('')
    const isOnlineActivity = useBooleanInput(true)
    const onlinePlaceOfActivityDetail = useStringInput('')
    const onlineDateOfActivityMonday = useBooleanInput(false)
    const onlineDateOfActivityTuesday = useBooleanInput(false)
    const onlineDateOfActivityWednesday = useBooleanInput(false)
    const onlineDateOfActivityThursday = useBooleanInput(false)
    const onlineDateOfActivityFriday = useBooleanInput(false)
    const onlineDateOfActivitySaturday = useBooleanInput(false)
    const onlineDateOfActivitySunday = useBooleanInput(false)
    const onlineDateOfActivityDetail = useStringInput('')
    const admissionFeePerYear = useNumberInput(0)
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
    const handbillImageUrl = useStringInput('')
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
                isClubActivities.set(foundCircle.isClubActivities)
                appealingPoint1.set(foundCircle.appealingPoint1)
                appealingPoint2.set(foundCircle.appealingPoint2)
                appealingPoint3.set(foundCircle.appealingPoint3)
                commonPlaceOfActivity.set(foundCircle.commonPlaceOfActivity)
                commonPlaceOfActivityDetail.set(foundCircle.commonPlaceOfActivityDetail)
                commonDateOfActivityMonday.set(foundCircle.commonDateOfActivityMonday)
                commonDateOfActivityTuesday.set(foundCircle.commonDateOfActivityTuesday)
                commonDateOfActivityWednesday.set(foundCircle.commonDateOfActivityWednesday)
                commonDateOfActivityThursday.set(foundCircle.commonDateOfActivityThursday)
                commonDateOfActivityFriday.set(foundCircle.commonDateOfActivityFriday)
                commonDateOfActivitySaturday.set(foundCircle.commonDateOfActivitySaturday)
                commonDateOfActivitySunday.set(foundCircle.commonDateOfActivitySunday)
                commonDateOfActivityDetail.set(foundCircle.commonDateOfActivityDetail)
                isOnlineActivity.set(foundCircle.isOnlineActivity)
                onlinePlaceOfActivityDetail.set(foundCircle.onlinePlaceOfActivityDetail)
                onlineDateOfActivityMonday.set(foundCircle.onlineDateOfActivityMonday)
                onlineDateOfActivityTuesday.set(foundCircle.onlineDateOfActivityTuesday)
                onlineDateOfActivityWednesday.set(foundCircle.onlineDateOfActivityWednesday)
                onlineDateOfActivityThursday.set(foundCircle.onlineDateOfActivityThursday)
                onlineDateOfActivityFriday.set(foundCircle.onlineDateOfActivityFriday)
                onlineDateOfActivitySaturday.set(foundCircle.onlineDateOfActivitySaturday)
                onlineDateOfActivitySunday.set(foundCircle.onlineDateOfActivitySunday)
                onlineDateOfActivityDetail.set(foundCircle.onlineDateOfActivityDetail)
                admissionFeePerYear.set(foundCircle.admissionFeePerYear)
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
                handbillImageUrl.set(foundCircle.handbillImageUrl)
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

    const onDropHandbillImage = (acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async (e) => {
                try {
                    const data = await putStorage(file)
    
                    if (isAdminPutStorageRequestValidationError(data)) {
                        handbillImageUrl.setErrors(data.errors.file)
                    }
                    handbillImageUrl.set(data.url)
                } catch (e) {
                    handbillImageUrl.setError('エラーが発生しました。別の画像を試してください。')
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
                    commonPlaceOfActivity: commonPlaceOfActivity.value,
                    isClubActivities: isClubActivities.toBoolean,
                    appealingPoint1: appealingPoint1.value,
                    appealingPoint2: appealingPoint2.value,
                    appealingPoint3: appealingPoint3.value,
                    commonPlaceOfActivityDetail: commonPlaceOfActivityDetail.value,
                    commonDateOfActivityMonday: commonDateOfActivityMonday.toBoolean,
                    commonDateOfActivityTuesday: commonDateOfActivityTuesday.toBoolean,
                    commonDateOfActivityWednesday: commonDateOfActivityWednesday.toBoolean,
                    commonDateOfActivityThursday: commonDateOfActivityThursday.toBoolean,
                    commonDateOfActivityFriday: commonDateOfActivityFriday.toBoolean,
                    commonDateOfActivitySaturday: commonDateOfActivitySaturday.toBoolean,
                    commonDateOfActivitySunday: commonDateOfActivitySunday.toBoolean,
                    commonDateOfActivityDetail: commonDateOfActivityDetail.value,
                    isOnlineActivity: isOnlineActivity.toBoolean,
                    onlinePlaceOfActivityDetail: onlinePlaceOfActivityDetail.value,
                    onlineDateOfActivityMonday: onlineDateOfActivityMonday.toBoolean,
                    onlineDateOfActivityTuesday: onlineDateOfActivityTuesday.toBoolean,
                    onlineDateOfActivityWednesday: onlineDateOfActivityWednesday.toBoolean,
                    onlineDateOfActivityThursday: onlineDateOfActivityThursday.toBoolean,
                    onlineDateOfActivityFriday: onlineDateOfActivityFriday.toBoolean,
                    onlineDateOfActivitySaturday: onlineDateOfActivitySaturday.toBoolean,
                    onlineDateOfActivitySunday: onlineDateOfActivitySunday.toBoolean,
                    onlineDateOfActivityDetail: onlineDateOfActivityDetail.value,
                    admissionFeePerYear: admissionFeePerYear.toNumber,
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
                    handbillImageUrl: handbillImageUrl.value,
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
                commonPlaceOfActivity.setErrors(data.errors.commonPlaceOfActivity)
                isClubActivities.setErrors(data.errors.isClubActivities)
                appealingPoint1.setErrors(data.errors.appealingPoint1)
                appealingPoint2.setErrors(data.errors.appealingPoint2)
                appealingPoint3.setErrors(data.errors.appealingPoint3)
                commonPlaceOfActivityDetail.setErrors(data.errors.commonPlaceOfActivityDetail)
                commonDateOfActivityMonday.setErrors(data.errors.commonDateOfActivityMonday)
                commonDateOfActivityTuesday.setErrors(data.errors.commonDateOfActivityTuesday)
                commonDateOfActivityWednesday.setErrors(data.errors.commonDateOfActivityWednesday)
                commonDateOfActivityThursday.setErrors(data.errors.commonDateOfActivityThursday)
                commonDateOfActivityFriday.setErrors(data.errors.commonDateOfActivityFriday)
                commonDateOfActivitySaturday.setErrors(data.errors.commonDateOfActivitySaturday)
                commonDateOfActivitySunday.setErrors(data.errors.commonDateOfActivitySunday)
                commonDateOfActivityDetail.setErrors(data.errors.commonDateOfActivityDetail)
                isOnlineActivity.setErrors(data.errors.isOnlineActivity)
                onlinePlaceOfActivityDetail.setErrors(data.errors.onlinePlaceOfActivityDetail)
                onlineDateOfActivityMonday.setErrors(data.errors.onlineDateOfActivityMonday)
                onlineDateOfActivityTuesday.setErrors(data.errors.onlineDateOfActivityTuesday)
                onlineDateOfActivityWednesday.setErrors(data.errors.onlineDateOfActivityWednesday)
                onlineDateOfActivityThursday.setErrors(data.errors.onlineDateOfActivityThursday)
                onlineDateOfActivityFriday.setErrors(data.errors.onlineDateOfActivityFriday)
                onlineDateOfActivitySaturday.setErrors(data.errors.onlineDateOfActivitySaturday)
                onlineDateOfActivitySunday.setErrors(data.errors.onlineDateOfActivitySunday)
                onlineDateOfActivityDetail.setErrors(data.errors.onlineDateOfActivityDetail)
                admissionFeePerYear.setErrors(data.errors.admissionFeePerYear)
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
                handbillImageUrl.setErrors(data.errors.handbillImageUrl)
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
                                onDropHandbillImage={onDropHandbillImage}
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
                                    isClubActivities,
                                    appealingPoint1,
                                    appealingPoint2,
                                    appealingPoint3,
                                    commonPlaceOfActivity,
                                    commonPlaceOfActivityDetail,
                                    commonDateOfActivityMonday,
                                    commonDateOfActivityTuesday,
                                    commonDateOfActivityWednesday,
                                    commonDateOfActivityThursday,
                                    commonDateOfActivityFriday,
                                    commonDateOfActivitySaturday,
                                    commonDateOfActivitySunday,
                                    commonDateOfActivityDetail,
                                    isOnlineActivity,
                                    onlinePlaceOfActivityDetail,
                                    onlineDateOfActivityMonday,
                                    onlineDateOfActivityTuesday,
                                    onlineDateOfActivityWednesday,
                                    onlineDateOfActivityThursday,
                                    onlineDateOfActivityFriday,
                                    onlineDateOfActivitySaturday,
                                    onlineDateOfActivitySunday,
                                    onlineDateOfActivityDetail,
                                    admissionFeePerYear,
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
                                    handbillImageUrl,
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