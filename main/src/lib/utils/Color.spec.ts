import * as ColorFunc from './Color'

describe('Color', () => {
  describe('Color/rgba Success', () => {
    type TestCase = {
      arg: Parameters<typeof ColorFunc.rgba>
      expected: ReturnType<typeof ColorFunc.rgba>
    }
    const testCases: TestCase[]  = [
      {
        arg: ['#ffffff', 1],
        expected: 'rgba(255, 255, 255, 1)'
      },
      {
        arg: ['#ffffff', 0.5],
        expected: 'rgba(255, 255, 255, 0.5)'
      },
      {
        arg: ['#ffffff', 0],
        expected: 'rgba(255, 255, 255, 0)'
      },
      {
        arg: ['#333333', 1],
        expected: 'rgba(51, 51, 51, 1)'
      },
      {
        arg: ['#333333', 0.5],
        expected: 'rgba(51, 51, 51, 0.5)'
      },
      {
        arg: ['#333333', 0],
        expected: 'rgba(51, 51, 51, 0)'
      },
      {
        arg: ['#000000', 1],
        expected: 'rgba(0, 0, 0, 1)'
      },
      {
        arg: ['#000000', 0.5],
        expected: 'rgba(0, 0, 0, 0.5)'
      },
      {
        arg: ['#000000', 0],
        expected: 'rgba(0, 0, 0, 0)'
      },
    ]

    testCases.forEach(({ arg, expected }) => {
      it(`${arg} => ${expected}`, () => {
        expect(ColorFunc.rgba(...arg)).toBe(expected)
      })
    })
  })

  describe('Color/rgba TypeError', () => {
    type TestCase = {
      arg: Parameters<typeof ColorFunc.rgba>
    }
    const testCases: TestCase[]  = [
      {
        arg: ['#ffffff', -1],
      },
      {
        arg: ['#ffffff', 1.1],
      },
      {
        arg: ['#ffffff', 2],
      },
      {
        arg: ['#f', 0],
      },
      {
        arg: ['#ff', 0],
      },
      {
        arg: ['#ffff', 0],
      },
      {
        arg: ['#fffff', 0],
      },
      {
        arg: ['#fffffff', 0],
      },
      {
        arg: ['fff', 0],
      },
      {
        arg: ['ffffff', 0],
      },
      {
        arg: ['', 0],
      },
      {
        arg: ['#kkkkkk', 0],
      },
    ]

    testCases.forEach(({ arg }) => {
      it(`${arg} => TypeError`, () => {
        expect(() => ColorFunc.rgba(...arg)).toThrow(TypeError)
      })
    })
  })
})
