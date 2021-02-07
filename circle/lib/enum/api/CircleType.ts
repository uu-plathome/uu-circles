/**
 * サークル種類
 */
export const CircleType = {
  /**
   * 公式団体
   */
  OFFICIAL_ORGANIZATION: 'OFFICIAL_ORGANIZATION',

  /**
   * 非公式団体
   */
  UNOFFICIAL_ORGANIZATION: 'UNOFFICIAL_ORGANIZATION',

  /**
   * 届出団体
   */
  SENDING_ORGANIZATION: 'SENDING_ORGANIZATION',

  /**
   * 学生団体
   */
  STUDENT_GROUP: 'STUDENT_GROUP'
} as const

export type CircleTypeKey = keyof typeof CircleType
export type CircleType = typeof CircleType[keyof typeof CircleType]

/**
 * サークル種類
 */
export const getAllCircleType = (): CircleType[] => Object.values(CircleType)
/**
 * サークル種類
 */
export const getAllCircleTypeKey = (): CircleTypeKey[] => Object.keys(CircleType) as CircleTypeKey[]
/**
 * サークル種類
 */
export const isCircleType = (s: any): s is CircleType => Object.values(CircleType).includes(s)

/**
 * 公式団体
 */
export const isOfficialOrganization = (v: any): v is 'OFFICIAL_ORGANIZATION' => v === CircleType.OFFICIAL_ORGANIZATION
/**
 * 非公式団体
 */
export const isUnofficialOrganization = (v: any): v is 'UNOFFICIAL_ORGANIZATION' => v === CircleType.UNOFFICIAL_ORGANIZATION
/**
 * 届出団体
 */
export const isSendingOrganization = (v: any): v is 'SENDING_ORGANIZATION' => v === CircleType.SENDING_ORGANIZATION
/**
 * 学生団体
 */
export const isStudentGroup = (v: any): v is 'STUDENT_GROUP' => v === CircleType.STUDENT_GROUP
