export interface CircleNewJoy {
  type: 'CircleNewJoy'
  circleNewJoyId: number
  circleId: number
  title: string
  description: string
  url: string
  privateNewjoyLink: string
  placeOfActivity: string
  placeOfActivityDetail: string
  publishFrom: string
  startDate: string
  endDate: string
  release: boolean
  createdAt: string
  updatedAt: string
}

export const isCircleNewJoy = (v: any): v is CircleNewJoy =>
  v && v.type === 'CircleNewJoy'
