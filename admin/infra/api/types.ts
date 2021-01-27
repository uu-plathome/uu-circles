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

export interface VerifyAuthError {
    status: string
    type: 'verifyAuthError'
}

export interface VerifyValidationError {
    errors: {
        password: string
    }
    message: string
    type: 'verifyValidationError'
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
    displayName: string
    email: string
    emailVerifiedAt: string
    active: boolean
    apiToken: string
    type: 'user'
}

export interface RegisterUser {
    username: string
    displayName: string
    email: string
    type: 'registerUser'
}
export interface Circle {
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

export interface CircleNewJoy {
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