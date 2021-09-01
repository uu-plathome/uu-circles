import { dayjs } from '../../plugins/Dayjs'
import * as DateFunc from './Date'


describe('Date', () => {
  describe('Date/getDow', () => {
    type TestCase = {
      arg: Parameters<typeof DateFunc.getDOW>
      expected: ReturnType<typeof DateFunc.getDOW>
    }

    const testCases: TestCase[] = [
      {
        arg: [''],
        expected: '未定',
      },
      {
        arg: [dayjs(new Date("2021-09-01"))],
        expected: '水',
      },
      {
        arg: [dayjs(new Date("2021-09-02"))],
        expected: '木',
      },
      {
        arg: [dayjs("2021-09-03")],
        expected: '金',
      },
    ]

    testCases.forEach(({ arg, expected }) => {
      it(`should return ${expected}`, () => {
        expect(DateFunc.getDOW(...arg)).toBe(expected)
      })
    })
  })
})
