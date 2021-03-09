/**
 * カタカナをひらがなにする
 *
 * @param str
 * @returns
 */
export const kanaToHira = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    const chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

/**
 * ひらがなをカタカナにする
 *
 * @param str
 * @returns
 */
export const HiraToKana = (str: string) => {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  })
}
