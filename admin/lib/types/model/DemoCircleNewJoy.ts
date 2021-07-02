export interface DemoCircleNewJoy {
  type: 'DemoCircleNewJoy'
  demoCircleNewJoyId: number
  circleId: number
  title: string
  description: string
  url: string
  placeOfActivity: string
  placeOfActivityDetail: string
  demoCircleNewjoyType: string
  startDate: string
  endDate: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export const isDemoCircleNewJoy = (v: any): v is DemoCircleNewJoy =>
  v && v.type === 'DemoCircleNewJoy'
