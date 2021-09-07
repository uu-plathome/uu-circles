export const CategorySlugProperty = {
  _type: 'CategorySlugProperty',

  official_organization: 'official_organization',

  unofficial_organization: 'unofficial_organization',

  student_group: 'student_group',

  club: 'club',
} as const

export type CategorySlugPropertyKey = keyof Omit<
  typeof CategorySlugProperty,
  '_type'
>
export type CategorySlugPropertyAllKey = keyof typeof CategorySlugProperty
export type CategorySlugProperty =
  typeof CategorySlugProperty[CategorySlugPropertyKey]

export const getAllCategorySlugProperty = (): CategorySlugProperty[] => {
  const { _type: _, ...data } = CategorySlugProperty
  return Object.values(data)
}

export const getAllCategorySlugPropertyKey = (): CategorySlugPropertyKey[] => {
  const { _type: _, ...data } = CategorySlugProperty
  return Object.keys(data) as CategorySlugPropertyKey[]
}

export const isCategorySlugProperty = (s: any): s is CategorySlugProperty =>
  getAllCategorySlugProperty().includes(s)

export const isOfficialOrganization = (v: any): v is 'official_organization' =>
  v === CategorySlugProperty.official_organization
export const isUnofficialOrganization = (
  v: any
): v is 'unofficial_organization' =>
  v === CategorySlugProperty.unofficial_organization
export const isStudentGroup = (v: any): v is 'student_group' =>
  v === CategorySlugProperty.student_group
export const isClub = (v: any): v is 'club' => v === CategorySlugProperty.club
