import * as TestFunc from '@/lib/enum/api/Role'

describe('Enum Role', () => {
  it('isSystem', () => {
    expect(TestFunc.Role.SYSTEM).toBe('SYSTEM')
    expect(TestFunc.isRole('SYSTEM')).toBeTruthy()
    expect(TestFunc.isSystem('SYSTEM')).toBeTruthy()
    expect(TestFunc.isSystem('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isManager', () => {
    expect(TestFunc.Role.MANAGER).toBe('MANAGER')
    expect(TestFunc.isRole('MANAGER')).toBeTruthy()
    expect(TestFunc.isManager('MANAGER')).toBeTruthy()
    expect(TestFunc.isManager('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isCommon', () => {
    expect(TestFunc.Role.COMMON).toBe('COMMON')
    expect(TestFunc.isRole('COMMON')).toBeTruthy()
    expect(TestFunc.isCommon('COMMON')).toBeTruthy()
    expect(TestFunc.isCommon('aaaaabbbbcccc')).toBeFalsy()
  })
})
