import { afterEach, expect, test } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import Login from '@/features/login/components/Login'

afterEach(() => {
  cleanup()
})

test('Validation of login form', async () => {
  userEvent.setup()

  let messages

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }
  const { getByTestId, queryByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Login />
    </NextIntlClientProvider>
  )

  const emailInput = getByTestId('email')
  const passwordInput = getByTestId('password')
  const submitButton = getByTestId('submit')

  await userEvent.click(submitButton)

  expect(
    getByTestId('emailError'),
    'Checking if email error is displayed when submitting empty form'
  ).toBeDefined()
  expect(
    getByTestId('passwordError'),
    'Checking if password error is displayed when submitting empty form'
  ).toBeDefined()

  await userEvent.type(emailInput, 'efpyi@example.com')
  await userEvent.click(submitButton)
  expect(
    queryByTestId('emailError'),
    'Checking if email error is removed after entering a valid email'
  ).toBeNull()
  expect(
    getByTestId('passwordError'),
    'Checking if password error is still displayed after entering a valid email but no password'
  ).toBeDefined()

  await userEvent.type(passwordInput, '123456')
  await userEvent.click(submitButton)
  expect(
    queryByTestId('emailError'),
    'Checking if email error is still removed after entering a valid email and password'
  ).toBeNull()
  expect(
    queryByTestId('passwordError'),
    'Checking if password error is removed after entering a valid password'
  ).toBeNull()
})

test('Redirections in form', async () => {
  let messages

  const signUp = 'Zarejestruj się'

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }
  const { getByText } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Login />
    </NextIntlClientProvider>
  )

  const registerLink = getByText(signUp)
  const href = registerLink.getAttribute('href')

  expect(href, 'Checking if the register link redirects to /register').toBe(
    '/register'
  )
})
