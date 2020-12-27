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
    name_kana: string
    short_name: string
    prefix_name: string
    description: string
    intro: string
    place_of_activity: string
    place_of_activity_detail: string
    date_of_activity_monday: string
    date_of_activity_tuesday: string
    date_of_activity_wednesday: string
    date_of_activity_thursday: string
    date_of_activity_friday: string
    date_of_activity_saturday: string
    date_of_activity_sunday: string
    date_of_activity_detail: string
    admission_fee: string
    number_of_members: number
    public_email: string
    twitter_url: string
    facebook_url: string
    instagram_url: string
    line_url: string
    youtube_url: string
    homepage_url: string
    peing_url: string
    github_url: string
    tiktok_url: string
    participation_url: string
    createdAt: string
    updatedAt: string
}