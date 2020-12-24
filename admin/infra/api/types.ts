export interface Login {
    usernameOrEmail: string
    password: string
}

export interface LoginValidationError {
    username: string
    email: string
    password: string
}

export interface User {
    id: number
    username: string
    email: string
    apiToken: string
}