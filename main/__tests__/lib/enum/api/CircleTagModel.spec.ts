import * as TestFunc from '@/lib/enum/api/CircleTagModel'

describe('Enum CircleTagModel', () => {
  it('isSport', () => {
    expect(TestFunc.CircleTagModel.SPORT).toBe('SPORT')
    expect(TestFunc.isCircleTagModel('SPORT')).toBeTruthy()
    expect(TestFunc.isSport('SPORT')).toBeTruthy()
    expect(TestFunc.isSport('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMusic', () => {
    expect(TestFunc.CircleTagModel.MUSIC).toBe('MUSIC')
    expect(TestFunc.isCircleTagModel('MUSIC')).toBeTruthy()
    expect(TestFunc.isMusic('MUSIC')).toBeTruthy()
    expect(TestFunc.isMusic('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isCulture', () => {
    expect(TestFunc.CircleTagModel.CULTURE).toBe('CULTURE')
    expect(TestFunc.isCircleTagModel('CULTURE')).toBeTruthy()
    expect(TestFunc.isCulture('CULTURE')).toBeTruthy()
    expect(TestFunc.isCulture('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isNature', () => {
    expect(TestFunc.CircleTagModel.NATURE).toBe('NATURE')
    expect(TestFunc.isCircleTagModel('NATURE')).toBeTruthy()
    expect(TestFunc.isNature('NATURE')).toBeTruthy()
    expect(TestFunc.isNature('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isVolunteer', () => {
    expect(TestFunc.CircleTagModel.VOLUNTEER).toBe('VOLUNTEER')
    expect(TestFunc.isCircleTagModel('VOLUNTEER')).toBeTruthy()
    expect(TestFunc.isVolunteer('VOLUNTEER')).toBeTruthy()
    expect(TestFunc.isVolunteer('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isInternational', () => {
    expect(TestFunc.CircleTagModel.INTERNATIONAL).toBe('INTERNATIONAL')
    expect(TestFunc.isCircleTagModel('INTERNATIONAL')).toBeTruthy()
    expect(TestFunc.isInternational('INTERNATIONAL')).toBeTruthy()
    expect(TestFunc.isInternational('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isIncare', () => {
    expect(TestFunc.CircleTagModel.INCARE).toBe('INCARE')
    expect(TestFunc.isCircleTagModel('INCARE')).toBeTruthy()
    expect(TestFunc.isIncare('INCARE')).toBeTruthy()
    expect(TestFunc.isIncare('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isLoose', () => {
    expect(TestFunc.CircleTagModel.LOOSE).toBe('LOOSE')
    expect(TestFunc.isCircleTagModel('LOOSE')).toBeTruthy()
    expect(TestFunc.isLoose('LOOSE')).toBeTruthy()
    expect(TestFunc.isLoose('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isCommunity', () => {
    expect(TestFunc.CircleTagModel.COMMUNITY).toBe('COMMUNITY')
    expect(TestFunc.isCircleTagModel('COMMUNITY')).toBeTruthy()
    expect(TestFunc.isCommunity('COMMUNITY')).toBeTruthy()
    expect(TestFunc.isCommunity('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isProgramming', () => {
    expect(TestFunc.CircleTagModel.PROGRAMMING).toBe('PROGRAMMING')
    expect(TestFunc.isCircleTagModel('PROGRAMMING')).toBeTruthy()
    expect(TestFunc.isProgramming('PROGRAMMING')).toBeTruthy()
    expect(TestFunc.isProgramming('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUrgentRecruitment', () => {
    expect(TestFunc.CircleTagModel.URGENT_RECRUITMENT).toBe('URGENT_RECRUITMENT')
    expect(TestFunc.isCircleTagModel('URGENT_RECRUITMENT')).toBeTruthy()
    expect(TestFunc.isUrgentRecruitment('URGENT_RECRUITMENT')).toBeTruthy()
    expect(TestFunc.isUrgentRecruitment('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMystery', () => {
    expect(TestFunc.CircleTagModel.MYSTERY).toBe('MYSTERY')
    expect(TestFunc.isCircleTagModel('MYSTERY')).toBeTruthy()
    expect(TestFunc.isMystery('MYSTERY')).toBeTruthy()
    expect(TestFunc.isMystery('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isActiveActivity', () => {
    expect(TestFunc.CircleTagModel.ACTIVE_ACTIVITY).toBe('ACTIVE_ACTIVITY')
    expect(TestFunc.isCircleTagModel('ACTIVE_ACTIVITY')).toBeTruthy()
    expect(TestFunc.isActiveActivity('ACTIVE_ACTIVITY')).toBeTruthy()
    expect(TestFunc.isActiveActivity('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMammoth', () => {
    expect(TestFunc.CircleTagModel.MAMMOTH).toBe('MAMMOTH')
    expect(TestFunc.isCircleTagModel('MAMMOTH')).toBeTruthy()
    expect(TestFunc.isMammoth('MAMMOTH')).toBeTruthy()
    expect(TestFunc.isMammoth('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMonday', () => {
    expect(TestFunc.CircleTagModel.MONDAY).toBe('MONDAY')
    expect(TestFunc.isCircleTagModel('MONDAY')).toBeTruthy()
    expect(TestFunc.isMonday('MONDAY')).toBeTruthy()
    expect(TestFunc.isMonday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isTuesday', () => {
    expect(TestFunc.CircleTagModel.TUESDAY).toBe('TUESDAY')
    expect(TestFunc.isCircleTagModel('TUESDAY')).toBeTruthy()
    expect(TestFunc.isTuesday('TUESDAY')).toBeTruthy()
    expect(TestFunc.isTuesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isWednesday', () => {
    expect(TestFunc.CircleTagModel.WEDNESDAY).toBe('WEDNESDAY')
    expect(TestFunc.isCircleTagModel('WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isWednesday('WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isWednesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isThursday', () => {
    expect(TestFunc.CircleTagModel.THURSDAY).toBe('THURSDAY')
    expect(TestFunc.isCircleTagModel('THURSDAY')).toBeTruthy()
    expect(TestFunc.isThursday('THURSDAY')).toBeTruthy()
    expect(TestFunc.isThursday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isFriday', () => {
    expect(TestFunc.CircleTagModel.FRIDAY).toBe('FRIDAY')
    expect(TestFunc.isCircleTagModel('FRIDAY')).toBeTruthy()
    expect(TestFunc.isFriday('FRIDAY')).toBeTruthy()
    expect(TestFunc.isFriday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyMonday', () => {
    expect(TestFunc.CircleTagModel.ONLY_MONDAY).toBe('ONLY_MONDAY')
    expect(TestFunc.isCircleTagModel('ONLY_MONDAY')).toBeTruthy()
    expect(TestFunc.isOnlyMonday('ONLY_MONDAY')).toBeTruthy()
    expect(TestFunc.isOnlyMonday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyTuesday', () => {
    expect(TestFunc.CircleTagModel.ONLY_TUESDAY).toBe('ONLY_TUESDAY')
    expect(TestFunc.isCircleTagModel('ONLY_TUESDAY')).toBeTruthy()
    expect(TestFunc.isOnlyTuesday('ONLY_TUESDAY')).toBeTruthy()
    expect(TestFunc.isOnlyTuesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyWednesday', () => {
    expect(TestFunc.CircleTagModel.ONLY_WEDNESDAY).toBe('ONLY_WEDNESDAY')
    expect(TestFunc.isCircleTagModel('ONLY_WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isOnlyWednesday('ONLY_WEDNESDAY')).toBeTruthy()
    expect(TestFunc.isOnlyWednesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyThursday', () => {
    expect(TestFunc.CircleTagModel.ONLY_THURSDAY).toBe('ONLY_THURSDAY')
    expect(TestFunc.isCircleTagModel('ONLY_THURSDAY')).toBeTruthy()
    expect(TestFunc.isOnlyThursday('ONLY_THURSDAY')).toBeTruthy()
    expect(TestFunc.isOnlyThursday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyFriday', () => {
    expect(TestFunc.CircleTagModel.ONLY_FRIDAY).toBe('ONLY_FRIDAY')
    expect(TestFunc.isCircleTagModel('ONLY_FRIDAY')).toBeTruthy()
    expect(TestFunc.isOnlyFriday('ONLY_FRIDAY')).toBeTruthy()
    expect(TestFunc.isOnlyFriday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isHoliday', () => {
    expect(TestFunc.CircleTagModel.HOLIDAY).toBe('HOLIDAY')
    expect(TestFunc.isCircleTagModel('HOLIDAY')).toBeTruthy()
    expect(TestFunc.isHoliday('HOLIDAY')).toBeTruthy()
    expect(TestFunc.isHoliday('aaaaabbbbcccc')).toBeFalsy()
  })
})
