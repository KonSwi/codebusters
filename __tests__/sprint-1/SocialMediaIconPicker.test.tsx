import { expect, test } from 'vitest'
import { render } from '@testing-library/react'

import SocialMediaIconPicker from '@/features/signOutLayout/components/SocialMediaIconPicker'

test('Social media picker test', () => {
  const url: string = 'github.com'

  const { getByRole } = render(<SocialMediaIconPicker url={url} />)

  const link = getByRole('link')

  expect(
    link.getAttribute('href'),
    'Checking if the link href is correct'
  ).toBe(url)
})
