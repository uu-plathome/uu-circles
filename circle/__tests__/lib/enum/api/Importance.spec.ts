import * as TestFunc from '@/lib/enum/api/Importance'

describe('Enum Importance', () => {
  it('isHigh', () => {
    expect(TestFunc.Importance.HIGH).toBe('HIGH')
    expect(TestFunc.isImportance('HIGH')).toBeTruthy()
    expect(TestFunc.isHigh('HIGH')).toBeTruthy()
    expect(TestFunc.isHigh('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMiddle', () => {
    expect(TestFunc.Importance.MIDDLE).toBe('MIDDLE')
    expect(TestFunc.isImportance('MIDDLE')).toBeTruthy()
    expect(TestFunc.isMiddle('MIDDLE')).toBeTruthy()
    expect(TestFunc.isMiddle('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isLow', () => {
    expect(TestFunc.Importance.LOW).toBe('LOW')
    expect(TestFunc.isImportance('LOW')).toBeTruthy()
    expect(TestFunc.isLow('LOW')).toBeTruthy()
    expect(TestFunc.isLow('aaaaabbbbcccc')).toBeFalsy()
  })
})
