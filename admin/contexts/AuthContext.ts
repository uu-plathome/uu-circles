import { createContext, Dispatch, SetStateAction } from 'react'
import { Role } from '@/src/lib/enum/api/Role'

const AuthContext = createContext({
  accessToken: undefined,
  setAccessToken: (): void => {
    return
  },
  role: undefined,
  setRole: (): void => {
    return
  },
} as {
  accessToken: string | null | undefined
  setAccessToken: Dispatch<SetStateAction<string>>
  role: Role | null | undefined
  setRole: Dispatch<SetStateAction<Role>>
})
export { AuthContext }
