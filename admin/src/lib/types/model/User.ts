import { Role } from '@/src/lib/enum/api/Role'

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

/**
 * 全ての部員アカウントのためのユーザー定義
 */
export interface UserByAllCircle {
  id: number
  username: string
  displayName: string
  email: string
  emailVerifiedAt: string
  active: boolean
}
