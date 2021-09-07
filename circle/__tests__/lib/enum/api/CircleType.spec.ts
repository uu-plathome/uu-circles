import * as TestFunc from '@/src/lib/enum/api/CircleType'

describe('Enum CircleType', () => {
  it('isOfficialOrganization', () => {
    expect(TestFunc.CircleType.OFFICIAL_ORGANIZATION).toBe(
      'OFFICIAL_ORGANIZATION'
    )
    expect(TestFunc.isCircleType('OFFICIAL_ORGANIZATION')).toBeTruthy()
    expect(
      TestFunc.isOfficialOrganization('OFFICIAL_ORGANIZATION')
    ).toBeTruthy()
    expect(TestFunc.isOfficialOrganization('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUnofficialOrganization', () => {
    expect(TestFunc.CircleType.UNOFFICIAL_ORGANIZATION).toBe(
      'UNOFFICIAL_ORGANIZATION'
    )
    expect(TestFunc.isCircleType('UNOFFICIAL_ORGANIZATION')).toBeTruthy()
    expect(
      TestFunc.isUnofficialOrganization('UNOFFICIAL_ORGANIZATION')
    ).toBeTruthy()
    expect(TestFunc.isUnofficialOrganization('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isSendingOrganization', () => {
    expect(TestFunc.CircleType.SENDING_ORGANIZATION).toBe(
      'SENDING_ORGANIZATION'
    )
    expect(TestFunc.isCircleType('SENDING_ORGANIZATION')).toBeTruthy()
    expect(TestFunc.isSendingOrganization('SENDING_ORGANIZATION')).toBeTruthy()
    expect(TestFunc.isSendingOrganization('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isStudentGroup', () => {
    expect(TestFunc.CircleType.STUDENT_GROUP).toBe('STUDENT_GROUP')
    expect(TestFunc.isCircleType('STUDENT_GROUP')).toBeTruthy()
    expect(TestFunc.isStudentGroup('STUDENT_GROUP')).toBeTruthy()
    expect(TestFunc.isStudentGroup('aaaaabbbbcccc')).toBeFalsy()
  })
})
