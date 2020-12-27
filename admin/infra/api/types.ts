export interface Login {
    usernameOrEmail: string
    password: string
}

export interface LoginValidationError {
    username: string
    email: string
    password: string
    type: 'loginValidationError'
}

export const isLoginValidationError = (v: User|LoginValidationError): v is LoginValidationError => {
    return v.type === 'loginValidationError'
}

export const isUser = (v: User|LoginValidationError): v is User => {
    return v.type === 'user'
}

export interface User {
    id: number
    username: string
    email: string
    apiToken: string
    type: 'user'
}

export interface CreateCircle {
    slug: string
    release?: boolean
    name: string
}

export interface Circle {
    id: number
    slug: string
    release: boolean
    circle_type_id: string
    name: string
    nameKana: string
    shortName: string
    prefixName: string
    description: string
    intro: string
    placeOfActivity: string
    placeOfActivityDetail: string
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