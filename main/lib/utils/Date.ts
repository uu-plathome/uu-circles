//曜日を取得する関数
import dayjs from 'dayjs'

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
export const getMonth = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('M')

}
export const getDay = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('D')

}
export const getDate = (originStartDate: Date|string) => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  return date.format('YYYY/MM/DD')
  

}
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