import { Role } from '@/lib/enum/api/Role'

export interface User {
  type: 'User'
  id: number
  username: string
  displayName: string
  email: string
  emailVerifiedAt: string
  active: boolean
  apiToken: string
  role: Role
}

export const isUser = (v: any): v is User => v && v.type === 'User'
