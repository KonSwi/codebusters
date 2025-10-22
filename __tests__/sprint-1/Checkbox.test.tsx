import { expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Checkbox } from '@/components'

type CheckboxProps = {
  label: string
  linkName?: string
  errorMessage?: string
}

test('Checkbox component test', () => {
  const checkboxProps: CheckboxProps = {
    label: 'test label',
  }

  const { getByText } = render(<Checkbox {...checkboxProps} />)
  const { label } = checkboxProps

  const checkboxLabel = getByText(label)

  expect(
    checkboxLabel,
    'Test checking the correct rendering of the checkbox'
  ).toBeTruthy()
})
