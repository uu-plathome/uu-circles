export interface CircleNewJoy {
  type: 'CircleNewJoy'
  id: number
  circleId: number
  title: string
  description: string
  url: string
  placeOfActivity: string
  placeOfActivityDetail: string
  publishFrom: string
  publishTo: string
  startDate: string
  endDate: string
  release: boolean
  createdAt: string
  updatedAt: string
}

export const isCircleNewJoy = (v: any): v is CircleNewJoy =>
  v && v.type === 'CircleNewJoy'
