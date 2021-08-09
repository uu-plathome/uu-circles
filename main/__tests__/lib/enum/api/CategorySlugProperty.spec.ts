import * as TestFunc from '@/src/lib/enum/api/CategorySlugProperty'

describe('Enum CategorySlugProperty', () => {
  it('isOfficialOrganization', () => {
    expect(TestFunc.CategorySlugProperty.official_organization).toBe(
      'official_organization'
    )
    expect(
      TestFunc.isCategorySlugProperty('official_organization')
    ).toBeTruthy()
    expect(
      TestFunc.isOfficialOrganization('official_organization')
    ).toBeTruthy()
    expect(TestFunc.isOfficialOrganization('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUnofficialOrganization', () => {
    expect(TestFunc.CategorySlugProperty.unofficial_organization).toBe(
      'unofficial_organization'
    )
    expect(
      TestFunc.isCategorySlugProperty('unofficial_organization')
    ).toBeTruthy()
    expect(
      TestFunc.isUnofficialOrganization('unofficial_organization')
    ).toBeTruthy()
    expect(TestFunc.isUnofficialOrganization('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isStudentGroup', () => {
    expect(TestFunc.CategorySlugProperty.student_group).toBe('student_group')
    expect(TestFunc.isCategorySlugProperty('student_group')).toBeTruthy()
    expect(TestFunc.isStudentGroup('student_group')).toBeTruthy()
    expect(TestFunc.isStudentGroup('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isClub', () => {
    expect(TestFunc.CategorySlugProperty.club).toBe('club')
    expect(TestFunc.isCategorySlugProperty('club')).toBeTruthy()
    expect(TestFunc.isClub('club')).toBeTruthy()
    expect(TestFunc.isClub('aaaaabbbbcccc')).toBeFalsy()
  })
})
