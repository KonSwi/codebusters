import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { promisify } from 'node:util'

import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'

export const runtime = 'nodejs'

type CssTaskResponse = {
  id: string
  title: string
  description: string
  targetImageUrl: string
  initialCode: string
}

type PutBody = {
  solution: string
  taskId: string
}

const VIEWPORT_WIDTH = 333
const VIEWPORT_HEIGHT = 266

export const GET = async (
  _request: NextRequest,
  context: { params: Promise<{ id: string[] }> }
) => {
  const { id } = await context.params
  const lastSegment = id[id.length - 1]

  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string } | undefined)?.id

  if (!userId) {
    return new NextResponse(null, { status: 401 })
  }

  const assignment = await prisma.cssAssignment.findUnique({
    where: { id: lastSegment },
  })

  if (!assignment) {
    return new NextResponse(null, { status: 404 })
  }

  const response: CssTaskResponse = {
    id: assignment.id,
    title: assignment.name,
    description: assignment.description,
    targetImageUrl: assignment.targetUrl,
    initialCode: assignment.code,
  }

  return NextResponse.json(response)
}

export const PUT = async (
  request: NextRequest,
  context: { params: Promise<{ id: string[] }> }
) => {
  const { id } = await context.params
  const lastSegment = id[id.length - 1]

  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string } | undefined)?.id

  if (!userId) {
    return new NextResponse(null, { status: 401 })
  }

  let body: PutBody

  try {
    body = (await request.json()) as PutBody
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const { solution, taskId } = body

  if (!solution || !taskId) {
    return new NextResponse(null, { status: 400 })
  }

  if (taskId !== lastSegment) {
    return new NextResponse(null, { status: 400 })
  }

  const assignment = await prisma.cssAssignment.findUnique({
    where: { id: lastSegment },
  })

  if (!assignment) {
    return new NextResponse(null, { status: 404 })
  }

  const htmlAnswer = `<style>
    body{
      width:${VIEWPORT_WIDTH}px;
      height:${VIEWPORT_HEIGHT}px;
      margin:0;
      overflow:hidden;
      background-color:#ffffff;
    }
  </style>${solution}`

  const matchPercent = await countMatch(htmlAnswer, assignment.targetUrl ?? '')

  await prisma.cssAssignmentSolution.upsert({
    where: {
      CssAssignmentId_userId: {
        CssAssignmentId: assignment.id,
        userId,
      },
    },
    update: {
      solution,
      result: matchPercent,
    },
    create: {
      cssAssignment: { connect: { id: assignment.id } },
      user: { connect: { id: userId } },
      solution,
      result: matchPercent,
    },
  })

  return NextResponse.json({
    taskId: assignment.id,
    matchPercent,
  })
}

const parsePng = async (buffer: Buffer): Promise<InstanceType<typeof PNG>> => {
  const png = new PNG()
  const parse = promisify(png.parse.bind(png))
  const result = (await parse(buffer)) as InstanceType<typeof PNG>
  return result
}

const countMatch = async (
  htmlAnswer: string,
  targetImageUrl: string
): Promise<number> => {
  if (!targetImageUrl) {
    return 0
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
  })

  await page.setContent(htmlAnswer, { waitUntil: 'networkidle0' })

  const answerImagePngBuffer = (await page.screenshot({
    type: 'png',
  })) as Buffer

  await browser.close()

  const targetResponse = await fetch(targetImageUrl)

  if (!targetResponse.ok) {
    return 0
  }

  const targetArrayBuffer = await targetResponse.arrayBuffer()
  const targetImageBuffer = Buffer.from(targetArrayBuffer)

  const answerSharp = sharp(answerImagePngBuffer)
  const targetSharp = sharp(targetImageBuffer)

  const { width, height } = await answerSharp.metadata()

  if (!width || !height) {
    return 0
  }

  const trimmedAnswerImage = await answerSharp.resize(width, height).toBuffer()

  const trimmedTargetImage = await targetSharp.resize(width, height).toBuffer()

  const [answerPng, targetPng] = await Promise.all([
    parsePng(trimmedAnswerImage),
    parsePng(trimmedTargetImage),
  ])

  const diffPixels = pixelmatch(
    answerPng.data,
    targetPng.data,
    undefined,
    width,
    height,
    { threshold: 0.1 }
  )

  const totalPixels = width * height
  const matchRatio = (totalPixels - diffPixels) / totalPixels
  const percent = Math.round(matchRatio * 100)

  return percent
}
