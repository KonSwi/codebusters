'use client'

import { expect, test } from 'vitest'
import uuid from 'react-uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = {
  id: uuid(),
  name: 'test_user',
  email: `test@test${uuid()}.com`,
}
const moduleData = {
  id: uuid(),
  moduleIndex: 1,
  name: `name-${uuid()}`,
  difficultyLevel: '1',
  description:
    'W tym module kursu będziesz zgłębiać podstawy nauk komputerowych oraz języka JavaScript. Rozpoczynamy od zrozumienia działania internetu, poprzez algorytmy i struktury danych, a kończąc na zaawansowanych technikach programowania w JS. Kurs skupia się na praktycznych aspektach, wprowadzając uczestników w świat front-endu. Sześć sprintów zapewnia stopniowe i zorganizowane przyswajanie wiedzy',
  moduleVideo: 'fBGhBP476zE',
  input:
    'Żeby przystąpić do tego modułu nie potrzebujesz żadnej wiedzy z zakresu programowania',
  output:
    'Po zakończeniu modułu będziesz posiadać wiedzę z zakresu podstaw tworzenia algorytmów, HTML, CSS oraz podstaw JavaScript',
}
const sprintData = {
  id: uuid(),
  moduleId: moduleData.id,
  name: `name-${uuid()}`,
  shortDescription:
    'W tym sprincie skupimy się na podstawach nauk komputerowych',
  longDescription:
    'W pierwszym sprincie odkryjesz podstawy nauk komputerowych, które stanowią fundament w świecie technologii. Dowiesz się, jak w praktyce działa internet, jakie mechanizmy napędzają przeglądarki oraz jak za pomocą algorytmów można przedstawiać i rozwiązywać problemy. Diagramy UML pozwolą Ci na graficzne przedstawienie procesów, a dzięki nauce podstaw HTML zyskasz umiejętność tworzenia prostej struktury strony.',
  duration: 40,
  technologies: {
    connect: [],
  },
  sprintNumber: 1,
  activities: [],
}

test('Test checking the database connection', async () => {
  try {
    await prisma.user.create({ data: userData })

    await prisma.module.create({ data: moduleData })
    const fetchedModule = await prisma.module.findUnique({
      where: { id: moduleData.id },
    })
    expect(
      fetchedModule,
      'Module should be created and fetched successfully'
    ).toBeDefined()

    await prisma.sprint.create({ data: sprintData })
    const sprint = await prisma.sprint.findUnique({
      where: { id: sprintData.id },
    })
    expect(
      sprint,
      'Sprint should be created and fetched successfully'
    ).toBeDefined()
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  } finally {
    const user = await prisma.user.findUnique({ where: { id: userData.id } })
    if (user) {
      await prisma.user.delete({ where: { id: userData.id } })
    }

    const sprint = await prisma.sprint.findUnique({
      where: { id: sprintData.id },
    })
    if (sprint) {
      await prisma.sprint.delete({ where: { id: sprintData.id } })
    }

    const fetchedModule = await prisma.module.findUnique({
      where: { id: moduleData.id },
    })
    if (fetchedModule) {
      await prisma.module.delete({ where: { id: moduleData.id } })
    }
  }
})
