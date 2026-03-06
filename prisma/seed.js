/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, CssCategory, DifficultyLevel } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedCssAssignments() {
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
        'http://res.cloudinary.com/pokersun/image/upload/v1681479387/learning-platform/images/643956da75eaae481017f26d-image-1681479386.png',
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

function splitIntoChunks(array, chunksCount) {
  const result = Array.from({ length: chunksCount }, () => [])
  array.forEach((item, index) => {
    result[index % chunksCount].push(item)
  })
  return result
}

async function seedModulesSprintsTechnologies() {
  const modulesCount = await prisma.module.count()
  const sprintsCount = await prisma.sprint.count()
  const technologiesCount = await prisma.technology.count()

  if (modulesCount > 0 || sprintsCount > 0 || technologiesCount > 0) {
    console.log(
      'Modules/Sprints/Technologies are not empty – skipping P-22 seed.'
    )
    return
  }

  const modulesData = [
    {
      moduleIndex: 1,
      name: 'Podstawy programowania',
      difficultyLevel: '1',
      description:
        'W tym module poznasz podstawy nauk komputerowych oraz języka programowania.',
      input:
        'Żeby przystąpić do tego modułu nie potrzebujesz żadnej wiedzy z zakresu programowania.',
      output:
        'Po zakończeniu modułu będziesz posiadać wiedzę z zakresu podstaw tworzenia aplikacji.',
      moduleVideo: 'fBGhBP476zE',
    },
    {
      moduleIndex: 2,
      name: 'Biblioteka React.js z obsługówką',
      difficultyLevel: '2',
      description:
        'W tym module skupimy się na budowaniu interfejsów użytkownika z wykorzystaniem React.js.',
      input: 'Wymagana jest znajomość podstaw JavaScript oraz HTML i CSS.',
      output:
        'Po ukończeniu modułu będziesz potrafić tworzyć komponentowe aplikacje w React.js.',
      moduleVideo: 'fBGhBP476zE',
    },
    {
      moduleIndex: 3,
      name: 'Framework Next.js',
      difficultyLevel: '2',
      description:
        'W tym module poznasz framework Next.js i jego możliwości przy budowie aplikacji webowych.',
      input: 'Potrzebna jest dobra znajomość React.js oraz podstaw Node.js.',
      output:
        'Po zakończeniu modułu będziesz potrafić tworzyć aplikacje SSR i SSG w Next.js.',
      moduleVideo: 'fBGhBP476zE',
    },
    {
      moduleIndex: 4,
      name: 'Fullstack development',
      difficultyLevel: '2',
      description:
        'W tym module połączysz umiejętności frontendu i backendu w jedną całość.',
      input:
        'Wymagana jest znajomość JavaScript/TypeScript oraz podstaw pracy z bazą danych.',
      output:
        'Po ukończeniu modułu będziesz umieć budować proste aplikacje fullstackowe.',
      moduleVideo: 'fBGhBP476zE',
    },
    {
      moduleIndex: 5,
      name: 'Praktyki dydaktyczne',
      difficultyLevel: '2',
      description:
        'W tym module skupisz się na przekazywaniu wiedzy i projektowaniu materiałów edukacyjnych.',
      input:
        'Przydaje się doświadczenie z wcześniejszych modułów oraz chęć pracy z ludźmi.',
      output:
        'Po zakończeniu modułu będziesz potrafić przygotować plan zajęć oraz materiały dydaktyczne.',
      moduleVideo: 'fBGhBP476zE',
    },
    {
      moduleIndex: 6,
      name: 'Praktyki',
      difficultyLevel: '3',
      description:
        'W tym module wykorzystasz zdobytą wiedzę w ramach praktycznego projektu.',
      input:
        'Wymagana jest realizacja wcześniejszych modułów lub równoważne doświadczenie.',
      output:
        'Po ukończeniu modułu będziesz mieć gotowy projekt, który możesz pokazać przyszłym pracodawcom.',
      moduleVideo: 'fBGhBP476zE',
    },
  ]

  await prisma.module.createMany({
    data: modulesData,
  })

  const technologiesData = [
    {
      name: 'HTML',
      description: 'Opis technologii HTML',
    },
    {
      name: 'CSS',
      description: 'Opis technologii CSS',
    },
    {
      name: 'JavaScript',
      description: 'Opis technologii JavaScript',
    },
  ]

  await prisma.technology.createMany({
    data: technologiesData,
  })

  const firstModule = await prisma.module.findFirst({
    where: { moduleIndex: 1 },
  })

  if (!firstModule) {
    console.warn('First module not found – skipping sprints seed.')
    return
  }

  const [htmlTech, cssTech, jsTech] = await Promise.all([
    prisma.technology.findUnique({ where: { name: 'HTML' } }),
    prisma.technology.findUnique({ where: { name: 'CSS' } }),
    prisma.technology.findUnique({ where: { name: 'JavaScript' } }),
  ])

  // --- POBIERAMY ZADANIA JS I CSS ---

  const jsAssignments = await prisma.javascriptAssignment.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  })

  const cssAssignments = await prisma.cssAssignment.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  })

  const jsIds = jsAssignments.map((a) => a.id)
  const cssIds = cssAssignments.map((a) => a.id)

  // Sprint 1: NA SZTYWNO 2×JS + 1×CSS (jeśli są)
  const sprint1JsIds = jsIds.slice(0, 2)
  const sprint1CssIds = cssIds.slice(0, 1)

  const sprint1Activities = [...sprint1JsIds, ...sprint1CssIds]

  // Pozostałe zadania rozdzielamy normalnie po sprintach 2–5
  const remainingJsIds = jsIds.slice(2)
  const remainingCssIds = cssIds.slice(1)

  const remainingActivities = [...remainingJsIds, ...remainingCssIds]

  const [
    sprint2Activities,
    sprint3Activities,
    sprint4Activities,
    sprint5Activities,
  ] = splitIntoChunks(remainingActivities, 4)

  await prisma.sprint.create({
    data: {
      name: 'Sprint 1 – Wprowadzenie do programowania',
      shortDescription:
        'W tym sprincie poznasz podstawowe pojęcia i sposób myślenia jak programista.',
      longDescription: 'Dłuższy opis sprintu 1',
      difficultyLevel: '1',
      duration: 40,
      sprintNumber: 1,
      module: {
        connect: { id: firstModule.id },
      },
      technologies: {
        connect: [
          htmlTech && { id: htmlTech.id },
          cssTech && { id: cssTech.id },
          jsTech && { id: jsTech.id },
        ].filter(Boolean),
      },
      activities: sprint1Activities,
    },
  })

  await prisma.sprint.create({
    data: {
      name: 'Sprint 2 – Podstawy HTML i struktury stron',
      shortDescription:
        'W tym sprincie nauczysz się budować semantyczne struktury dokumentów HTML.',
      longDescription: 'Dłuższy opis sprintu 2',
      difficultyLevel: '1',
      duration: 40,
      sprintNumber: 2,
      module: {
        connect: { id: firstModule.id },
      },
      technologies: {
        connect: jsTech ? [{ id: jsTech.id }] : [],
      },
      activities: sprint2Activities,
    },
  })

  await prisma.sprint.create({
    data: {
      name: 'Sprint 3 – Stylowanie z użyciem CSS',
      shortDescription:
        'W tym sprincie poznasz techniki stylowania i układów z wykorzystaniem CSS.',
      longDescription: 'Dłuższy opis sprintu 3',
      difficultyLevel: '2',
      duration: 40,
      sprintNumber: 3,
      module: {
        connect: { id: firstModule.id },
      },
      technologies: {
        connect: jsTech ? [{ id: jsTech.id }] : [],
      },
      activities: sprint3Activities,
    },
  })

  await prisma.sprint.create({
    data: {
      name: 'Sprint 4 – Interaktywność z JavaScript',
      shortDescription:
        'W tym sprincie dodasz interaktywne zachowania do stron za pomocą JavaScriptu.',
      longDescription: 'Dłuższy opis sprintu 4',
      difficultyLevel: '2',
      duration: 40,
      sprintNumber: 4,
      module: {
        connect: { id: firstModule.id },
      },
      technologies: {
        connect: [
          cssTech && { id: cssTech.id },
          jsTech && { id: jsTech.id },
        ].filter(Boolean),
      },
      activities: sprint4Activities,
    },
  })

  await prisma.sprint.create({
    data: {
      name: 'Sprint 5 – Projekt podsumowujący',
      shortDescription:
        'W tym sprincie połączysz zdobytą wiedzę w jeden większy projekt.',
      longDescription: 'Dłuższy opis sprintu 5',
      difficultyLevel: '2',
      duration: 40,
      sprintNumber: 5,
      module: {
        connect: { id: firstModule.id },
      },
      technologies: {
        connect: [
          htmlTech && { id: htmlTech.id },
          cssTech && { id: cssTech.id },
          jsTech && { id: jsTech.id },
        ].filter(Boolean),
      },
      activities: sprint5Activities,
    },
  })

  console.log('Seeded modules, technologies and sprints for P-22.')
}

async function main() {
  await seedCssAssignments()
  await seedModulesSprintsTechnologies()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
