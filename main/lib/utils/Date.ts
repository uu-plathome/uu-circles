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