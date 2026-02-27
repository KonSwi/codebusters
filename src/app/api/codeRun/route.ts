import { NextResponse } from 'next/server'
import vm from 'node:vm'

export const runtime = 'nodejs'

type ConsoleLine = {
  id: string
  type: 'info' | 'success' | 'error'
  message: string
}

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const toText = (v: unknown) => {
  if (typeof v === 'string') return v
  try {
    return JSON.stringify(v)
  } catch {
    return String(v)
  }
}

const isProbablyStatement = (s: string) =>
  /^(const|let|var|if|for|while|function|return|import|export|class|switch|try|throw|\{)/.test(
    s.trim()
  )

const runInVm = (code: string, sandboxConsole: Record<string, unknown>) => {
  const context = vm.createContext({ console: sandboxConsole })

  const script = new vm.Script(code, { filename: 'user-code.js' })
  return script.runInContext(context, { timeout: 800 })
}

const isMeaningfulResult = (value: unknown) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string' && value.trim() === 'use strict') return false
  return true
}

export async function POST(req: Request) {
  try {
    const body: { code?: string } = await req.json()
    const code = body.code ?? ''
    const trimmed = code.trim()

    const lines: ConsoleLine[] = []

    const pushLine = (type: ConsoleLine['type'], message: string) => {
      lines.push({ id: makeId(), type, message })
    }

    const sandboxConsole: Record<string, unknown> = {
      log: (...args: unknown[]) => pushLine('info', args.map(toText).join(' ')),
      info: (...args: unknown[]) =>
        pushLine('info', args.map(toText).join(' ')),
      warn: (...args: unknown[]) =>
        pushLine('info', args.map(toText).join(' ')),
      error: (...args: unknown[]) =>
        pushLine('error', args.map(toText).join(' ')),
    }

    if (trimmed.length === 0) {
      pushLine('error', 'Brak kodu do uruchomienia')
      return NextResponse.json({ lines })
    }

    let returned: unknown

    try {
      const normalized = trimmed.replace(/\r?\n/g, ';')
      const parts = normalized
        .split(';')
        .map((p) => p.trim())
        .filter(Boolean)

      if (parts.length === 1 && !isProbablyStatement(parts[0])) {
        returned = runInVm(`"use strict";\n(${parts[0]})`, sandboxConsole)
      } else if (
        parts.length >= 2 &&
        !isProbablyStatement(parts[parts.length - 1])
      ) {
        const last = parts[parts.length - 1]
        const prefix = parts.slice(0, -1).join(';\n')
        returned = runInVm(
          `"use strict";\n${prefix};\n(${last})`,
          sandboxConsole
        )
      } else {
        returned = runInVm(`"use strict";\n${code}`, sandboxConsole)
      }
    } catch {
      returned = runInVm(`"use strict";\n${code}`, sandboxConsole)
    }

    if (isMeaningfulResult(returned)) {
      pushLine('success', `Result: ${toText(returned)}`)
    }

    return NextResponse.json({ lines })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { lines: [{ id: makeId(), type: 'error', message }] },
      { status: 200 }
    )
  }
}
