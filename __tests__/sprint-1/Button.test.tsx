import { expect, test, vitest } from 'vitest'
import { render } from '@testing-library/react'

import { Button } from '@/components'

type ButtonProps = {
  name: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'github' | 'active'
  type?: 'submit' | 'button'
  onClick?: any
}

test('Button component test', () => {
  const buttonProps: ButtonProps = {
    name: 'test button',
    onClick: vitest.fn(() => 0),
    type: 'button',
    variant: 'primary',
  }
  const { name, type } = buttonProps

  const { getByRole } = render(<Button {...buttonProps} />)
  const button = getByRole('button')

  expect(
    button.innerHTML,
    'Test checking the correct rendering of the button'
  ).toBe(name)
  expect(button, 'Test checking the button type').toHaveProperty('type', type)
  expect(
    button,
    'Test checking if the button has an onclick event'
  ).toHaveProperty('onclick')
  expect(
    button.onclick,
    'Test checking if the button has an onclick event'
  ).toBeTruthy()
})
