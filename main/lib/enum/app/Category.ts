export const Category = {
  officialOrganization: 'official_organization',
  unofficialOrganization: 'unofficial_organization',
  studentGroup: 'student_group',
  club: 'club',
} as const

export type CategoryKey = keyof typeof Category
export type Category = typeof Category[keyof typeof Category]
