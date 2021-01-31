export interface Circle {
    type: 'Circle'
    id: number
    slug: string
    release: boolean
    circleType: string
    name: string
    nameKana: string
    shortName: string
    prefixName: string
    description: string
    intro: string
    placeOfActivity: string
    placeOfActivityDetail: string
    doOnlineActivity: boolean
    dateOfActivityMonday: string
    dateOfActivityTuesday: string
    dateOfActivityWednesday: string
    dateOfActivityThursday: string
    dateOfActivityFriday: string
    dateOfActivitySaturday: string
    dateOfActivitySunday: string
    dateOfActivityDetail: string
    admissionFee: string
    numberOfMembers: number
    publicEmail: string
    twitterUrl: string
    facebookUrl: string
    instagramUrl: string
    lineUrl: string
    youtubeUrl: string
    homepageUrl: string
    peingUrl: string
    githubUrl: string
    tiktokUrl: string
    participationUrl: string
    createdAt: string
    updatedAt: string
}

export const isCircle = (v: any): v is Circle => v && v.type === 'Circle'
