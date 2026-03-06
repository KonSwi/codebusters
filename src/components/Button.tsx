'use client'

import React from 'react'
import clsx from 'clsx'

type Variant =
  | 'blue'
  | 'red'
  | 'black'
  | 'transparent'
  | 'onlyText'
  | 'linkText'
  | 'ghost'
  | 'icon'
  | 'timer'
  | 'orange'
  | 'success'
  | 'testResult'
  | 'orangeBlack'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'blue',
  className,
  disabled = false,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'inline-flex cursor-pointer items-center justify-center font-medium transition focus-visible:outline-none',
        {
          'bg-blue h-10 rounded-lg px-5 py-2.5 font-semibold text-white':
            variant === 'blue',

          'bg-red w-50 rounded-lg px-5 py-3 text-white': variant === 'red',

          'w-full gap-4 rounded-lg bg-black px-5 py-3 text-white':
            variant === 'black',

          'w-50 rounded-lg border border-white bg-transparent px-5 py-3 text-white':
            variant === 'transparent',

          'bg-transparent text-white': variant === 'onlyText',

          'text-blue bg-transparent': variant === 'linkText',

          'hover:text-blue bg-transparent px-3 py-2 text-white':
            variant === 'ghost',

          'hover:bg-formGray rounded-md bg-transparent p-2 text-white':
            variant === 'icon',

          'bg-blue min-w-28.25 ml-4 flex h-10 gap-2 px-3 font-mono text-white':
            variant === 'timer',

          'bg-orange w-31.5 h-10 rounded-lg px-5 py-2 text-white':
            variant === 'orange',

          'bg-orange w-31.5 text-gray h-10 px-5 py-2':
            variant === 'orangeBlack',

          'bg-green h-10 rounded-lg px-5 py-2.5 font-medium text-white':
            variant === 'success',

          'bg-grayLightTask z-10 flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2':
            variant === 'testResult',

          'cursor-not-allowed opacity-50': disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
