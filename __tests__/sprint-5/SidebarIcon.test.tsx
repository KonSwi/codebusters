'use client'

import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Sidebar from '../../features/signInLayout/components/Sidebar'
import { getTranslation } from '../helpers/translationHelpers'

test('Test verifies whether the icon on the sidebar leads to the correct route /css-task', async () => {
  const messages = await getTranslation()

  const { getAllByRole } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Sidebar />
    </NextIntlClientProvider>
  )

  const allLinks = getAllByRole('link') || []

  const links = allLinks.map((link) => {
    // @ts-ignore
    const index = link?.href?.lastIndexOf('/') + 1
    // @ts-ignore
    return link?.href?.substring(index)
  })

  expect(
    links,
    'checks if there is a link to /css-tasks on the sidebar'
  ).toContain('css-task')
})
