import { CircleType } from '@/lib/enum/api/CircleType'
import { DateOfActivity } from '@/lib/enum/api/DateOfActivity'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'

export const ja = {
  [CircleType.OFFICIAL_ORGANIZATION]: '公認団体',
  [CircleType.UNOFFICIAL_ORGANIZATION]: '非公認団体',
  [CircleType.SENDING_ORGANIZATION]: '届出団体',
  [CircleType.STUDENT_GROUP]: '学生団体',
  [DateOfActivity.EVERY_WEEK]: '毎週',
  [DateOfActivity.EVERY_OTHER_WEEK]: '隔週',
  [PlaceOfActivity.MINE]: '峰キャンパス',
  [PlaceOfActivity.MINE_AND_YOTO]: '峰と陽東キャンパス',
  [PlaceOfActivity.YOTO]: '陽東キャンパス',
  [PlaceOfActivity.OTHER]: 'その他',
}

export const __ = (key: string) => (ja[key] ? ja[key] : key)
