import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          {
            'bg-accent text-primary hover:bg-[#00e396] hover:shadow-[0_0_20px_rgba(0,208,132,0.4)]': variant === 'primary',
            'border border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm': variant === 'secondary',
            'hover:bg-white/10 text-text-secondary hover:text-white': variant === 'ghost',
            'h-11 px-6 py-2': size === 'default',
            'h-9 px-4': size === 'sm',
            'h-14 px-8 text-base': size === 'lg',
            'h-11 w-11': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
