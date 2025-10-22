import { NextIntlClientProvider } from 'next-intl'
import { afterEach, expect, test } from 'vitest'
import { notFound } from 'next/navigation'
import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RegistrationForm from '@/features/register/components/RegistrationForm'

afterEach(() => {
  cleanup()
})

test('Validation of registration form', async () => {
  let messages

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getByTestId, getByText, queryByText, getByRole, queryByTestId } =
    render(
      <NextIntlClientProvider messages={messages} locale='pl'>
        <RegistrationForm />
      </NextIntlClientProvider>
    )

  const emailInput = getByTestId('email')
  const passwordInput = getByTestId('password')
  const confirmPasswordInput = getByTestId('confirmPassword')
  const submitButton = getByTestId('registrationSubmit')
  const nickInput = getByTestId('nick')
  const nameInput = getByTestId('name')
  const lastNameInput = getByTestId('lastName')
  const consentCheckbox = getByRole('checkbox')

  await userEvent.click(submitButton)
  await userEvent.type(emailInput, 'test.com')

  expect(
    getByTestId('emailError'),
    'Checking if the email format error message is displayed'
  ).toBeTruthy()

  await userEvent.clear(emailInput)
  await userEvent.type(emailInput, 'test@example.com')

  expect(
    queryByTestId('emailError'),
    'Checking if the email format error message is removed'
  ).toBeNull()

  await userEvent.type(passwordInput, 'short')

  expect(
    getByTestId('passwordError'),
    'Checking if the short password error message is displayed'
  ).toBeTruthy()

  await userEvent.clear(passwordInput)
  await userEvent.type(passwordInput, 'longenough')

  expect(
    getByTestId('passwordError'),
    'Checking if the password composition error message is displayed'
  ).toBeTruthy()

  await userEvent.clear(passwordInput)
  await userEvent.type(passwordInput, 'Validpassword!1')

  expect(
    queryByTestId('passwordError'),
    'Checking if the password error message is removed'
  ).toBeNull()
  expect(
    getByTestId('confirmPasswordError'),
    'Checking if the confirm password required message is displayed'
  ).toBeTruthy()

  await userEvent.type(confirmPasswordInput, 'Differentpassword!1')

  expect(
    getByTestId('confirmPasswordError'),
    'Checking if the passwords must match error message is displayed'
  ).toBeTruthy()

  await userEvent.clear(confirmPasswordInput)
  await userEvent.type(confirmPasswordInput, 'Validpassword!1')

  expect(
    queryByTestId('confirmPasswordError'),
    'Checking if the confirm password required message is removed'
  ).toBeNull()
  expect(
    getByTestId('nickError'),
    'Checking if the nickname required error message is displayed'
  ).toBeTruthy()
  expect(
    getByTestId('nameError'),
    'Checking if the name required error message is displayed'
  ).toBeTruthy()
  expect(
    getByTestId('lastNameError'),
    'Checking if the last name required error message is displayed'
  ).toBeTruthy()

  await userEvent.type(nickInput, 'AdamNowak')
  await userEvent.type(nameInput, 'Adam')
  await userEvent.type(lastNameInput, 'Nowak')

  expect(
    queryByTestId('nickError'),
    'Checking if the nickname required error message is removed'
  ).toBeNull()
  expect(
    queryByTestId('naneError'),
    'Checking if the name required error message is removed'
  ).toBeNull()
  expect(
    queryByTestId('lastNameError'),
    'Checking if the last name required error message is removed'
  ).toBeNull()

  expect(
    getByTestId('termsError'),
    'Checking if the terms and conditions required error message is displayed'
  ).toBeTruthy()

  await userEvent.click(consentCheckbox)

  expect(
    queryByTestId('termsError'),
    'Checking if the terms and conditions required error message is removed'
  ).toBeNull()
})

test('Redirections in registration form', async () => {
  let messages

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getByTestId, getByText, getByRole } = render(
    <NextIntlClientProvider messages={messages} locale='pl'>
      <RegistrationForm />
    </NextIntlClientProvider>
  )

  const signIn = 'Zaloguj się'

  const submitButton = getByTestId('registrationSubmit')
  const loginLink = getByText(signIn)

  await userEvent.type(getByTestId('email'), 'test@example.com')
  await userEvent.type(getByTestId('password'), 'Validpassword!1')
  await userEvent.type(getByTestId('confirmPassword'), 'Validpassword!1')
  await userEvent.type(getByTestId('nick'), 'TestNick')
  await userEvent.type(getByTestId('name'), 'TestName')
  await userEvent.type(getByTestId('lastName'), 'TestLastName')
  await userEvent.click(getByRole('checkbox'))

  await userEvent.click(submitButton)

  expect(
    getByTestId('modal'),
    'Checking if the modal is displayed after form submission'
  ).toBeTruthy()

  const href = loginLink.getAttribute('href')

  expect(href, 'Checking if the login link redirects to /login').toBe('/login')
})
