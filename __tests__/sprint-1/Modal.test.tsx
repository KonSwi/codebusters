import { expect, test, vitest } from 'vitest'
import { render } from '@testing-library/react'

import { Modal } from '@/components'

type ModalProps = {
  title: string
  firstParagraph: string
  secondParagrah: string
  buttonName: string
  handleClick?: React.Dispatch<React.SetStateAction<number>>
}

test('Modal test', () => {
  const modalProps: ModalProps = {
    title: 'Test title',
    firstParagraph:
      'Sit in aliqua sit exercitation mollit aliqua sunt aliquip.',
    secondParagrah:
      'Occaecat sit nostrud eu dolor est nulla minim ullamco voluptate mollit ex.',
    buttonName: 'test button name',
    handleClick: vitest.fn(() => 0),
  }
  const { title, firstParagraph, secondParagrah, buttonName } = modalProps

  const { getByRole, getAllByRole } = render(<Modal {...modalProps} />)

  const titleHeading = getByRole('heading', { level: 1 })
  const paragraphs = getAllByRole('heading', { level: 3 })
  const button = getByRole('button')

  expect(
    titleHeading.innerHTML,
    'Checking if the title heading has the correct text'
  ).toBe(title)
  expect(
    paragraphs[0].innerHTML,
    'Checking if the first paragraph has the correct text'
  ).toBe(firstParagraph)
  expect(
    paragraphs[1].innerHTML,
    'Checking if the second paragraph has the correct text'
  ).toBe(secondParagrah)

  expect(button.innerHTML, 'Checking if the button has the correct name').toBe(
    buttonName
  )
  expect(
    button,
    'Checking if the button has an onclick property'
  ).toHaveProperty('onclick')
  expect(
    button.onclick,
    'Checking if the button onclick property is truthy'
  ).toBeTruthy()
})
