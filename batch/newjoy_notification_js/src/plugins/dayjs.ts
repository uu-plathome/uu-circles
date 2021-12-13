import dayjs from 'dayjs'
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import 'dayjs/locale/ja'

// dayjs の初期化
// タイムゾーン
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')
// 日本語化
dayjs.locale(`ja`)

export { dayjs }
