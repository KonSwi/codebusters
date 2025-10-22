import { notFound } from 'next/navigation'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Timer from '@/features/task/components/Timer'

let isVisible = true

vi.mock('react-page-visibility', () => ({
  usePageVisibility: vi.fn(() => isVisible),
}))

describe('Timer component', () => {
  beforeEach(async () => {
    let messages
    try {
      messages = (await import('../../messages/pl.json')).default
    } catch (error) {
      notFound()
    }

    render(
      <NextIntlClientProvider locale='pl' messages={messages}>
        <Timer />
      </NextIntlClientProvider>
    )
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('Timer functionality test', async () => {
    vi.useFakeTimers()

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Start'))

    fireEvent.click(screen.getByText('Odliczanie'))
    expect(
      screen.queryByTestId('countdownInput'),
      'Countdown input should not be rendered'
    ).toBeNull()

    fireEvent.click(screen.getByText('Reset'))
    fireEvent.click(screen.getByText('Odliczanie'))
    expect(
      screen.getByTestId('countdownInput'),
      'Countdown input should be rendered'
    ).toBeTruthy()

    fireEvent.click(screen.getByText('Stoper'))
    expect(
      screen.queryByTestId('countdownInput'),
      'Countdown input should not be rendered'
    ).toBeNull()

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(
      screen.getAllByText('00:00:01'),
      'Timer should display 00:00:01 after 1 second'
    ).toHaveLength(2)

    act(() => {
      isVisible = false
    })

    await vi.advanceTimersByTimeAsync(5000)
    expect(
      screen.getAllByText('00:00:03'),
      'Timer should display 00:00:03 after visibility change and timer advancement'
    ).toHaveLength(2)
  })

  it('Timer UI test', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })

    fireEvent.click(screen.getByRole('button'))

    const startBtn = screen.getByText('Start')

    expect(startBtn, 'Start button should be rendered').toBeTruthy()

    fireEvent.click(startBtn)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(
      screen.getAllByText('00:00:02'),
      'Timer should display 00:00:02 after 2 seconds'
    ).toHaveLength(2)

    fireEvent.click(screen.getByText('Odliczanie'))
    expect(
      screen.queryByTestId('countdownInput'),
      'Countdown input should not be rendered'
    ).toBeNull()

    fireEvent.click(screen.getByText('Reset'))
    expect(
      screen.getAllByText('00:00:00'),
      'Timer should reset to 00:00:00'
    ).toHaveLength(2)

    fireEvent.click(screen.getByText('Odliczanie'))

    const input = screen.getByTestId('countdownInput') as HTMLInputElement

    expect(input, 'Countdown input should be rendered').toBeTruthy()

    await userEvent.clear(input)
    await userEvent.type(input, '3')

    fireEvent.click(startBtn)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(
      screen.getAllByText('00:02:56'),
      'Timer should display 00:02:56 after advancing 5 seconds from 3 minutes countdown'
    ).toHaveLength(2)
  })
})
