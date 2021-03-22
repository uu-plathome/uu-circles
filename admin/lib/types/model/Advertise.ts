import { AdvertiseType } from '@/lib/enum/api/AdvertiseType'

export interface Advertise {
  id: number
  title: string
  link: string
  mainImageUrl: string
  active: boolean
  advertiseType: AdvertiseType
  publishFrom: string
  publishTo: string
  createdAt: string
  updatedAt: string
}
