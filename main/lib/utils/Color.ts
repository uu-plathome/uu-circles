/**
 * @param rgb 16進数で表したもの ex.#112233
 */
export const rgba = (rgb: string, a: number) => {
  if (!rgb) {
    throw new Error('rgbに値がセットされていません。')
  }

  if (!rgb.startsWith('#')) {
    throw new Error(`rgbは # から始めてください。 rgb=${rgb}`)
  }

  if (rgb.length !== 4 && rgb.length !== 7) {
    throw new Error(`rgbは3文字か6文字で指定してください。 rgb=${rgb}`)
  }

  const rgbSplit = rgb.slice(1).split('')
  const newRgb =
    rgb.length === 7
      ? rgb.slice(1)
      : `${rgbSplit[0]}${rgbSplit[0]}${rgbSplit[1]}${rgbSplit[1]}${rgbSplit[2]}${rgbSplit[2]}`

  const newRgbSplit = newRgb.split('')

  const r = parseInt(`${newRgbSplit[0]}${newRgbSplit[1]}`, 16)
  const g = parseInt(`${newRgbSplit[2]}${newRgbSplit[3]}`, 16)
  const b = parseInt(`${newRgbSplit[4]}${newRgbSplit[5]}`, 16)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}
