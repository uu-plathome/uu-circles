import * as TestFunc from '@/lib/enum/api/DemoCircleNewjoyType'

describe('Enum DemoCircleNewjoyType', () => {
  it('isNow', () => {
    expect(TestFunc.DemoCircleNewjoyType.NOW).toBe('NOW')
    expect(TestFunc.isDemoCircleNewjoyType('NOW')).toBeTruthy()
    expect(TestFunc.isNow('NOW')).toBeTruthy()
    expect(TestFunc.isNow('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isToday', () => {
    expect(TestFunc.DemoCircleNewjoyType.TODAY).toBe('TODAY')
    expect(TestFunc.isDemoCircleNewjoyType('TODAY')).toBeTruthy()
    expect(TestFunc.isToday('TODAY')).toBeTruthy()
    expect(TestFunc.isToday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isFuture', () => {
    expect(TestFunc.DemoCircleNewjoyType.FUTURE).toBe('FUTURE')
    expect(TestFunc.isDemoCircleNewjoyType('FUTURE')).toBeTruthy()
    expect(TestFunc.isFuture('FUTURE')).toBeTruthy()
    expect(TestFunc.isFuture('aaaaabbbbcccc')).toBeFalsy()
  })
})
