import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Compressor from 'compressorjs'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/src/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { EditCircleForm } from '@/src/components/organisms/Form/Circle/EditCircleForm'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useDelayedEffect } from '@/src/hooks/useDelayedEffect'
import {
  useBooleanInput,
  useNumberInput,
  useStringInput,
} from '@/src/hooks/useInput'
import { showCircle, updateCircle } from '@/src/lib/infra/api/circle'
import { putStorage } from '@/src/lib/infra/api/storage'
import { isCirclePutStorageRequestValidationError } from '@/src/lib/types/api/CirclePutStorageRequest'
import {
  isUpdateCircleFormRequestValidationError,
  UpdateCircleFormRequest,
} from '@/src/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/src/lib/types/model/Circle'
import { HiraToKana } from '@/src/lib/utils/String'

const Page: NextPage = () => {
  const authContext = useContext(AuthContext)
  const [circle, setCircle] = useState<Circle | undefined>(undefined)
  const router = useRouter()
  const name = useStringInput('')
  const circleType = useStringInput('')
  const nameKana = useStringInput('')
  const shortName = useStringInput('')
  const prefixName = useStringInput('')
  const description = useStringInput('')
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
  const admissionFeePerYear = useNumberInput(null)
  const numberOfMembers = useNumberInput(null)
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
  const activityImageUrl1 = useStringInput('')
  const activityImageUrl2 = useStringInput('')
  const activityImageUrl3 = useStringInput('')
  const activityImageUrl4 = useStringInput('')
  const activityImageUrl5 = useStringInput('')
  const activityImageUrl6 = useStringInput('')
  const [isOpen, setIsOpen] = useState(true)
  const { circleId } = router.query

  useEffect(() => {
    const f = async () => {
      const { circle: foundCircle } = await showCircle(Number(circleId))
      setCircle(foundCircle)
      if (foundCircle) {
        name.set(foundCircle.name)
        nameKana.set(foundCircle.nameKana)
        shortName.set(foundCircle.shortName)
        prefixName.set(foundCircle.prefixName)
        description.set(foundCircle.description)
        circleType.set(foundCircle.circleType)
        isClubActivities.set(foundCircle.isClubActivities)
        appealingPoint1.set(foundCircle.appealingPoint1)
        appealingPoint2.set(foundCircle.appealingPoint2)
        appealingPoint3.set(foundCircle.appealingPoint3)
        commonPlaceOfActivity.set(foundCircle.commonPlaceOfActivity)
        commonPlaceOfActivityDetail.set(foundCircle.commonPlaceOfActivityDetail)
        commonDateOfActivityMonday.set(foundCircle.commonDateOfActivityMonday)
        commonDateOfActivityTuesday.set(foundCircle.commonDateOfActivityTuesday)
        commonDateOfActivityWednesday.set(
          foundCircle.commonDateOfActivityWednesday
        )
        commonDateOfActivityThursday.set(
          foundCircle.commonDateOfActivityThursday
        )
        commonDateOfActivityFriday.set(foundCircle.commonDateOfActivityFriday)
        commonDateOfActivitySaturday.set(
          foundCircle.commonDateOfActivitySaturday
        )
        commonDateOfActivitySunday.set(foundCircle.commonDateOfActivitySunday)
        commonDateOfActivityDetail.set(foundCircle.commonDateOfActivityDetail)
        isOnlineActivity.set(foundCircle.isOnlineActivity)
        onlinePlaceOfActivityDetail.set(foundCircle.onlinePlaceOfActivityDetail)
        onlineDateOfActivityMonday.set(foundCircle.onlineDateOfActivityMonday)
        onlineDateOfActivityTuesday.set(foundCircle.onlineDateOfActivityTuesday)
        onlineDateOfActivityWednesday.set(
          foundCircle.onlineDateOfActivityWednesday
        )
        onlineDateOfActivityThursday.set(
          foundCircle.onlineDateOfActivityThursday
        )
        onlineDateOfActivityFriday.set(foundCircle.onlineDateOfActivityFriday)
        onlineDateOfActivitySaturday.set(
          foundCircle.onlineDateOfActivitySaturday
        )
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
        activityImageUrl1.set(foundCircle.activityImageUrl1)
        activityImageUrl2.set(foundCircle.activityImageUrl2)
        activityImageUrl3.set(foundCircle.activityImageUrl3)
        activityImageUrl4.set(foundCircle.activityImageUrl4)
        activityImageUrl5.set(foundCircle.activityImageUrl5)
        activityImageUrl6.set(foundCircle.activityImageUrl6)
      }
      setIsOpen(false)
    }

    f()
  }, [])

  // カタカナに固定する
  useDelayedEffect(
    () => {
      nameKana.set(HiraToKana(nameKana.value))
    },
    [nameKana.value],
    1000
  )

  const onDropMainImage = (acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async (_) => {
        new Compressor(file, {
          quality: 1.0,
          maxWidth: 800,
          async success(result) {
            try {
              // Send the compressed image file to server with XMLHttpRequest.
              const data = await putStorage(result)
              if (isCirclePutStorageRequestValidationError(data)) {
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

  const onDropHandbillImage = (acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async (_) => {
        new Compressor(file, {
          quality: 1.0,
          maxWidth: 800,
          async success(result) {
            try {
              // Send the compressed image file to server with XMLHttpRequest.
              const data = await putStorage(result)
              if (isCirclePutStorageRequestValidationError(data)) {
                handbillImageUrl.setErrors(data.errors.file)
              }
              handbillImageUrl.set(data.url)
            } catch (e) {
              handbillImageUrl.setError(
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

  const onDropActivityImage = (
    acceptedFiles: any,
    idx: 1 | 2 | 3 | 4 | 5 | 6
  ) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async (_) => {
        new Compressor(file, {
          quality: 1.0,
          maxWidth: 800,
          async success(result) {
            try {
              const data = await putStorage(result)

              switch (idx) {
                case 1:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl1.setErrors(data.errors.file)
                  }
                  activityImageUrl1.set(data.url)
                  break
                case 2:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl2.setErrors(data.errors.file)
                  }
                  activityImageUrl2.set(data.url)
                  break
                case 3:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl3.setErrors(data.errors.file)
                  }
                  activityImageUrl3.set(data.url)
                  break
                case 4:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl4.setErrors(data.errors.file)
                  }
                  activityImageUrl4.set(data.url)
                  break
                case 5:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl5.setErrors(data.errors.file)
                  }
                  activityImageUrl5.set(data.url)
                  break
                case 6:
                  if (isCirclePutStorageRequestValidationError(data)) {
                    activityImageUrl6.setErrors(data.errors.file)
                  }
                  activityImageUrl6.set(data.url)
                  break
              }
            } catch (e) {
              switch (idx) {
                case 1:
                  activityImageUrl1.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
                case 2:
                  activityImageUrl2.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
                case 3:
                  activityImageUrl3.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
                case 4:
                  activityImageUrl4.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
                case 5:
                  activityImageUrl5.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
                case 6:
                  activityImageUrl6.setError(
                    'エラーが発生しました。別の画像を試してください。'
                  )
                  break
              }
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    if (!Array.isArray(circleId)) {
      const data = await updateCircle(Number(circleId), {
        type: 'UpdateCircleFormRequest',
        name: name.value,
        nameKana: HiraToKana(nameKana.value),
        circleType: circleType.value,
        shortName: shortName.value,
        prefixName: prefixName.value,
        description: description.value,
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
        activityImageUrl1: activityImageUrl1.value,
        activityImageUrl2: activityImageUrl2.value,
        activityImageUrl3: activityImageUrl3.value,
        activityImageUrl4: activityImageUrl4.value,
        activityImageUrl5: activityImageUrl5.value,
        activityImageUrl6: activityImageUrl6.value,
      } as UpdateCircleFormRequest)

      if (isUpdateCircleFormRequestValidationError(data)) {
        name.setErrors(data.errors.name)
        nameKana.setErrors(data.errors.nameKana)
        circleType.setErrors(data.errors.circleType)
        shortName.setErrors(data.errors.shortName)
        prefixName.setErrors(data.errors.prefixName)
        description.setErrors(data.errors.description)
        commonPlaceOfActivity.setErrors(data.errors.commonPlaceOfActivity)
        isClubActivities.setErrors(data.errors.isClubActivities)
        appealingPoint1.setErrors(data.errors.appealingPoint1)
        appealingPoint2.setErrors(data.errors.appealingPoint2)
        appealingPoint3.setErrors(data.errors.appealingPoint3)
        commonPlaceOfActivityDetail.setErrors(
          data.errors.commonPlaceOfActivityDetail
        )
        commonDateOfActivityMonday.setErrors(
          data.errors.commonDateOfActivityMonday
        )
        commonDateOfActivityTuesday.setErrors(
          data.errors.commonDateOfActivityTuesday
        )
        commonDateOfActivityWednesday.setErrors(
          data.errors.commonDateOfActivityWednesday
        )
        commonDateOfActivityThursday.setErrors(
          data.errors.commonDateOfActivityThursday
        )
        commonDateOfActivityFriday.setErrors(
          data.errors.commonDateOfActivityFriday
        )
        commonDateOfActivitySaturday.setErrors(
          data.errors.commonDateOfActivitySaturday
        )
        commonDateOfActivitySunday.setErrors(
          data.errors.commonDateOfActivitySunday
        )
        commonDateOfActivityDetail.setErrors(
          data.errors.commonDateOfActivityDetail
        )
        isOnlineActivity.setErrors(data.errors.isOnlineActivity)
        onlinePlaceOfActivityDetail.setErrors(
          data.errors.onlinePlaceOfActivityDetail
        )
        onlineDateOfActivityMonday.setErrors(
          data.errors.onlineDateOfActivityMonday
        )
        onlineDateOfActivityTuesday.setErrors(
          data.errors.onlineDateOfActivityTuesday
        )
        onlineDateOfActivityWednesday.setErrors(
          data.errors.onlineDateOfActivityWednesday
        )
        onlineDateOfActivityThursday.setErrors(
          data.errors.onlineDateOfActivityThursday
        )
        onlineDateOfActivityFriday.setErrors(
          data.errors.onlineDateOfActivityFriday
        )
        onlineDateOfActivitySaturday.setErrors(
          data.errors.onlineDateOfActivitySaturday
        )
        onlineDateOfActivitySunday.setErrors(
          data.errors.onlineDateOfActivitySunday
        )
        onlineDateOfActivityDetail.setErrors(
          data.errors.onlineDateOfActivityDetail
        )
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
        activityImageUrl1.setErrors(data.errors.activityImageUrl1)
        activityImageUrl2.setErrors(data.errors.activityImageUrl2)
        activityImageUrl3.setErrors(data.errors.activityImageUrl3)
        activityImageUrl4.setErrors(data.errors.activityImageUrl4)
        activityImageUrl5.setErrors(data.errors.activityImageUrl5)
        activityImageUrl6.setErrors(data.errors.activityImageUrl6)
        setIsOpen(false)
        return
      }

      setIsOpen(false)
      await router.push(`/circle/${circleId}`)
    }
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle
      ? [
          ...[
            {
              text: circle.shortName || circle.name,
              href: `/circle/[circleId]`,
              as: `/circle/${circle.id}`,
            },
            {
              text: `${circle.shortName || circle.name}の編集`,
              href: `/circle/[circleId]/edit`,
              as: `/circle/${circle.id}/edit`,
              active: true,
            },
          ],
        ]
      : []
  }, [circle])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="py-6 text-lg font-bold text-center bg-white">
          <FontAwesomeIcon icon={faFileAlt} className="mr-4" size="lg" />
          <span>{circle ? circle.name : 'サークル'}の編集</span>
        </h1>

        <BaseContainer>
          <div className="px-4 pb-32 md:pb-72">
            <p className="pt-8">
              <Link
                href="/circle/[circleId]"
                as={`/circle/${Number(circleId)}`}
              >
                <a className="text-blue-500 underline">← 戻る</a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

            <div>
              <EditCircleForm
                onDropMainImage={onDropMainImage}
                onDropHandbillImage={onDropHandbillImage}
                onDropActivityImage={onDropActivityImage}
                onSubmit={onSubmit}
                form={{
                  name,
                  nameKana,
                  shortName,
                  prefixName,
                  description,
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
                  activityImageUrl1,
                  activityImageUrl2,
                  activityImageUrl3,
                  activityImageUrl4,
                  activityImageUrl5,
                  activityImageUrl6,
                }}
              />
            </div>
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
