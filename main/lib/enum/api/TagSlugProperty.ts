/**
 * /api/circle/tag/{tag}のtagのパス一覧.
 */
export const TagSlugProperty = {
  _type: 'TagSlugProperty',

  sport: 'sport',

  music: 'music',

  culture: 'culture',

  nature: 'nature',

  community: 'community',

  international: 'international',

  incare: 'incare',

  programming: 'programming',

  volunteer: 'volunteer',

  active_activity: 'active_activity',

  loose: 'loose',

  monday: 'monday',

  tuesday: 'tuesday',

  wednesday: 'wednesday',

  thursday: 'thursday',

  friday: 'friday',

  only_monday: 'only_monday',

  only_tuesday: 'only_tuesday',

  only_wednesday: 'only_wednesday',

  only_thursday: 'only_thursday',

  only_friday: 'only_friday',

  holiday: 'holiday',

  mammoth: 'mammoth',

  urgent_recruitment: 'urgent_recruitment',

  mystery: 'mystery',

  online: 'online',

  mine: 'mine',

  yoto: 'yoto',
} as const

export type TagSlugPropertyKey = keyof typeof TagSlugProperty
export type TagSlugProperty = typeof TagSlugProperty[keyof typeof TagSlugProperty]

/**
 * /api/circle/tag/{tag}のtagのパス一覧.
 */
export const getAllTagSlugProperty = (): TagSlugProperty[] => Object.values(TagSlugProperty)
/**
 * /api/circle/tag/{tag}のtagのパス一覧.
 */
export const getAllTagSlugPropertyKey = (): TagSlugPropertyKey[] => Object.keys(TagSlugProperty) as TagSlugPropertyKey[]
/**
 * /api/circle/tag/{tag}のtagのパス一覧.
 */
export const isTagSlugProperty = (s: any): s is TagSlugProperty => Object.values(TagSlugProperty).includes(s)

export const isSport = (v: any): v is 'sport' => v === TagSlugProperty.sport
export const isMusic = (v: any): v is 'music' => v === TagSlugProperty.music
export const isCulture = (v: any): v is 'culture' => v === TagSlugProperty.culture
export const isNature = (v: any): v is 'nature' => v === TagSlugProperty.nature
export const isCommunity = (v: any): v is 'community' => v === TagSlugProperty.community
export const isInternational = (v: any): v is 'international' => v === TagSlugProperty.international
export const isIncare = (v: any): v is 'incare' => v === TagSlugProperty.incare
export const isProgramming = (v: any): v is 'programming' => v === TagSlugProperty.programming
export const isVolunteer = (v: any): v is 'volunteer' => v === TagSlugProperty.volunteer
export const isActiveActivity = (v: any): v is 'active_activity' => v === TagSlugProperty.active_activity
export const isLoose = (v: any): v is 'loose' => v === TagSlugProperty.loose
export const isMonday = (v: any): v is 'monday' => v === TagSlugProperty.monday
export const isTuesday = (v: any): v is 'tuesday' => v === TagSlugProperty.tuesday
export const isWednesday = (v: any): v is 'wednesday' => v === TagSlugProperty.wednesday
export const isThursday = (v: any): v is 'thursday' => v === TagSlugProperty.thursday
export const isFriday = (v: any): v is 'friday' => v === TagSlugProperty.friday
export const isOnlyMonday = (v: any): v is 'only_monday' => v === TagSlugProperty.only_monday
export const isOnlyTuesday = (v: any): v is 'only_tuesday' => v === TagSlugProperty.only_tuesday
export const isOnlyWednesday = (v: any): v is 'only_wednesday' => v === TagSlugProperty.only_wednesday
export const isOnlyThursday = (v: any): v is 'only_thursday' => v === TagSlugProperty.only_thursday
export const isOnlyFriday = (v: any): v is 'only_friday' => v === TagSlugProperty.only_friday
export const isHoliday = (v: any): v is 'holiday' => v === TagSlugProperty.holiday
export const isMammoth = (v: any): v is 'mammoth' => v === TagSlugProperty.mammoth
export const isUrgentRecruitment = (v: any): v is 'urgent_recruitment' => v === TagSlugProperty.urgent_recruitment
export const isMystery = (v: any): v is 'mystery' => v === TagSlugProperty.mystery
export const isOnline = (v: any): v is 'online' => v === TagSlugProperty.online
export const isMine = (v: any): v is 'mine' => v === TagSlugProperty.mine
export const isYoto = (v: any): v is 'yoto' => v === TagSlugProperty.yoto
