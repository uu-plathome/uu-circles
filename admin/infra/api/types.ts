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
}

export interface Circle {
    id: number
    slug: string
    release: boolean
    createdAt: string
    updatedAt: string
}