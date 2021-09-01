/**
 * 16進数のカラーコードからRGB値を取得する
 *
 * @param rgb 16進数で表したもの ex.#112233
 */
export const rgba = (rgb: string, a: number) => {
  if (!rgb) {
    throw new TypeError('rgbに値がセットされていません。')
  }

  if (a < 0 || a > 1) {
    throw new TypeError(`aは0から1の間で指定してください。 a=${a}`)
  }

  if (!isHex(rgb)) {
    throw new TypeError(`rgbは16進数で指定してください。 rgb=${rgb}`)
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

/**
 * カラーコードかどうかを判定する
 *
 * @param hex
 * @returns
 */
const isHex = (hex: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}
