import { notFound } from 'next/navigation'

export const getTranslation = async () => {
  let messages
  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }
  return messages
}
