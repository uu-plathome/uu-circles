import { createContext, Dispatch, SetStateAction } from 'react'

const AuthContext = createContext({
    accessToken: undefined,
    setAccessToken: (): void => {
        return
    }
} as {
    accessToken: string|null|undefined
    setAccessToken: Dispatch<SetStateAction<string>>
})
export { AuthContext }