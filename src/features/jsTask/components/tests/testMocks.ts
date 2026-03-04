export type TestCase = {
  id: string
  inputData: string
  expectedResult: string
  yourResult: string
  passed: boolean
}

export type FullResults = {
  kind: 'full'
  cases: TestCase[]
}

export type QuickResults = {
  kind: 'quick'
  expectedResult: string
  yourResult: string
  passed: boolean
}

export type AnyResults = FullResults | QuickResults

export const mockFullTestCases: TestCase[] = [
  {
    id: '1',
    inputData: '{\n  arr: ["a","b","c"],\n  id: "123"\n}',
    expectedResult: '["a","b","c", 1, 2, 3]',
    yourResult: '["a","b","c", 1, 2, 3]',
    passed: true,
  },
  {
    id: '2',
    inputData: '{\n  arr: ["a","b","c"],\n  id: "123"\n}',
    expectedResult: '["a","b","c", 1, 2, 3]',
    yourResult: '["a","b","c", 1, 2, 3]',
    passed: false,
  },
  {
    id: '3',
    inputData: '{\n  arr: ["a","b","c"],\n  id: "123"\n}',
    expectedResult: '["a","b","c", 1, 2, 3]',
    yourResult: '["a","b","c", 1, 2, 3]',
    passed: true,
  },
  {
    id: '4',
    inputData: '{\n  arr: ["a","b","c"],\n  id: "123"\n}',
    expectedResult: '["a","b","c", 1, 2, 3]',
    yourResult: '["a","b","c", 1, 2, 3]',
    passed: false,
  },
]

export const buildMockQuickResult = (inputData: string): QuickResults => {
  const passed = inputData.includes('id') && inputData.includes('123')

  return {
    kind: 'quick',
    expectedResult: '["a","b","c", 1, 2, 3]',
    yourResult: passed ? '["a","b","c", 1, 2, 3]' : '["a","b","c"]',
    passed,
  }
}
