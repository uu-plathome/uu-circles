export interface User {
  type: 'User'
  id: number
  username: string
  displayName: string
  email: string
  emailVerifiedAt: string
  active: boolean
  apiToken: string
}

export const isUser = (v: any): v is User => v && v.type === 'User'
