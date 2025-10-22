import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import clsx from 'clsx'

import { Input } from '@/components'

type InputProps = {
  label: string
  type: 'email' | 'text' | 'password'
  placeholder: string
  colSpan: 2 | undefined
  errorMessage: string
}

test('Input test', () => {
  const testProps: InputProps = {
    label: 'test label',
    type: 'email',
    placeholder: 'test placeholder',
    colSpan: 2,
    errorMessage: 'test error',
  }
  const { label, colSpan, placeholder } = testProps

  const { getByRole, getAllByRole, getByText } = render(
    <Input {...testProps} />
  )

  const wrapperDiv = getAllByRole('generic')[1]
  const inputLabel = getByText(label)
  const input = getByRole('textbox')

  expect(
    wrapperDiv.className,
    'Checking if the wrapper div has the correct class based on colSpan'
  ).toBe(clsx({ 'col-span-2': colSpan === 2 }))
  expect(
    inputLabel.innerHTML,
    'Checking if the input label has the correct text'
  ).toBe(label)

  expect(
    (input as HTMLInputElement).placeholder,
    'Checking if the input placeholder is correct'
  ).toBe(placeholder)
})
