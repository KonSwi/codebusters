import { expect, test, vitest } from 'vitest'
import { render } from '@testing-library/react'

import { NavButton } from '@/components'

type NavButtonProps = {
  name: string
  route: string
  redirect?: boolean
  variant?: 'primary' | 'active'
}

test('NavButton test', () => {
  const navButtonProps: NavButtonProps = {
    name: 'test name',
    route: '/test',
    redirect: false,
    variant: 'primary',
  }
  const { name, route } = navButtonProps

  const { getByRole } = render(<NavButton {...navButtonProps} />)

  const link = getByRole('link')
  const button = getByRole('button')

  expect(
    link.getAttribute('href'),
    'Checking if the link href is correct'
  ).toBe(route)
  expect(button.innerHTML, 'Checking if the button innerHTML is correct').toBe(
    name
  )
})
