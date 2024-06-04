/**
 * 権限.
 */
export const Role = {
  _type: 'Role',

  /**
   * システム管理者.
   */
  SYSTEM: 'SYSTEM',

  /**
   * AdminUser: 管理者
   * CircleUser: サークル部長.
   */
  MANAGER: 'MANAGER',

  /**
   * 一般.
   */
  COMMON: 'COMMON',
} as const

export type RoleKey = keyof Omit<typeof Role, '_type'>
export type RoleAllKey = keyof typeof Role
export type Role = (typeof Role)[RoleKey]

/**
 * 権限.
 */
export const getAllRole = (): Role[] => {
  const { _type: _, ...data } = Role
  return Object.values(data)
}
/**
 * 権限.
 */
export const getAllRoleKey = (): RoleKey[] => {
  const { _type: _, ...data } = Role
  return Object.keys(data) as RoleKey[]
}
/**
 * 権限.
 */
export const isRole = (s: any): s is Role => getAllRole().includes(s)

/**
 * システム管理者.
 */
export const isSystem = (v: any): v is 'SYSTEM' => v === Role.SYSTEM
/**
 * AdminUser: 管理者
 * CircleUser: サークル部長.
 */
export const isManager = (v: any): v is 'MANAGER' => v === Role.MANAGER
/**
 * 一般.
 */
export const isCommon = (v: any): v is 'COMMON' => v === Role.COMMON
