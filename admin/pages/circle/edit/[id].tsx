
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseImageInput } from '@/components/atoms/form/BaseImageInput'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AuthContext } from '@/contexts/AuthContext'
import { useBooleanInput, useNumberInput, useStringInput } from '@/hooks/useInput'
import { showCircle, updateCircle } from '@/infra/api/circle'
import { putStorage } from '@/infra/api/storage'
import { __ } from '@/lang/ja'
import { getAllCircleType } from '@/lib/enum/api/CircleType'
import { getAllDateOfActivity, isDateOfActivity } from '@/lib/enum/api/DateOfActivity'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { isUpdateCircleFormRequestValidationError, UpdateCircleFormRequest } from '@/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/lib/types/model/Circle'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BaseHeader } from '../../../components/layouts/BaseHeader'

const EditPage: NextPage = () => {
    const authContext = useContext(AuthContext)
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
            if (!Array.isArray(id)) {
                const foundCircle = await showCircle(Number(id), authContext.accessToken)
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
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onDropMainImage = (acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async (e) => {
                try {
                    const data = await putStorage(file, authContext.accessToken)
    
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
                } as UpdateCircleFormRequest,
                authContext.accessToken
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
                            <form onSubmit={onSubmit}>

                                <BaseSelect
                                    label="公開設定"
                                    id="release"
                                    name="release"
                                    items={[
                                        { value: 'true', label: '公開' },
                                        { value: 'false', label: '非公開' },
                                    ]}
                                    { ...release }
                                />

                                <BaseTextField
                                    label="サークル名"
                                    name="name"
                                    id="name"
                                    required
                                    expand
                                    { ...name }
                                />

                                <BaseTextField
                                    label="URLのパス"
                                    name="slug"
                                    id="slug"
                                    placeholder="u-lab"
                                    required
                                    expand
                                    note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                    { ...slug }
                                />

                                <BaseTextField
                                    label="サークル名(かな)"
                                    name="nameKana"
                                    id="nameKana"
                                    expand
                                    { ...nameKana }
                                />

                                <BaseTextField
                                    label="サークル名(省略名)"
                                    name="shortName"
                                    id="shortName"
                                    expand
                                    { ...shortName }
                                />

                                <BaseTextField
                                    label="サークル名(肩書)"
                                    name="prefixName"
                                    id="prefixName"
                                    expand
                                    { ...prefixName }
                                />

                                <BaseTextField
                                    label="サークル短文紹介"
                                    name="description"
                                    id="description"
                                    expand
                                    { ...description }
                                />

                                <BaseTextField
                                    label="サークル長文紹介"
                                    name="intro"
                                    id="intro"
                                    expand
                                    { ...intro }
                                />

                                <BaseSelect
                                    label="サークル種別"
                                    id="circleType"
                                    name="circleType"
                                    items={[
                                        ...getAllCircleType().map((_circleType) => ({
                                            value: _circleType,
                                            label: __(_circleType)
                                        })),
                                        { value: '', label: '不明' },
                                    ]}
                                    { ...circleType }
                                />

                                <BaseSelect
                                    label="活動場所"
                                    id="placeOfActivity"
                                    name="placeOfActivity"
                                    items={[
                                        ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
                                            value: _placeOfActivity,
                                            label: __(_placeOfActivity)
                                        }))
                                    ]}
                                    { ...placeOfActivity }
                                />

                                <BaseTextField
                                    label="活動場所詳細"
                                    name="placeOfActivityDetail"
                                    id="placeOfActivityDetail"
                                    { ...placeOfActivityDetail }
                                />

                                <BaseSelect
                                    label="オンライン活動しているかどうか"
                                    id="doOnlineActivity"
                                    name="doOnlineActivity"
                                    items={[
                                        { value: 'true', label: 'オンラインしている' },
                                        { value: 'false', label: 'オフラインのみ' },
                                    ]}
                                    { ...doOnlineActivity }
                                />

                                <BaseSelect
                                    label="活動(月曜日)"
                                    id="dateOfActivityMonday"
                                    name="dateOfActivityMonday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivityMonday }
                                />

                                <BaseSelect
                                    label="活動(火曜日)"
                                    id="dateOfActivityTuesday"
                                    name="dateOfActivityTuesday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivityTuesday }
                                />

                                <BaseSelect
                                    label="活動(水曜日)"
                                    id="dateOfActivityWednesday"
                                    name="dateOfActivityWednesday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivityWednesday }
                                />

                                <BaseSelect
                                    label="活動(木曜日)"
                                    id="dateOfActivityThursday"
                                    name="dateOfActivityThursday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivityThursday }
                                />

                                <BaseSelect
                                    label="活動(金曜日)"
                                    id="dateOfActivityFriday"
                                    name="dateOfActivityFriday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivityFriday }
                                />

                                <BaseSelect
                                    label="活動(土曜日)"
                                    id="dateOfActivitySaturday"
                                    name="dateOfActivitySaturday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivitySaturday }
                                />

                                <BaseSelect
                                    label="活動(日曜日)"
                                    id="dateOfActivitySunday"
                                    name="dateOfActivitySunday"
                                    items={[
                                        { value: null, label: '非活動日' },
                                        ...getAllDateOfActivity().map((_dateOfActivity) => ({
                                            value: _dateOfActivity,
                                            label: __(_dateOfActivity)
                                        }))
                                    ]}
                                    { ...dateOfActivitySunday }
                                />

                                <BaseTextField
                                    label="活動日時詳細"
                                    name="dateOfActivityDetail"
                                    id="dateOfActivityDetail"
                                    expand
                                    { ...dateOfActivityDetail }
                                />

                                <BaseTextField
                                    label="入会費"
                                    name="admissionFee"
                                    id="admissionFee"
                                    placeholder="年間1,000円"
                                    expand
                                    { ...admissionFee }
                                />

                                <BaseTextField
                                    label="活動人数"
                                    name="numberOfMembers"
                                    id="numberOfMembers"
                                    suffix="人"
                                    { ...numberOfMembers }
                                />

                                <BaseTextField
                                    label="公開用メールアドレス"
                                    name="publicEmail"
                                    id="publicEmail"
                                    placeholder="example@example.com"
                                    expand
                                    { ...publicEmail }
                                />

                                <div className="grid grid-cols-2 gap-x-4">
                                    <div>
                                        <BaseTextField
                                            label="Twitter URL"
                                            name="twitterUrl"
                                            id="twitterUrl"
                                            expand
                                            placeholder="https://twitter.com/"
                                            { ...twitterUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Facebook URL"
                                            name="facebookUrl"
                                            id="facebookUrl"
                                            expand
                                            { ...facebookUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Instagram URL"
                                            name="instagramUrl"
                                            id="instagramUrl"
                                            expand
                                            placeholder="https://instagram.com"
                                            { ...instagramUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Line URL"
                                            name="lineUrl"
                                            id="lineUrl"
                                            expand
                                            { ...lineUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Youtube URL"
                                            name="youtubeUrl"
                                            id="youtubeUrl"
                                            expand
                                            placeholder="https://youtube.com"
                                            { ...youtubeUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Homepage URL"
                                            name="homepageUrl"
                                            id="homepageUrl"
                                            expand
                                            { ...homepageUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Peing URL"
                                            name="peingUrl"
                                            id="peingUrl"
                                            expand
                                            { ...peingUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="GitHub URL"
                                            name="githubUrl"
                                            id="githubUrl"
                                            expand
                                            placeholder="https://github.com"
                                            { ...githubUrl }
                                        />
                                    </div>

                                    <div>
                                        <BaseTextField
                                            label="Tiktok URL"
                                            name="tiktokUrl"
                                            id="tiktokUrl"
                                            expand
                                            { ...tiktokUrl }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <BaseTextField
                                        label="新歓・活動参加用URL"
                                        name="participationUrl"
                                        id="participationUrl"
                                        expand
                                        note="Google formなどのURL。Zoomを張るのは控えてください。"
                                        { ...participationUrl }
                                    />
                                </div>

                                <BaseImageInput 
                                    label="メイン画像"
                                    id="mainImageUrl"
                                    preview={mainImageUrl.value ? mainImageUrl.value : `/images/no-image.png`}
                                    onDrop={onDropMainImage}
                                    error={mainImageUrl.error}
                                />

                                <div className="flex justify-center mt-8">
                                    <GreenButton type="submit">
                                        更新
                                    </GreenButton>
                                </div>
                            </form>
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