'use client'

import clsx from 'clsx'
import React from 'react'

type Variant =
  | 'blue'
  | 'red'
  | 'black'
  | 'transparent'
  | 'onlyText'
  | 'linkText'

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
        'inline-flex items-center justify-center font-medium transition cursor-pointer',
        {
          'bg-blue mb-1 w-full rounded-lg px-5 py-2.5 text-lg font-semibold text-white':
            variant === 'blue',
          'bg-red w-50 rounded-lg px-5 py-3 text-white': variant === 'red',
          'w-full gap-4 rounded-lg bg-black px-5 py-3 text-white':
            variant === 'black',
          'w-50 rounded-lg border border-white bg-transparent px-5 py-3 text-white':
            variant === 'transparent',
          'bg-transparent text-white': variant === 'onlyText',
          'text-blue bg-transparent': variant === 'linkText',
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
