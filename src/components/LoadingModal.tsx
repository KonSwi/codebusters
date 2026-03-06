'use client'

export const LoadingModal = () => {
  return (
    <div
      data-testid='loader'
      className='bg-dark/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px]'
    >
      <div className='border-none flex h-56 w-80 flex-col items-center justify-center gap-4 rounded-lg border px-6 py-8'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent' />
      </div>
    </div>
  )
}
