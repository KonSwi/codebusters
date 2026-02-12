module.exports = {
  // this will check Typescript files
  '**/*.(ts|tsx)': (filenames) => {
    const filtered = filenames.filter(
      (f) => !f.includes('__tests__') && !f.includes('.next')
    )
    if (filtered.length === 0) return []
    return 'pnpm tsc --noEmit'
  },

  // This will lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => {
    const filtered = filenames.filter(
      (f) => !f.includes('__tests__') && !f.includes('.next')
    )
    if (filtered.length === 0) return []
    return [
      `pnpm eslint --fix ${filtered.join(' ')}`,
      `pnpm prettier --write ${filtered.join(' ')}`,
    ]
  },

  // this will Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => {
    const filtered = filenames.filter(
      (f) => !f.includes('__tests__') && !f.includes('.next')
    )
    if (filtered.length === 0) return []
    return `pnpm prettier --write ${filtered.join(' ')}`
  },
}
