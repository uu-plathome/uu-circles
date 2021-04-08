export const isDate = (strDate: string) => {
  // 空文字は無視
  if (strDate === '') {
    return true
  }

  // 年/月/日の形式のみ許容する
  if (!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDate)
  if (
    date.getFullYear().toString() !== strDate.split('/')[0] ||
    date.getMonth().toString() !==
      (Number(strDate.split('/')[1]) - 1).toString() ||
    date.getDate().toString() !== strDate.split('/')[2]
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
      /^\d{4}\/\d{1,2}\/\d{1,2} ([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    )
  ) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDatetime)
  const strDatetimeSplit = strDatetime.split('/')
  const strDateDate = strDatetimeSplit[2].split(' ')[0]
  const strTime = strDatetimeSplit[2].split(' ')[1].split(':')
  const strDatetimeHour = strTime[0]
  const strDatetimeMinute = strTime[1]
  if (
    date.getFullYear() !== Number(strDatetimeSplit[0]) ||
    date.getMonth() !== Number(strDatetimeSplit[1]) - 1 ||
    date.getDate() !== Number(strDateDate) ||
    date.getHours() !== Number(strDatetimeHour) ||
    date.getMinutes() !== Number(strDatetimeMinute)
  ) {
    return false
  }

  return true
}
