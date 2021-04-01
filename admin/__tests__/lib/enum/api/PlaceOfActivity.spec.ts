import * as TestFunc from '@/lib/enum/api/PlaceOfActivity'

describe('Enum PlaceOfActivity', () => {
  it('isMine', () => {
    expect(TestFunc.PlaceOfActivity.MINE).toBe('MINE')
    expect(TestFunc.isPlaceOfActivity('MINE')).toBeTruthy()
    expect(TestFunc.isMine('MINE')).toBeTruthy()
    expect(TestFunc.isMine('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isYoto', () => {
    expect(TestFunc.PlaceOfActivity.YOTO).toBe('YOTO')
    expect(TestFunc.isPlaceOfActivity('YOTO')).toBeTruthy()
    expect(TestFunc.isYoto('YOTO')).toBeTruthy()
    expect(TestFunc.isYoto('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMineAndYoto', () => {
    expect(TestFunc.PlaceOfActivity.MINE_AND_YOTO).toBe('MINE_AND_YOTO')
    expect(TestFunc.isPlaceOfActivity('MINE_AND_YOTO')).toBeTruthy()
    expect(TestFunc.isMineAndYoto('MINE_AND_YOTO')).toBeTruthy()
    expect(TestFunc.isMineAndYoto('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isNewjoyDiscord', () => {
    expect(TestFunc.PlaceOfActivity.NEWJOY_DISCORD).toBe('NEWJOY_DISCORD')
    expect(TestFunc.isPlaceOfActivity('NEWJOY_DISCORD')).toBeTruthy()
    expect(TestFunc.isNewjoyDiscord('NEWJOY_DISCORD')).toBeTruthy()
    expect(TestFunc.isNewjoyDiscord('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isZoom', () => {
    expect(TestFunc.PlaceOfActivity.ZOOM).toBe('ZOOM')
    expect(TestFunc.isPlaceOfActivity('ZOOM')).toBeTruthy()
    expect(TestFunc.isZoom('ZOOM')).toBeTruthy()
    expect(TestFunc.isZoom('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isDiscord', () => {
    expect(TestFunc.PlaceOfActivity.DISCORD).toBe('DISCORD')
    expect(TestFunc.isPlaceOfActivity('DISCORD')).toBeTruthy()
    expect(TestFunc.isDiscord('DISCORD')).toBeTruthy()
    expect(TestFunc.isDiscord('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOther', () => {
    expect(TestFunc.PlaceOfActivity.OTHER).toBe('OTHER')
    expect(TestFunc.isPlaceOfActivity('OTHER')).toBeTruthy()
    expect(TestFunc.isOther('OTHER')).toBeTruthy()
    expect(TestFunc.isOther('aaaaabbbbcccc')).toBeFalsy()
  })
})
