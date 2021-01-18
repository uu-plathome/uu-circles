
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { showCircle, updateCircle } from '@/infra/api/circle'
import { Circle } from '@/infra/api/types'
import { __ } from '@/lang/ja'
import { getAllCircleType } from '@/lib/enum/api/CircleType'
import { getAllDateOfActivity, isDateOfActivity } from '@/lib/enum/api/DateOfActivity'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { isUpdateCircleFormRequestValidationError, UpdateCircleFormRequest } from '@/lib/types/api/UpdateCircleFormRequest'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '../../../components/layouts/BaseHeader'

const EditPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const [circle, setCircle] = useState<Circle|undefined>(undefined)
    const router = useRouter()
    const name = useInput('')
    const slug = useInput('')
    const release = useInput('false')
    const circleType = useInput('')
    const nameKana = useInput('')
    const shortName = useInput('')
    const prefixName = useInput('')
    const description = useInput('')
    const intro = useInput('')
    const placeOfActivity = useInput('')
    const placeOfActivityDetail = useInput('')
    const doOnlineActivity = useInput('true')
    const dateOfActivityMonday = useInput('')
    const dateOfActivityTuesday = useInput('')
    const dateOfActivityWednesday = useInput('')
    const dateOfActivityThursday = useInput('')
    const dateOfActivityFriday = useInput('')
    const dateOfActivitySaturday = useInput('')
    const dateOfActivitySunday = useInput('')
    const dateOfActivityDetail = useInput('')
    const admissionFee = useInput('')
    const numberOfMembers = useInput<number>(0)
    const publicEmail = useInput('')
    const twitterUrl = useInput('')
    const facebookUrl = useInput('')
    const instagramUrl = useInput('')
    const lineUrl = useInput('')
    const youtubeUrl = useInput('')
    const homepageUrl = useInput('')
    const peingUrl = useInput('')
    const githubUrl = useInput('')
    const tiktokUrl = useInput('')
    const participationUrl = useInput('')
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            if (!Array.isArray(id)) {
                const foundCircle = await showCircle(Number(id), authContext.accessToken)
                setCircle(foundCircle)
                if (foundCircle) {
                    name.set(foundCircle.name)
                    slug.set(foundCircle.slug)
                    release.set(foundCircle.release ? 'true' : 'false')
                    nameKana.set(foundCircle.nameKana)
                    shortName.set(foundCircle.shortName)
                    prefixName.set(foundCircle.prefixName)
                    description.set(foundCircle.description)
                    intro.set(foundCircle.intro)
                    circleType.set(foundCircle.circleType)
                    placeOfActivity.set(foundCircle.placeOfActivity)
                    placeOfActivityDetail.set(foundCircle.placeOfActivityDetail)
                    doOnlineActivity.set(foundCircle.doOnlineActivity ? 'true' : 'false')
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
                }
            }
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!Array.isArray(id)) {
            const data = await updateCircle(
                Number(id),
                {
                    type: 'UpdateCircleFormRequest',
                    name: name.value,
                    slug: slug.value,
                    release: release.value === 'true' ? true : false,
                    nameKana: nameKana.value,
                    circleType: circleType.value,
                    shortName: shortName.value,
                    prefixName: prefixName.value,
                    description: description.value,
                    intro: intro.value,
                    placeOfActivity: placeOfActivity.value,
                    placeOfActivityDetail: placeOfActivityDetail.value,
                    doOnlineActivity: doOnlineActivity.value === 'true' ? true : false,
                    dateOfActivityMonday: isDateOfActivity(dateOfActivityMonday.value) ? dateOfActivityMonday.value : null,
                    dateOfActivityTuesday: isDateOfActivity(dateOfActivityTuesday.value) ? dateOfActivityTuesday.value: null,
                    dateOfActivityWednesday: isDateOfActivity(dateOfActivityWednesday.value) ? dateOfActivityWednesday.value: null,
                    dateOfActivityThursday: isDateOfActivity(dateOfActivityThursday.value) ? dateOfActivityThursday.value: null,
                    dateOfActivityFriday: isDateOfActivity(dateOfActivityFriday.value) ? dateOfActivityFriday.value: null,
                    dateOfActivitySaturday: isDateOfActivity(dateOfActivitySaturday.value) ? dateOfActivitySaturday.value: null,
                    dateOfActivitySunday: isDateOfActivity(dateOfActivitySunday.value) ? dateOfActivitySunday.value: null,
                    dateOfActivityDetail: dateOfActivityDetail.value,
                    admissionFee: admissionFee.value,
                    numberOfMembers: numberOfMembers.value,
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
                } as UpdateCircleFormRequest,
                authContext.accessToken
            )

            if (isUpdateCircleFormRequestValidationError(data)) {
                name.setError(data.errors.name && Array.isArray(data.errors.name) ? data.errors.name[0] : '')
                slug.setError(data.errors.slug && Array.isArray(data.errors.slug) ? data.errors.slug[0] : '')
                nameKana.setError(data.errors.nameKana && Array.isArray(data.errors.nameKana) ? data.errors.nameKana[0] : '')
                release.setError(data.errors.release && Array.isArray(data.errors.release) ? data.errors.release[0] : '')
                circleType.setError(data.errors.circleType && Array.isArray(data.errors.circleType) ? data.errors.circleType[0] : '')
                shortName.setError(data.errors.shortName && Array.isArray(data.errors.shortName) ? data.errors.shortName[0] : '')
                prefixName.setError(data.errors.prefixName && Array.isArray(data.errors.prefixName) ? data.errors.prefixName[0] : '')
                description.setError(data.errors.description && Array.isArray(data.errors.description) ? data.errors.description[0] : '')
                intro.setError(data.errors.intro && Array.isArray(data.errors.intro) ? data.errors.intro[0] : '')
                placeOfActivity.setError(data.errors.placeOfActivity && Array.isArray(data.errors.placeOfActivity) ? data.errors.placeOfActivity[0] : '')
                placeOfActivityDetail.setError(data.errors.placeOfActivityDetail && Array.isArray(data.errors.placeOfActivityDetail) ? data.errors.placeOfActivityDetail[0] : '')
                doOnlineActivity.setError(data.errors.doOnlineActivity && Array.isArray(data.errors.doOnlineActivity) ? data.errors.doOnlineActivity[0] : '')
                dateOfActivityMonday.setError(data.errors.dateOfActivityMonday && Array.isArray(data.errors.dateOfActivityMonday) ? data.errors.dateOfActivityMonday[0] : '')
                dateOfActivityTuesday.setError(data.errors.dateOfActivityTuesday && Array.isArray(data.errors.dateOfActivityTuesday) ? data.errors.dateOfActivityTuesday[0] : '')
                dateOfActivityWednesday.setError(data.errors.dateOfActivityWednesday && Array.isArray(data.errors.dateOfActivityWednesday) ? data.errors.dateOfActivityWednesday[0] : '')
                dateOfActivityThursday.setError(data.errors.dateOfActivityThursday && Array.isArray(data.errors.dateOfActivityThursday) ? data.errors.dateOfActivityThursday[0] : '')
                dateOfActivityFriday.setError(data.errors.dateOfActivityFriday && Array.isArray(data.errors.dateOfActivityFriday) ? data.errors.dateOfActivityFriday[0] : '')
                dateOfActivitySaturday.setError(data.errors.dateOfActivitySaturday && Array.isArray(data.errors.dateOfActivitySaturday) ? data.errors.dateOfActivitySaturday[0] : '')
                dateOfActivitySunday.setError(data.errors.dateOfActivitySunday && Array.isArray(data.errors.dateOfActivitySunday) ? data.errors.dateOfActivitySunday[0] : '')
                dateOfActivityDetail.setError(data.errors.dateOfActivityDetail && Array.isArray(data.errors.dateOfActivityDetail) ? data.errors.dateOfActivityDetail[0] : '')
                admissionFee.setError(data.errors.admissionFee && Array.isArray(data.errors.admissionFee) ? data.errors.admissionFee[0] : '')
                numberOfMembers.setError(data.errors.numberOfMembers && Array.isArray(data.errors.numberOfMembers) ? data.errors.numberOfMembers[0] : '')
                publicEmail.setError(data.errors.publicEmail && Array.isArray(data.errors.publicEmail) ? data.errors.publicEmail[0] : '')
                twitterUrl.setError(data.errors.twitterUrl && Array.isArray(data.errors.twitterUrl) ? data.errors.twitterUrl[0] : '')
                facebookUrl.setError(data.errors.facebookUrl && Array.isArray(data.errors.facebookUrl) ? data.errors.facebookUrl[0] : '')
                instagramUrl.setError(data.errors.instagramUrl && Array.isArray(data.errors.instagramUrl) ? data.errors.instagramUrl[0] : '')
                lineUrl.setError(data.errors.lineUrl && Array.isArray(data.errors.lineUrl) ? data.errors.lineUrl[0] : '')
                youtubeUrl.setError(data.errors.youtubeUrl && Array.isArray(data.errors.youtubeUrl) ? data.errors.youtubeUrl[0] : '')
                homepageUrl.setError(data.errors.homepageUrl && Array.isArray(data.errors.homepageUrl) ? data.errors.homepageUrl[0] : '')
                peingUrl.setError(data.errors.peingUrl && Array.isArray(data.errors.peingUrl) ? data.errors.peingUrl[0] : '')
                githubUrl.setError(data.errors.githubUrl && Array.isArray(data.errors.githubUrl) ? data.errors.githubUrl[0] : '')
                tiktokUrl.setError(data.errors.tiktokUrl && Array.isArray(data.errors.tiktokUrl) ? data.errors.tiktokUrl[0] : '')
                participationUrl.setError(data.errors.participationUrl && Array.isArray(data.errors.participationUrl) ? data.errors.participationUrl[0] : '')
                return
            }

            await router.push('/circle')
        }
    }


    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/5">
                        <BaseSidebar />
                    </div>

                    <div className="w-full lg:w-4/5">
                        <div className="py-10">
                            <div className="flex justify-between mb-8">
                                <h1 className="text-2xl text-gray-100">
                                サークル編集
                                </h1>
                            </div>

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
                                            { ...name }
                                        />

                                        <BaseTextField
                                            label="URLのパス"
                                            name="slug"
                                            id="slug"
                                            placeholder="u-lab"
                                            required
                                            note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                            { ...slug }
                                        />

                                        <BaseTextField
                                            label="サークル名(かな)"
                                            name="nameKana"
                                            id="nameKana"
                                            { ...nameKana }
                                        />

                                        <BaseTextField
                                            label="サークル名(省略名)"
                                            name="shortName"
                                            id="shortName"
                                            { ...shortName }
                                        />

                                        <BaseTextField
                                            label="サークル名(肩書)"
                                            name="prefixName"
                                            id="prefixName"
                                            { ...prefixName }
                                        />

                                        <BaseTextField
                                            label="サークル短文紹介"
                                            name="description"
                                            id="description"
                                            { ...description }
                                        />

                                        <BaseTextField
                                            label="サークル長文紹介"
                                            name="intro"
                                            id="intro"
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
                                            suffix="円"
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
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default EditPage