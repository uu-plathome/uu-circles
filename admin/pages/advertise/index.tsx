import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AdvertiseListItem } from '@/components/molecules/list_items/AdvertiseListItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSuccess } from '@/hooks/useSuccess'
import {
  deleteAdvertise,
  downloadAdvertiseXlsx,
  getAdvertiseList,
} from '@/infra/api/advertise'
import { Advertise } from '@/lib/types/model/Advertise'

const IndexPage: NextPage = () => {
  const [advertises, setAdvertise] = useState<Advertise[]>([])
  const [error, setError] = useState<string>('')
  const { success, setSuccess } = useSuccess<string>('')
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const fetchAdvertise = async () => {
    setAdvertise(await getAdvertiseList())
  }
  useSWR('/admin/api/advertise', fetchAdvertise)

  const onDelete = async (advertiseId: number) => {
    setError('')
    setSuccess('')
    setIsOpen(true)
    const data = await deleteAdvertise(advertiseId)

    if (data && data.type === 'Success') {
      setSuccess('広告を削除しました', 3000)
      fetchAdvertise()
      setIsOpen(false)
      return
    }

    setIsOpen(false)
  }

  /**
   * 広告データのXlsxのダウンロード
   */
  const onDownloadAdvertiseXlsx = async () => {
    await downloadAdvertiseXlsx()
  }

  return (
    <div>
      <Head>
        <title>広告管理</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="広告管理"
          actionText="広告発行"
          actionHref="/advertise/create"
        >
          {success ? <SuccessBunner text={success} /> : ''}

          {error ? <DangerBunner text={error} /> : ''}

          <SubmitLoading isOpen={isOpen} />

          {advertises.length > 0 ? (
            <div className="mb-4">
              <BlueButton type="button" onClick={onDownloadAdvertiseXlsx}>
                広告のxlsxダウンロード
              </BlueButton>
            </div>
          ) : (
            ''
          )}

          <div className="border-2 border-gray-800 p-2">
            {advertises.length > 0
              ? advertises.map((advertise: Advertise) => {
                  return (
                    <AdvertiseListItem
                      key={`circle-${advertise.id}`}
                      advertise={advertise}
                      onDelete={onDelete}
                    />
                  )
                })
              : ''}

            {advertises.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだ広告が登録されていません</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
