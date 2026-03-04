/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, CssCategory, DifficultyLevel } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const count = await prisma.cssAssignment.count()

  if (count > 0) {
    console.log('CssAssignment is not empty – skipping seed.')
    return
  }

  const tasks = [
    {
      name: 'Draw donut',
      description:
        'Zadanie przykładowe – odtwórz wygląd donuta przy użyciu CSS.',
      category: CssCategory.SHAPES,
      difficultyLevel: DifficultyLevel.EASY,
      requirements: 95,
      colors: ['#f5a22e', '#ffffff', '#12a32e', '#000000', '#221231'],
      targetUrl:
        'http://res.cloudinary.com/pokersun/image/upload/v1681385849/learning-platform/images/6437e9799bd2e398d4419795f-image-1681385849.png',
      code: `
<html>
  <head>
    <style>
      /*  kod CSS  */
    </style>
  </head>
  <body>
  </body>
</html>
      `.trim(),
    },
    {
      name: 'Donut variant 2',
      description: 'Odtwórz drugi wariant donuta na podstawie obrazka.',
      category: CssCategory.SHAPES,
      difficultyLevel: DifficultyLevel.EASY,
      requirements: 95,
      colors: ['#D35400', '#FF5733', '#D4AC0D'],
      targetUrl:
        'http://res.cloudinary.com/pokersun/image/upload/v1681479387/learning-platform/images/643956da75eaae481017f26d-image-1681479386.png',
      code: '',
    },
    {
      name: 'Donut variant 3',
      description: 'Odtwórz trzeci wariant donuta na podstawie obrazka.',
      category: CssCategory.SHAPES,
      difficultyLevel: DifficultyLevel.EASY,
      requirements: 95,
      colors: ['#1F1C1E', '#7B3F00'],
      targetUrl:
        'http://res.cloudinary.com/pokersun/image/upload/v1681391619/learning-platform/images/6438000375eaae4810171ffa-image-1681391619.png',
      code: '',
    },
    {
      name: 'Donut variant 4',
      description: 'Odtwórz czwarty wariant donuta na podstawie obrazka.',
      category: CssCategory.SHAPES,
      difficultyLevel: DifficultyLevel.EASY,
      requirements: 95,
      colors: ['#97CC7F'],
      targetUrl:
        'http://res.cloudinary.com/pokersun/image/upload/v1678961467/learning-platform/images/6412eb3b1a8514503d1fc681-image-1678961467.png',
      code: '',
    },
  ]

  await prisma.cssAssignment.createMany({ data: tasks })

  console.log(`Seeded ${tasks.length} CSS assignments.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
