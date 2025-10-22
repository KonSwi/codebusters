'use client'

import { expect, test } from 'vitest'

import { authOptions } from '@/lib/authOptions'

test('Test checking the database connection', async () => {
  const providers = authOptions.providers?.map((provider) => provider?.id)
  expect(providers, 'Providers should contain "github"').toContain('github')
  expect(providers, 'Providers should contain "credentials"').toContain(
    'credentials'
  )
})
