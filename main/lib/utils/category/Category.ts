import { CircleType } from '@/lib/enum/api/CircleType'
import { Category } from '@/lib/enum/app/Category'

export const categoryToCircleType = (category: Category) => {
  if (category === Category.officialOrganization) {
    return CircleType.OFFICIAL_ORGANIZATION
  }

  if (category === Category.unofficialOrganization) {
    return CircleType.UNOFFICIAL_ORGANIZATION
  }

  if (category === Category.studentGroup) {
    return CircleType.STUDENT_GROUP
  }

  if (category === Category.club) {
    return 'CLUB'
  }

  console.error(`categoryToCircleType is ${category}`)
}
