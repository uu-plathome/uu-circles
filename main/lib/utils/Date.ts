//曜日を取得する関数
import dayjs from 'dayjs'
//originStartDateには開始日が入ります。


//曜日を返す
export const  getDOW = (originStartDate: Date|string) => {
        if(!originStartDate)  {
          return '未定'
        }
        const date = dayjs(originStartDate);
        const DOWList = ['日', '月', '火', '水', '木', '金', '土']; //dayjsは日曜始まり
        const DOW = DOWList[date.day()];
        return DOW;
}

// import getDOW as gtag from '@/lib/utils/GetDOW'
//月を返す
export const getMonth = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('M')

}


//日にちを返す
export const getDay = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('D')

}


//2021/2/4などを返す
export const getDate = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('YYYY/MM/DD')
  

}


//18:00-21:00などを返す
export const getTime = (originStartDate: Date|string,originEndDate: Date|string) => {
  if (originStartDate && originEndDate) {
    const startDate = dayjs(originStartDate)
    const endDate = dayjs(originEndDate)

    return `${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`
  }

  if (originStartDate) {
    const startDate = dayjs(originStartDate)

    return `${startDate.format('HH:mm')}-`
  }

  if (originEndDate) {
    const endDate = dayjs(originEndDate)

    return `-${endDate.format('HH:mm')}`
  }

  return '未定'
}


//2021年2月26日　18:00-21:00などを返す
export const getFullJPDate =(originStartDate: Date|string,originEndDate: Date|string)=>{
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  const fullDate=date.format('YYYY年M月D日')
  
  return (fullDate+"　"+getTime(originStartDate,originEndDate))
}

export const isDate = (strDate: string) => {
  // 空文字は無視
  if (strDate === '') {
    return true
  }

  // 年/月/日の形式のみ許容する
  if (!strDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDate)
  if (
    date.getFullYear().toString() !== strDate.split('-')[0] ||
    date.getMonth().toString() !==
      (Number(strDate.split('-')[1]) - 1).toString() ||
    date.getDate().toString() !== strDate.split('-')[2]
  ) {
    return false
  }

  return true
}

export const isDatetime = (strDatetime: string) => {
  // 空文字は無視
  if (strDatetime === '') {
    return true
  }

  // 年/月/日 時:分の形式のみ許容する
  if (
    !strDatetime.match(
      /^\d{4}-\d{1,2}-\d{1,2} ([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    )
  ) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDatetime)
  const strDatetimeSplit = strDatetime.split('-')
  const strDateDate = strDatetimeSplit[2].split(' ')[0]
  const strTime = strDatetimeSplit[2].split(' ')[1].split(':')
  const strDatetimehour = strTime[0]
  const strDatetimeMinute = strTime[1]
  if (
    date.getFullYear() !== Number(strDatetimeSplit[0]) ||
    date.getMonth() !== Number(strDatetimeSplit[1]) - 1 ||
    date.getDate() !== Number(strDateDate) ||
    date.getHours() !== Number(strDatetimehour) ||
    date.getMinutes() !== Number(strDatetimeMinute)
  ) {
    return false
  }

  return true
}
