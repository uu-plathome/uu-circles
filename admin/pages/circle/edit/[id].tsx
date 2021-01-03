
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { showCircle, updateCircle } from '@/infra/api/circle'
import { Circle } from '@/infra/api/types'
import { DateOfActivity } from '@/lib/enum/api/DateOfActivity'
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
    const nameKana = useInput('')
    const shortName = useInput('')
    const prefixName = useInput('')
    const description = useInput('')
    const intro = useInput('')
    const placeOfActivity = useInput('')
    const placeOfActivityDetail = useInput('')
    const doOnlineActivity = useInput<boolean>(true)
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
                    nameKana.set(foundCircle.nameKana)
                    shortName.set(foundCircle.shortName)
                    prefixName.set(foundCircle.prefixName)
                    description.set(foundCircle.description)
                    intro.set(foundCircle.intro)
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
            await updateCircle(
                Number(id),
                {
                    name: name.value,
                    slug: slug.value,
                    release: circle.release,
                    nameKana: nameKana.value,
                    shortName: shortName.value,
                    prefixName: prefixName.value,
                    description: description.value,
                    intro: intro.value,
                    placeOfActivity: placeOfActivity.value,
                    placeOfActivityDetail: placeOfActivityDetail.value,
                    doOnlineActivity: doOnlineActivity.value,
                    dateOfActivityMonday: dateOfActivityMonday.value,
                    dateOfActivityTuesday: dateOfActivityTuesday.value,
                    dateOfActivityWednesday: dateOfActivityWednesday.value,
                    dateOfActivityThursday: dateOfActivityThursday.value,
                    dateOfActivityFriday: dateOfActivityFriday.value,
                    dateOfActivitySaturday: dateOfActivitySaturday.value,
                    dateOfActivitySunday: dateOfActivitySunday.value,
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
                } as Circle,
                authContext.accessToken
            )
        }
        await router.push('/circle')
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

                                        {/*
                                            活動場所
                                            placeOfActivity
                                        */}

                                        <BaseTextField
                                            label="活動場所詳細"
                                            name="placeOfActivityDetail"
                                            id="placeOfActivityDetail"
                                            { ...placeOfActivityDetail }
                                        />

                                        {/*
                                            オンライン活動しているかどうか
                                            doOnlineActivity
                                        */}

                                        {/* dateOfActivityMonday
                                        dateOfActivityTuesday
                                        dateOfActivityWednesday
                                        dateOfActivityThursday
                                        dateOfActivityFriday
                                        dateOfActivitySaturday
                                        dateOfActivitySunday */}
                                        <BaseSelect
                                            label="活動(月曜日)"
                                            id="dateOfActivityMonday"
                                            name="dateOfActivityMonday"
                                            items={[
                                                { value: null, label: '' },
                                                { value: DateOfActivity.EVERY_WEEK, label: '毎週' },
                                                { value: DateOfActivity.EVERY_OTHER_WEEK, label: '隔週' },
                                            ]}
                                            { ...dateOfActivityMonday }
                                        />

                                        <BaseTextField
                                            label="活動日時詳細"
                                            name="dateOfActivityDetail"
                                            id="dateOfActivityDetail"
                                            { ...dateOfActivityDetail }
                                        />

                                        <BaseTextField
                                            label="入会費"
                                            name="admissionFee"
                                            id="admissionFee"
                                            placeholder="年間1,000円"
                                            { ...admissionFee }
                                        />

                                        {/*
                                        活動人数
                                        numberOfMembers
                                        */}

                                        <BaseTextField
                                            label="公開用メールアドレス"
                                            name="publicEmail"
                                            id="publicEmail"
                                            placeholder="example@example.com"
                                            { ...publicEmail }
                                        />

                                        <BaseTextField
                                            label="Twitter URL"
                                            name="twitterUrl"
                                            id="twitterUrl"
                                            placeholder="https://twitter.com/"
                                            { ...twitterUrl }
                                        />

                                        <BaseTextField
                                            label="Facebook URL"
                                            name="facebookUrl"
                                            id="facebookUrl"
                                            { ...facebookUrl }
                                        />

                                        <BaseTextField
                                            label="Instagram URL"
                                            name="instagramUrl"
                                            id="instagramUrl"
                                            placeholder="https://instagram.com"
                                            { ...instagramUrl }
                                        />

                                        <BaseTextField
                                            label="Line URL"
                                            name="lineUrl"
                                            id="lineUrl"
                                            { ...lineUrl }
                                        />

                                        <BaseTextField
                                            label="Youtube URL"
                                            name="youtubeUrl"
                                            id="youtubeUrl"
                                            placeholder="https://youtube.com"
                                            { ...youtubeUrl }
                                        />

                                        <BaseTextField
                                            label="Homepage URL"
                                            name="homepageUrl"
                                            id="homepageUrl"
                                            { ...homepageUrl }
                                        />

                                        <BaseTextField
                                            label="Peing URL"
                                            name="peingUrl"
                                            id="peingUrl"
                                            { ...peingUrl }
                                        />

                                        <BaseTextField
                                            label="Peing URL"
                                            name="githubUrl"
                                            id="githubUrl"
                                            placeholder="https://github.com"
                                            { ...githubUrl }
                                        />

                                        <BaseTextField
                                            label="Tiktok URL"
                                            name="tiktokUrl"
                                            id="tiktokUrl"
                                            { ...tiktokUrl }
                                        />

                                        <BaseTextField
                                            label="新歓・活動参加用URL"
                                            name="participationUrl"
                                            id="participationUrl"
                                            note="Google formなどのURL。Zoomを張るのは控えてください。"
                                            { ...participationUrl }
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
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default EditPage