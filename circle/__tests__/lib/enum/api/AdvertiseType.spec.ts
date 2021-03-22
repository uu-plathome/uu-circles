import * as TestFunc from '@/lib/enum/api/AdvertiseType'

describe('Enum AdvertiseType', () => {
  it('isCommon', () => {
    expect(TestFunc.AdvertiseType.COMMON).toBe('COMMON')
    expect(TestFunc.isAdvertiseType('COMMON')).toBeTruthy()
    expect(TestFunc.isCommon('COMMON')).toBeTruthy()
    expect(TestFunc.isCommon('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMainTop', () => {
    expect(TestFunc.AdvertiseType.MAIN_TOP).toBe('MAIN_TOP')
    expect(TestFunc.isAdvertiseType('MAIN_TOP')).toBeTruthy()
    expect(TestFunc.isMainTop('MAIN_TOP')).toBeTruthy()
    expect(TestFunc.isMainTop('aaaaabbbbcccc')).toBeFalsy()
  })
})
