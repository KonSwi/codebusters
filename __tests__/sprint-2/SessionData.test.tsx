import { expect, vi, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getServerSession } from 'next-auth'

import Home from '@/app/[locale]/page'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/features/signInLayout/layout', () => ({
  default: vi.fn(({ children }) => (
    <div data-testid='sign-in-layout'>{children}</div>
  )),
}))

vi.mock('@/features/singOutLayout/layout', () => ({
  default: vi.fn(({ children }) => (
    <div data-testid='sign-out-layout'>{children}</div>
  )),
}))

vi.mock('@/features/landing', () => ({
  Landing: vi.fn(() => <div data-testid='landing-component' />),
}))

test('renders SignOutLayout when there is no session user', async () => {
  // @ts-ignore
  getServerSession.mockResolvedValueOnce(null)

  render(await Home())

  expect(
    screen.getByTestId('sign-out-layout'),
    'SignOutLayout should be rendered when there is no session user'
  ).toBeInTheDocument()
  expect(
    screen.getByTestId('landing-component'),
    'Landing component should be rendered inside SignOutLayout when there is no session user'
  ).toBeInTheDocument()
})

test('renders SignInLayout when there is a session user', async () => {
  // @ts-ignore
  getServerSession.mockResolvedValueOnce({ user: { name: 'John Doe' } })

  render(await Home())

  expect(
    screen.getByTestId('sign-in-layout'),
    'SignInLayout should be rendered when there is a session user'
  ).toBeInTheDocument()
  expect(
    screen.getByTestId('landing-component'),
    'Landing component should be rendered inside SignInLayout when there is a session user'
  ).toBeInTheDocument()
})
