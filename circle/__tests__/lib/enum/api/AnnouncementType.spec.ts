import * as TestFunc from '@/lib/enum/api/AnnouncementType'

describe('Enum AnnouncementType', () => {
  it('isMaintenance', () => {
    expect(TestFunc.AnnouncementType.MAINTENANCE).toBe('MAINTENANCE')
    expect(TestFunc.isAnnouncementType('MAINTENANCE')).toBeTruthy()
    expect(TestFunc.isMaintenance('MAINTENANCE')).toBeTruthy()
    expect(TestFunc.isMaintenance('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUpdateFeature', () => {
    expect(TestFunc.AnnouncementType.UPDATE_FEATURE).toBe('UPDATE_FEATURE')
    expect(TestFunc.isAnnouncementType('UPDATE_FEATURE')).toBeTruthy()
    expect(TestFunc.isUpdateFeature('UPDATE_FEATURE')).toBeTruthy()
    expect(TestFunc.isUpdateFeature('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isBug', () => {
    expect(TestFunc.AnnouncementType.BUG).toBe('BUG')
    expect(TestFunc.isAnnouncementType('BUG')).toBeTruthy()
    expect(TestFunc.isBug('BUG')).toBeTruthy()
    expect(TestFunc.isBug('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isNewCircle', () => {
    expect(TestFunc.AnnouncementType.NEW_CIRCLE).toBe('NEW_CIRCLE')
    expect(TestFunc.isAnnouncementType('NEW_CIRCLE')).toBeTruthy()
    expect(TestFunc.isNewCircle('NEW_CIRCLE')).toBeTruthy()
    expect(TestFunc.isNewCircle('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isEvent', () => {
    expect(TestFunc.AnnouncementType.EVENT).toBe('EVENT')
    expect(TestFunc.isAnnouncementType('EVENT')).toBeTruthy()
    expect(TestFunc.isEvent('EVENT')).toBeTruthy()
    expect(TestFunc.isEvent('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isQuestionnaire', () => {
    expect(TestFunc.AnnouncementType.QUESTIONNAIRE).toBe('QUESTIONNAIRE')
    expect(TestFunc.isAnnouncementType('QUESTIONNAIRE')).toBeTruthy()
    expect(TestFunc.isQuestionnaire('QUESTIONNAIRE')).toBeTruthy()
    expect(TestFunc.isQuestionnaire('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isAdvertise', () => {
    expect(TestFunc.AnnouncementType.ADVERTISE).toBe('ADVERTISE')
    expect(TestFunc.isAnnouncementType('ADVERTISE')).toBeTruthy()
    expect(TestFunc.isAdvertise('ADVERTISE')).toBeTruthy()
    expect(TestFunc.isAdvertise('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUuYell', () => {
    expect(TestFunc.AnnouncementType.UU_YELL).toBe('UU_YELL')
    expect(TestFunc.isAnnouncementType('UU_YELL')).toBeTruthy()
    expect(TestFunc.isUuYell('UU_YELL')).toBeTruthy()
    expect(TestFunc.isUuYell('aaaaabbbbcccc')).toBeFalsy()
  })
})
