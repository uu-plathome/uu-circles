import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { DateOfActivity } from '@/src/lib/enum/api/DateOfActivity'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { Role } from '@/src/lib/enum/api/Role'
import { Week } from '@/src/lib/enum/api/Week'

export const ja = {
  [CircleType._type]: {
    [CircleType.OFFICIAL_ORGANIZATION]: '公認団体',
    [CircleType.UNOFFICIAL_ORGANIZATION]: '非公認団体',
    [CircleType.SENDING_ORGANIZATION]: '届出団体',
    [CircleType.STUDENT_GROUP]: '学生団体',
  },
  [DateOfActivity._type]: {
    [DateOfActivity.EVERY_WEEK]: '毎週',
    [DateOfActivity.EVERY_OTHER_WEEK]: '隔週',
  },
  [PlaceOfActivity._type]: {
    [PlaceOfActivity.MINE]: '峰キャンパス',
    [PlaceOfActivity.MINE_AND_YOTO]: '峰と陽東キャンパス',
    [PlaceOfActivity.YOTO]: '陽東キャンパス',
    [PlaceOfActivity.NEWJOY_DISCORD]: '新歓ディスコード',
    [PlaceOfActivity.DISCORD]: 'ディスコード',
    [PlaceOfActivity.ZOOM]: 'Zoom',
    [PlaceOfActivity.OTHER]: 'その他',
  },
  [CircleTagModel.NATURE]: '農業・自然',
  [CircleTagModel.SPORT]: '運動系',
  [CircleTagModel.MUSIC]: '音楽系',
  [CircleTagModel.CULTURE]: '文化系',
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
  CircleUserRole: {
    [Role.MANAGER]: 'サークル管理者',
    [Role.COMMON]: '一般ユーザー',
  },
  Role: {
    [Role.SYSTEM]: 'システム管理者',
    [Role.MANAGER]: '管理者',
    [Role.COMMON]: '一般ユーザー',
  },
  [Week._type]: {
    [Week.MONDAY]: '月曜日',
    [Week.TUESDAY]: '火曜日',
    [Week.WEDNESDAY]: '水曜日',
    [Week.THURSDAY]: '木曜日',
    [Week.FRIDAY]: '金曜日',
    [Week.SATURDAY]: '土曜日',
    [Week.SUNDAY]: '日曜日',
  },
}

export const __ = (key: string, namespace?: string) => {
  try {
    if (!namespace) {
      return ja[key] ? ja[key] : key
    }

    return ja[namespace][key] ? ja[namespace][key] : key
  } catch (e) {
    return key
  }
}
