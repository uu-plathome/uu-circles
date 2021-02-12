import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
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
  [CircleTagModel.NATURE]: '農業・自然',
  [CircleTagModel.VOLUNTEER]: 'ボランティア',
  [CircleTagModel.INTERNATIONAL]: '国際交流',
  [CircleTagModel.INCARE]: 'インカレ',
  [CircleTagModel.LOOSE]: 'ゆるい',
  [CircleTagModel.COMMUNITY]: '地域おこし',
  [CircleTagModel.PROGRAMMING]: 'プログラミング',
  [CircleTagModel.URGENT_RECRUITMENT]: '部員急募',
  [CircleTagModel.MYSTERY]: '謎',
  [CircleTagModel.ACTIVE_ACTIVITY]: '週5以上',
  [CircleTagModel.MAMMOTH]: 'マンモス',
  [CircleTagModel.MONDAY]: '月曜日活動',
  [CircleTagModel.TUESDAY]: '火曜日活動',
  [CircleTagModel.WEDNESDAY]: '水曜日活動',
  [CircleTagModel.THURSDAY]: '木曜日活動',
  [CircleTagModel.FRIDAY]: '金曜日活動',
  [CircleTagModel.ONLY_MONDAY]: '月曜日のみ活動',
  [CircleTagModel.ONLY_TUESDAY]: '火曜日のみ活動',
  [CircleTagModel.ONLY_WEDNESDAY]: '水曜日のみ活動',
  [CircleTagModel.ONLY_THURSDAY]: '木曜日のみ活動',
  [CircleTagModel.ONLY_FRIDAY]: '金曜日のみ活動',
  [CircleTagModel.HOLIDAY]: '休日活動',
}

export const __ = (key: string) => (ja[key] ? ja[key] : key)
