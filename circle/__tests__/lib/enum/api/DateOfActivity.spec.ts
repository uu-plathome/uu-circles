import * as TestFunc from '@/lib/enum/api/DateOfActivity'

describe('Enum DateOfActivity', () => {
  it('isEveryWeek', () => {
    expect(TestFunc.DateOfActivity.EVERY_WEEK).toBe('EVERY_WEEK')
    expect(TestFunc.isDateOfActivity('EVERY_WEEK')).toBeTruthy()
    expect(TestFunc.isEveryWeek('EVERY_WEEK')).toBeTruthy()
    expect(TestFunc.isEveryWeek('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isEveryOtherWeek', () => {
    expect(TestFunc.DateOfActivity.EVERY_OTHER_WEEK).toBe('EVERY_OTHER_WEEK')
    expect(TestFunc.isDateOfActivity('EVERY_OTHER_WEEK')).toBeTruthy()
    expect(TestFunc.isEveryOtherWeek('EVERY_OTHER_WEEK')).toBeTruthy()
    expect(TestFunc.isEveryOtherWeek('aaaaabbbbcccc')).toBeFalsy()
  })
})
