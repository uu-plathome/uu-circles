//曜日を取得する関数
import dayjs from 'dayjs'

export const  getDOW = (originDate: Date|string) => {

        //曜日取得関数 dayjs
    
        if(!originDate)  {
          return '未定'
        }
   
        const date = dayjs(originDate);
        const DOWList = ['日', '月', '火', '水', '木', '金', '土']; //dayjsは日曜始まり
        const DOW = DOWList[date.day()];
        return DOW;
}
// import getDOW as gtag from '@/lib/utils/GetDOW'