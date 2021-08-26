import { ImagePath } from '@/src/lib/enum/app/ImagePath'

/**
 * Utaの色リスト
 */
export const UtaColorList = {
  BLUE: 'BLUE',
  GRAY: 'GRAY',
  GREEN: 'GREEN',
  ORANGE: 'ORANGE',
  PINK: 'PINK',
  PURPLE: 'PURPLE',
  YELLOW: 'YELLOW',
} as const
/**
 * Utaの色リスト
 */
export type UtaColorList = typeof UtaColorList[keyof typeof UtaColorList]

/**
 * Utaの画像リスト
 */
export const UtaImagePath = {
  [UtaColorList.BLUE]: ImagePath.UTA_ICON[UtaColorList.BLUE],
  [UtaColorList.GRAY]: ImagePath.UTA_ICON[UtaColorList.GRAY],
  [UtaColorList.GREEN]: ImagePath.UTA_ICON[UtaColorList.GREEN],
  [UtaColorList.ORANGE]: ImagePath.UTA_ICON[UtaColorList.ORANGE],
  [UtaColorList.PINK]: ImagePath.UTA_ICON[UtaColorList.PINK],
  [UtaColorList.PURPLE]: ImagePath.UTA_ICON[UtaColorList.PURPLE],
  [UtaColorList.YELLOW]: ImagePath.UTA_ICON[UtaColorList.YELLOW],
} as const
