import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prismadb'

type CssTask = {
  id: string
  title: string
  description: string
  targetImageUrl: string
  initialCode: string
}

type CssAssignmentRecord = {
  id: string
  name: string
  description: string
  targetUrl: string
  code: string
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get('limit')

  let take = 10

  if (limitParam) {
    const parsed = Number(limitParam)

    if (!Number.isNaN(parsed) && parsed > 0 && parsed <= 50) {
      take = parsed
    }
  }

  const assignments: CssAssignmentRecord[] =
    await prisma.cssAssignment.findMany({
      take,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        targetUrl: true,
        code: true,
      },
    })

  const cssTasks: CssTask[] = assignments.map((assignment) => ({
    id: assignment.id,
    title: assignment.name,
    description: assignment.description,
    targetImageUrl: assignment.targetUrl,
    initialCode: assignment.code,
  }))

  return NextResponse.json(cssTasks)
}
