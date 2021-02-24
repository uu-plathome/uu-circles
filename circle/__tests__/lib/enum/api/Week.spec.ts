import * as TestFunc from '@/lib/enum/api/Week'

describe('Enum Week', () => {
  it('isMonday', () => {
    expect(TestFunc.Week.MONDAY).toBe('MONDAY')
    expect(TestFunc.isWeek('MONDAY')).toBeTruthy()
    expect(TestFunc.isMonday('MONDAY')).toBeTruthy()
    expect(TestFunc.isMonday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isTuesday', () => {
    expect(TestFunc.Week.TUESDAY).toBe('TUESDAY')
    expect(TestFunc.isWeek('TUESDAY')).toBeTruthy()
    expect(TestFunc.isTuesday('TUESDAY')).toBeTruthy()
    expect(TestFunc.isTuesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isWednesday', () => {
    expect(TestFunc.Week.WEDNESDAY).toBe('WEDNESDAY')
    expect(TestFunc.isWeek('WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isWednesday('WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isWednesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isThursday', () => {
    expect(TestFunc.Week.THURSDAY).toBe('THURSDAY')
    expect(TestFunc.isWeek('THURSDAY')).toBeTruthy()
    expect(TestFunc.isThursday('THURSDAY')).toBeTruthy()
    expect(TestFunc.isThursday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isFriday', () => {
    expect(TestFunc.Week.FRIDAY).toBe('FRIDAY')
    expect(TestFunc.isWeek('FRIDAY')).toBeTruthy()
    expect(TestFunc.isFriday('FRIDAY')).toBeTruthy()
    expect(TestFunc.isFriday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isSaturday', () => {
    expect(TestFunc.Week.SATURDAY).toBe('SATURDAY')
    expect(TestFunc.isWeek('SATURDAY')).toBeTruthy()
    expect(TestFunc.isSaturday('SATURDAY')).toBeTruthy()
    expect(TestFunc.isSaturday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isSunday', () => {
    expect(TestFunc.Week.SUNDAY).toBe('SUNDAY')
    expect(TestFunc.isWeek('SUNDAY')).toBeTruthy()
    expect(TestFunc.isSunday('SUNDAY')).toBeTruthy()
    expect(TestFunc.isSunday('aaaaabbbbcccc')).toBeFalsy()
  })
})
