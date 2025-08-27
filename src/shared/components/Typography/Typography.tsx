import React, { type JSX, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const TypographySize = {
  xl: 'text-4xl lg:text-5xl',
  b1: 'text-base lg:text-lg',
  b2: 'text-sm lg:text-base',
  h1: 'text-2xl font-semibold lg:text-4xl',
  h2: 'text-lg font-semibold lg:text-xl',
} as const

type Size = keyof typeof TypographySize

type TextProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T
  size?: Size
  color?: `text-${string}` | `color-${string}`
  weight?: `font-${string}`
  children: ReactNode
} & React.ComponentPropsWithoutRef<T>

function Text<T extends keyof JSX.IntrinsicElements = 'span'>({
  as,
  size = 'b2',
  color = 'color-neutral-600',
  weight = 'font-normal',
  children,
  className,
  ...rest
}: TextProps<T>) {
  const Component = as || 'span'

  return (
    // @ts-expect-error ignore error of complexity
    <Component className={twMerge(TypographySize[size] || TypographySize.b1, weight, color, className)} {...rest}>
      {children}
    </Component>
  )
}

export default Text
