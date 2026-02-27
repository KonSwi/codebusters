import { PrismaClient, Category } from '@prisma/client'

const jsAssignmentsSeed = [
  {
    name: 'Reverse string',
    descriptionStart: 'Napisz funkcję, która odwraca ciąg znaków.',
    descriptionEnd: 'Nie używaj wbudowanej funkcji reverse().',
    patternFunction:
      "function reverseString(input) {return input.split('').reverse().join('');}",
    sampleInput: ['hello'],
    sampleOutput: ['olleh'],
    category: Category.LOOP,
    tests: [
      { input: ['world'], output: 'dlrow' },
      { input: ['javascript'], output: 'tpircsavaj' },
      { input: ['openai'], output: 'ianepo' },
      { input: ['assistant'], output: 'tnatsissa' },
      { input: ['example'], output: 'elpmaxe' },
      { input: ['function'], output: 'noitcnuf' },
      { input: ['input'], output: 'tupni' },
      { input: ['output'], output: 'tuptuo' },
    ],
  },
  {
    name: 'Sum numbers',
    descriptionStart: 'Zwróć sumę wszystkich liczb w tablicy.',
    descriptionEnd: '',
    patternFunction:
      'function sumNumbers(arr) {return arr.reduce((a,b)=>a+b,0);}',
    sampleInput: ['[1,2,3]'],
    sampleOutput: ['6'],
    category: Category.FUNCTION,
    tests: [
      { input: ['[5,5,5]'], output: '15' },
      { input: ['[10,0]'], output: '10' },
    ],
  },
  {
    name: 'Count vowels',
    descriptionStart: 'Zwróć liczbę samogłosek w napisie.',
    descriptionEnd: '',
    patternFunction:
      'function countVowels(str) {return (str.match(/[aeiou]/gi) || []).length;}',
    sampleInput: ['hello'],
    sampleOutput: ['2'],
    category: Category.FUNCTION,
    tests: [
      { input: ['javascript'], output: '3' },
      { input: ['bbb'], output: '0' },
    ],
  },
  {
    name: 'Square numbers',
    descriptionStart: 'Podnieś każdą liczbę w tablicy do kwadratu.',
    descriptionEnd: '',
    patternFunction: 'function squareNumbers(arr){return arr.map(n=>n*n);}',
    sampleInput: ['[2,3,4]'],
    sampleOutput: ['[4,9,16]'],
    category: Category.LOOP,
    tests: [{ input: ['[1,2,3]'], output: '[1,4,9]' }],
  },
  {
    name: 'Is palindrome',
    descriptionStart:
      'Sprawdź czy napis jest palindromem (czytany tak samo w obie strony).',
    descriptionEnd: '',
    patternFunction:
      "function isPalindrome(s){return s===s.split('').reverse().join('');}",
    sampleInput: ['level'],
    sampleOutput: ['true'],
    category: Category.FUNCTION,
    tests: [
      { input: ['level'], output: 'true' },
      { input: ['test'], output: 'false' },
    ],
  },
  {
    name: 'Reverse string 2',
    descriptionStart: 'Druga wersja zadania z odwracaniem ciągu znaków.',
    descriptionEnd: 'Nie używaj wbudowanej funkcji reverse().',
    patternFunction:
      "function reverseString2(input) {return input.split('').reverse().join('');}",
    sampleInput: ['world'],
    sampleOutput: ['dlrow'],
    category: Category.LOOP,
    tests: [
      { input: ['abc'], output: 'cba' },
      { input: ['12345'], output: '54321' },
    ],
  },
  {
    name: 'Sum numbers 2',
    descriptionStart: 'Druga wersja zadania z sumowaniem liczb.',
    descriptionEnd: '',
    patternFunction:
      'function sumNumbers2(arr) {return arr.reduce((a,b)=>a+b,0);}',
    sampleInput: ['[2,2,2]'],
    sampleOutput: ['6'],
    category: Category.FUNCTION,
    tests: [
      { input: ['[3,3,3]'], output: '9' },
      { input: ['[1,10]'], output: '11' },
    ],
  },
  {
    name: 'Count vowels 2',
    descriptionStart: 'Druga wersja zadania z liczeniem samogłosek.',
    descriptionEnd: '',
    patternFunction:
      'function countVowels2(str) {return (str.match(/[aeiou]/gi) || []).length;}',
    sampleInput: ['openai'],
    sampleOutput: ['4'],
    category: Category.FUNCTION,
    tests: [
      { input: ['assistant'], output: '3' },
      { input: ['bbb'], output: '0' },
    ],
  },
  {
    name: 'Square numbers 2',
    descriptionStart: 'Druga wersja zadania z podnoszeniem do kwadratu.',
    descriptionEnd: '',
    patternFunction: 'function squareNumbers2(arr){return arr.map(n=>n*n);}',
    sampleInput: ['[3,4]'],
    sampleOutput: ['[9,16]'],
    category: Category.LOOP,
    tests: [{ input: ['[2,5]'], output: '[4,25]' }],
  },
  {
    name: 'Is palindrome 2',
    descriptionStart: 'Druga wersja zadania z palindromami.',
    descriptionEnd: '',
    patternFunction:
      "function isPalindrome2(s){return s===s.split('').reverse().join('');}",
    sampleInput: ['kajak'],
    sampleOutput: ['true'],
    category: Category.FUNCTION,
    tests: [
      { input: ['radar'], output: 'true' },
      { input: ['kot'], output: 'false' },
    ],
  },
  {
    name: 'Sum positives',
    descriptionStart: 'Zwróć sumę tylko dodatnich liczb w tablicy.',
    descriptionEnd: '',
    patternFunction:
      'function sumPositives(arr){return arr.filter(n=>n>0).reduce((a,b)=>a+b,0);}',
    sampleInput: ['[1,-2,3]'],
    sampleOutput: ['4'],
    category: Category.FUNCTION,
    tests: [
      { input: ['[1,2,-3,4]'], output: '7' },
      { input: ['[-1,-2,-3]'], output: '0' },
    ],
  },
]

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

async function seedJavascriptAssignments() {
  const count = await prisma.javascriptAssignment.count()

  if (count === 0) {
    await prisma.javascriptAssignment.createMany({
      data: jsAssignmentsSeed,
    })
  }
}

seedJavascriptAssignments().catch((error) => {
  console.error('Failed to seed JavascriptAssignment', error)
})
