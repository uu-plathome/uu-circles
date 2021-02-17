
export const Role = {
  /**
   * システム管理者
   */
  SYSTEM: 'SYSTEM',

  /**
   * 管理者
   */
  MANAGER: 'MANAGER',

  /**
   * 一般
   */
  COMMON: 'COMMON'
} as const

export type RoleKey = keyof typeof Role
export type Role = typeof Role[keyof typeof Role]


export const getAllRole = (): Role[] => Object.values(Role)

export const getAllRoleKey = (): RoleKey[] => Object.keys(Role) as RoleKey[]

export const isRole = (s: any): s is Role => Object.values(Role).includes(s)

/**
 * システム管理者
 */
export const isSystem = (v: any): v is 'SYSTEM' => v === Role.SYSTEM
/**
 * 管理者
 */
export const isManager = (v: any): v is 'MANAGER' => v === Role.MANAGER
/**
 * 一般
 */
export const isCommon = (v: any): v is 'COMMON' => v === Role.COMMON
