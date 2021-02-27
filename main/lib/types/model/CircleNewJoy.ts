export interface CircleNewJoy {
    type: 'CircleNewJoy'
    id: number
    circle_id: number
    title: string
    description: string
    url: string
    place_of_activity: string
    place_of_activity_detail: string
    publish_from: string
    start_date: string
    end_date: string
    release: boolean
    created_at: string
    updated_at: string
    // キャメル
    circleId: number
    placeOfActivity: string
    placeOfActivityDetail: string
    publishFrom: string
    publishTo: string
    startDate: string
    endDate: string
    createdAt: string
    updatedAt: string
}

export const isCircleNewJoy = (v: any): v is CircleNewJoy => v && v.type === 'CircleNewJoy'
