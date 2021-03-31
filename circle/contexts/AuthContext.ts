import { User } from '@/lib/types/model/User'
import { createContext, Dispatch, SetStateAction } from 'react'

const AuthContext = createContext({
  accessToken: undefined,
  setAccessToken: (): void => {
    return
  },
  user: undefined,
  setUser: (): void => {
    return
  },
} as {
  accessToken: string | null | undefined
  setAccessToken: Dispatch<SetStateAction<string>>
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
})
export { AuthContext }
